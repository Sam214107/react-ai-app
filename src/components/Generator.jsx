import React, { useState, useEffect } from "react";
import axios from "axios";
import PdfTemplate from "./PdfTemplate";
import { FaTrash } from "react-icons/fa";

const Generator = () => {
    const [inputValue, setInputValue] = useState("");
    const [inputs, setInputs] = useState([]);
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [suggestionQuestions, setSuggestionQuestions] = useState([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [saveTitle, setSaveTitle] = useState("");
    const [saveDescription, setSaveDescription] = useState("");
    const [saveReportData, setSaveReportData] = useState('');

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/suggest_questions/");
                setSuggestionQuestions(response.data.data);
            } catch (err) {
                console.error("Error fetching suggestions:", err);
            }
        };
        fetchSuggestions();
    }, []);
    
    useEffect(() => {
        console.log(inputs);
    }, [inputs]);

    const handleAddInput = (event) => {
        event.preventDefault();
        if (inputs.length < 5) {
            setInputs([...inputs, inputValue]);
            setInputValue("");
        } else {
            alert("You can only input up to five times.");
        }
    };

    const handleDeleteInput = (index) => {
        setInputs(inputs.filter((_, i) => i !== index));
    };

    // Filter suggestions based on input
    useEffect(() => {
        if (inputValue) {
        const filtered = suggestionQuestions.filter((item) =>
            item.question.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredSuggestions(filtered);
        } else {
        setFilteredSuggestions([]);
        }
    }, [inputValue, suggestionQuestions]);

    // Handle selecting a suggestion
    const handleSelectSuggestion = (suggestion) => {
        setInputValue(suggestion);
        setFilteredSuggestions([]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setResponseData(null);

        try {
            const response = await axios.post("http://127.0.0.1:8000/generate_report/", {
                start_date: dateFrom,
                end_date: dateTo,
                qlist: inputs,
            });
            setInputs([]);
            response.data.status === 200
                ? setResponseData(response.data.data)
                : setError("Failed to generate report.");
        } catch (err) {
            console.error("Error:", err);
            setError("Error fetching data.");
        } finally {
            setLoading(false);
        }
    };
    const handleSave = async () => {
        try {
          // Get UserId from localStorage (Ensure the user is logged in)
          const UserId = localStorage.getItem('UserId');
          if (!UserId) {
            alert('User is not logged in!');
            return;
          }
      
          // Prepare the report data to send to the backend
          const reportData = {
            UserID: UserId,
            Title: saveTitle,
            Description: saveDescription,
            Report_data: saveReportData, // This should be the actual report data
          };
      
          // Send a POST request to save the report
          const response = await axios.post(
            'http://127.0.0.1:8000/save_report/',
            reportData,
            { withCredentials: true } // Ensures cookies are sent and received
          );
      
          if (response.status === 200 && response.data.isSucess) {
            alert('Data saved successfully!');
            setShowSaveModal(false); // Close the modal or handle UI state accordingly
          } else {
            alert(response.data.message || 'Failed to save report.');
          }
        } catch (err) {
          console.error('Error saving data:', err);
          alert('An error occurred while saving the data. Please try again.');
        }
      };


    return (
        <div className="container ">
            <h1>Generate Report</h1>
            <hr
                style={{ width: "100%", marginBottom: "16px", border: "1px solid gray" }}
            />
            <div className="row">
                {/* Input questions */}
                <div className="col-12 col-md-8">
                <div className="input-container container ">
                    <div className="input-list mb-3">
                        {inputs.map((input, index) => (
                            <div
                                key={index}
                                className="alert alert-primary d-flex justify-content-between align-items-center"
                                role="alert"
                            >
                                {input}
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteInput(index)}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleAddInput} className="mb-3">
                        <div className="form-group">
                            <label htmlFor="userInput" className="form-label">
                                Enter your questions:
                            </label>
                            <input
                                type="text"
                                id="userInput"
                                className="form-control"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Ask Question like Give me the average sales value from..."
                                style={{ border: "1px solid gray" }}
                            />
                        </div>

                        {inputs.length >= 5 && (
                            <div className="alert alert-warning" role="alert">
                                You have reached the maximum number of inputs.
                            </div>
                        )}

                        {filteredSuggestions.length > 0 && (
                            <ul
                                className="list-group position-absolute bg-white border rounded shadow"
                                style={{
                                    maxHeight: "150px",
                                    overflowY: "auto",
                                    zIndex: 10,
                                    marginTop: "5px", // Space between input and dropdown
                                    padding: "0", // Remove extra padding
                                }}
                            >
                                {filteredSuggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        className="list-group-item list-group-item-action"
                                        onClick={() => {
                                            setInputValue(suggestion.question);
                                            setFilteredSuggestions(filteredSuggestions.filter((item) => item.question !== suggestion.question)); // Remove selected suggestion from the dropdown
                                        }}
                                        style={{
                                            cursor: "pointer",
                                            padding: "10px",
                                        }}
                                    >
                                        {suggestion.question}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary mt-2"
                            disabled={inputs.length >= 5}
                        >
                            Add More
                        </button>

                        {/* questions suggestions */}
                        {suggestionQuestions.length > 0 && (
                            <div className="container text-center mt-4">
                                <h3>Suggested Questions</h3>
                                <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
                                    {suggestionQuestions.slice(0,4).map((item, index) => (
                                        <div
                                            key={index}
                                            className="bg-light rounded p-1 shadow-sm d-flex align-items-center justify-content-center"
                                            style={{ minWidth: "200px", maxWidth: "300px" }}
                                        >
                                            {item.question}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </form>
                </div>
                </div>

                {/* Date Picker Column (col-4) */}
                <div className="col-12 col-md-4">
                <form onSubmit={handleSubmit}>
                    <div className="card shadow-lg">
                        <div className="card-header bg-primary text-white text-center">
                            <h4>Select Date Range</h4>
                        </div>
                        <div className="card-body p-4">
                                <div className="mb-3">
                                    <label htmlFor="dateFrom" className="form-label">
                                        Date From:
                                    </label>
                                    <input
                                        type="date"
                                        id="dateFrom"
                                        value={dateFrom}
                                        onChange={(e) => setDateFrom(e.target.value)}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dateTo" className="form-label">
                                        Date To:
                                    </label>
                                    <input
                                        type="date"
                                        id="dateTo"
                                        value={dateTo}
                                        onChange={(e) => setDateTo(e.target.value)}
                                        className="form-control"
                                        required
                                    />
                                </div>
                        </div>
                    </div>
                    <center>
                <button
                    onSubmit={handleSubmit}
                    type="submit"
                    className="btn btn-primary w-75 d-flex align-items-center justify-content-center mt-4"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                            ></span>
                            Generating...
                        </>
                    ) : (
                        "Submit"
                    )}
                </button>
                </center>
                </form>
                </div>
                {/* Error handling */}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {/* Show PDF Template after successful data retrieval */}
                {responseData && (
                    <>
                        <PdfTemplate data={responseData} />
                        <div className="text-center mt-4">
                            <button
                                className="btn btn-success"
                                onClick={() => setShowSaveModal(true)}
                            >
                                Save Report
                            </button>
                        </div>
                    </>
                )}

                {/* Save Modal */}
                {showSaveModal && (
                    <div
                        className="modal-backdrop"
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 1050,
                        }}
                    >
                        <div className="card p-4 shadow-lg w-50">
                            <h4 className="text-center mb-4">Save Report</h4>
                            <div className="form-group mb-3">
                                <label htmlFor="saveTitle" className="form-label">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="saveTitle"
                                    className="form-control"
                                    value={saveTitle}
                                    onChange={(e) => setSaveTitle(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="saveDescription" className="form-label">
                                    Description
                                </label>
                                <textarea
                                    id="saveDescription"
                                    className="form-control"
                                    rows="3"
                                    value={saveDescription}
                                    onChange={(e) => setSaveDescription(e.target.value)}
                                />
                            </div>
                            <div className="text-center">
                                <button
                                    className="btn btn-primary me-3"
                                    onClick={handleSave}
                                >
                                    Save 
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowSaveModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Generator;
