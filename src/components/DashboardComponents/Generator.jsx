import React, { useState, useEffect } from "react";
import axios from "axios";
import PdfTemplate from "../PdfTemplate";
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
    const [isDisplay, setIsDisplay] = useState("");
    const [shuffledSuggestions, setShuffledSuggestions] = useState([]);
    useEffect(() => {
        // Function to shuffle and pick 4 random suggestions
        const shuffleSuggestions = () => {
            const shuffled = [...suggestionQuestions]
                .sort(() => Math.random() - 0.5)
                .slice(0, 4);
            setShuffledSuggestions(shuffled);
        };
    
        // Initial shuffle
        shuffleSuggestions();
    
        // Set interval for periodic shuffle (e.g., every 5 seconds)
        const intervalId = setInterval(shuffleSuggestions, 5000);
    
        // Cleanup interval on unmount
        return () => clearInterval(intervalId);
    }, [suggestionQuestions]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const response = await axios.get("http://localhost:8000/suggest_questions/");
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
        if (inputValue && isDisplay !== "dropdown") {
            const words = inputValue.toLowerCase().split(/\s+/); // Split input into words
            const filtered = suggestionQuestions
                .filter((item) => 
                    words.some((word) => item.question.toLowerCase().includes(word)) // At least one word matches
                )
                .sort((a, b) => {
                    // Sort by relevance (number of matching words)
                    const getMatchCount = (question) =>
                        words.reduce(
                            (count, word) =>
                                count + (question.toLowerCase().includes(word) ? 1 : 0),
                            0
                        );
                    return getMatchCount(b.question) - getMatchCount(a.question);
                });
                console.log("first time")
                setIsDisplay(true);
            setFilteredSuggestions(filtered);
        } else if(inputValue && isDisplay==="dropdown"){
            setFilteredSuggestions([]);
            setIsDisplay("");
        } else {
            console.log("last time")
            setFilteredSuggestions([]);
        }
    }, [inputValue, suggestionQuestions]);


    // Handle selecting a suggestion
    const handleSelectSuggestion = (suggestion) => {
        console.log("Hi");
        setIsDisplay("dropdown");
        setInputValue(suggestion);
      
        setFilteredSuggestions([]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setResponseData(null);

        try {
            const response = await axios.post("http://localhost:8000/generate_report/", {
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
                            <label htmlFor="userInput" className="form-label" style={{ color: "black", fontWeight: "bold", fontSize: "1.2em" }}>
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
                                required
                            />
                        </div>

                        {inputs.length >= 5 && (
                            <div className="alert alert-warning" role="alert">
                                You have reached the maximum number of inputs.
                            </div>
                        )}

                            {isDisplay && filteredSuggestions.length > 0 && (
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
                                    {filteredSuggestions.filter((suggestion) => {
                                        // Split the user input into individual words
                                        const words = inputValue.toLowerCase().split(/\s+/);
                                        // Check if at least one word is present in the question
                                        return words.some((word) =>
                                            suggestion.question.toLowerCase().includes(word)
                                        );
                                    })
                                        .sort((a, b) => {
                                            // Sort questions by relevance (number of matching words)
                                            const words = inputValue.toLowerCase().split(/\s+/);
                                            const getMatchCount = (question) =>
                                                words.reduce(
                                                    (count, word) =>
                                                        count +
                                                        (question.question.toLowerCase().includes(word) ? 1 : 0),
                                                    0
                                                );
                                            return getMatchCount(b) - getMatchCount(a); // Higher matches first
                                        }).map((suggestion, index) => (
                                            <li
                                                key={index}
                                                className="list-group-item list-group-item-action"
                                                onClick={() => {
                                                    handleSelectSuggestion(suggestion.question);
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
                            style={{background:"#14213D"}}
                        >
                            {inputs.length>0 ? 'Add More' : 'Add Questions'}
                        </button>

                        {/* questions suggestions */}
                        {suggestionQuestions.length > 0 && (
                            <div className="container text-center mt-4">
                                <h3 style={{ color: "#808080" }}>Suggested Questions</h3>
                                <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
                                    {shuffledSuggestions.map((item, index) => (
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
                        <div className="card-header text-white text-center" style={{background:"#14213D"}}>
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
                                    />
                                </div>
                        </div>
                    </div>
                    <center>
                <button
                    onSubmit={handleSubmit}
                    type="submit"
                    className="btn w-75 d-flex align-items-center justify-content-center mt-4"
                    disabled={loading}
                    style={{fontSize: "1.2em", fontWeight: "bold", background:"#14213D", color:"white"}}
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
                        "Generate"
                    )}
                </button>
                </center>
                </form>
                </div>
                {/* Error handling */}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {/* Show PDF Template after successful data retrieval */}
                {responseData && <PdfTemplate data={responseData} />}
            </div>
        </div>
    );
};

export default Generator;
