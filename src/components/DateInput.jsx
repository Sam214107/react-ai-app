import React, { useEffect, useState } from "react";
import "../styles/DateInput.scss";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

function DateInput() {
  const [inputValue, setInputValue] = useState("");
  const [inputs, setInputs] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);
  const [suggestionQuestions, setSuggestionQuestions] = useState([]);
  const handleDateFromChange = (event) => {
    setDateFrom(event.target.value);
  };

  const handleDateToChange = (event) => {
    setDateTo(event.target.value);
  };
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
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  };

  // get suggestion questions
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/suggest_questions/"
        );
        console.log(response.data); // Handle the response data as needed
        setSuggestionQuestions(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error); // Handle any errors
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setPdfUrl(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/generate_report/",
        {
          start_date: dateFrom,
          end_date: dateTo,
          questions_list: inputs,
        }
      );
      setInputs([]);
      // Assuming response.data contains the Base64 string
      if (response) {
        console.log(response);
        console.log(response.data.data);
        const base64String = response.data.data;
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data.");
    } finally {
      setLoading(false);
    }
    console.log('test')
  };
  return (
    <div className="container my-5">
      <h1>Generate Report</h1>
      <hr
        style={{ width: "100%", margin: "0 auto", border: "1px solid gray" }}
      />
      <div className="row">
        {/* Input questions */}
        <div className="input-container container mt-4">
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
                placeholder="Ask Question like Give me the avergae sales value from..."
                style={{ border: "1px solid gray" }}
              />
            </div>
            {inputs.length >= 5 && (
            <div className="alert alert-warning" role="alert">
              You have reached the maximum number of inputs.
            </div>
          )}
            <button
              type="submit"
              className="btn btn-primary mt-2"
              disabled={inputs.length >= 5}
            >
              Add Question
            </button>

            {/* questions suggestions */}
            {suggestionQuestions.length > 0 && (
            <div className="container text-center mt-4">
              <h3>Suggested Questions</h3>
              <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
                {suggestionQuestions.map((question, index) => (
                  <div
                    key={index}
                    className="bg-light rounded p-1 shadow-sm d-flex align-items-center justify-content-center"
                    style={{ minWidth: "200px", maxWidth: "300px" }}
                  >
                    {question}
                  </div>
                ))}
              </div>
            </div>
              )}
          </form>
        </div>

        {/* Date Picker Column (col-4) */}
        <div className="col-12 col-md-4">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white text-center">
              <h4>Select Date Range</h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
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
                <button
                  type="submit"
                  className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
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
              </form>
            </div>
          </div>
        </div>
        {/* Information Column (col-8) */}
        <div className="col-12 col-md-8 mt-4 mt-md-0">
          {!pdfUrl && (
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-secondary text-white">
                <h5 className="mb-0">About This Application</h5>
              </div>
              <div className="card-body">
                <p>
                  Welcome to the "Report AI" application! This tool allows you
                  to generate custom reports by selecting a date range. Simply
                  choose the start and end dates, and our system will generate a
                  PDF report for you.
                </p>
                <p>
                  Before submitting, make sure that the date range is accurate,
                  as it will determine the data included in the generated
                  report.
                </p>
                <p>
                  Once you submit the dates, the system will process the request
                  and provide a PDF preview of the report based on your selected
                  criteria.
                </p>
                <hr />
                <p>
                  <strong>Instructions:</strong>
                </p>
                <ul>
                  <li>Select the "Date From" and "Date To" fields.</li>
                  <li>Ensure the dates are within a valid range.</li>
                  <li>Click "Submit" to generate the report.</li>
                </ul>
              </div>
            </div>
          )}

          {/* PDF Display Section */}
          {pdfUrl && (
            <div className="card shadow-sm">
              <div className="card-header bg-secondary text-white">
                <h5 className="mb-0">PDF Preview</h5>
              </div>
              <div className="card-body p-0">
                {error && (
                  <div className="alert alert-danger">
                    <strong>Error:</strong> {error}
                  </div>
                )}
                <iframe
                  src={pdfUrl}
                  title="PDF Viewer"
                  className="w-100 border-0"
                  style={{ height: "600px" }}
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DateInput;