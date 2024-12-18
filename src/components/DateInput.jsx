
// import React, { useEffect,useState } from "react";
// import axios from "axios";
// import PdfTemplate from "./PdfTemplate";
// import { FaTrash } from "react-icons/fa";


// const DateInput = () => {
//   // State variables
//   const [inputValue, setInputValue] = useState("");
//   const [inputs, setInputs] = useState([]);
//   const [dateFrom, setDateFrom] = useState("");
//   const [dateTo, setDateTo] = useState("");
//   const [responseData, setResponseData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [suggestionQuestions, setSuggestionQuestions] = useState([]);
//   const [filteredSuggestions, setFilteredSuggestions] = useState([]);

//   useEffect(() => {
//     console.log(inputs);
//   }, [inputs]);

//   const handleAddInput = (event) => {
//     event.preventDefault();
//     if (inputs.length < 5) {
//       setInputs([...inputs, inputValue]);
//       setInputValue("");
//     } else {
//       alert("You can only input up to five times.");
//     }
//   };

//   const handleDeleteInput = (index) => {
//     const newInputs = inputs.filter((_, i) => i !== index);
//     setInputs(newInputs);
//   };

//   // get suggestion questions
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://127.0.0.1:8000/suggest_questions/"
//         );
//         console.log(response.data); // Handle the response data as needed
//         setSuggestionQuestions(response.data.data);
//       } catch (error) {
//         console.error("Error fetching data:", error); // Handle any errors
//       }
//     };

//     fetchData();
//   }, []);

//    // Filter suggestions based on input
//    useEffect(() => {
//     if (inputValue) {
//       const filtered = suggestionQuestions.filter((item) =>
//         item.question.toLowerCase().includes(inputValue.toLowerCase())
//       );
//       setFilteredSuggestions(filtered);
//     } else {
//       setFilteredSuggestions([]);
//     }
//   }, [inputValue, suggestionQuestions]);

//   // Handle selecting a suggestion
//   const handleSelectSuggestion = (suggestion) => {
//     setInputValue(suggestion);
//     setFilteredSuggestions([]);
//   };

//   // Handle form submission
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);  // Start loading state
//     setError(null);    // Reset error
//     setResponseData(null);  // Clear previous data

//     try {
//       // Make the API call
//       const response = await axios.post("http://127.0.0.1:8000/generate_report/", {
//         start_date: dateFrom,
//         end_date: dateTo,
//         qlist: inputs,
//       });
//       setInputs([]);

//       // Check if the API response is successful
//       if (response.data.status === 200) {
//         setResponseData(response.data.data);  // Store the API response data
//       } else {
//         setError("Failed to generate report.");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError("Error fetching data.");
//     } finally {
//       setLoading(false);  // Stop loading state
//     }
//   };

  //return (
  //   <div className="container my-5">
  //     <h1>Generate Report</h1>
  //     <hr
  //       style={{ width: "100%", marginBottom: "16px", border: "1px solid gray" }}
  //     />
  //     <div className="row">
  //       {/* Input questions */}
  //       <div className="input-container container mt-4">
  //         <div className="input-list mb-3">
  //           {inputs.map((input, index) => (
  //             <div
  //               key={index}
  //               className="alert alert-primary d-flex justify-content-between align-items-center"
  //               role="alert"
  //             >
  //               {input}
  //               <button
  //                 type="button"
  //                 className="btn btn-danger btn-sm"
  //                 onClick={() => handleDeleteInput(index)}
  //               >
  //                 <FaTrash />
  //               </button>
  //             </div>
  //           ))}
  //         </div>
  //         <form onSubmit={handleAddInput} className="mb-3">
  //         <div className="form-group">
  //   <label htmlFor="userInput" className="form-label">
  //     Enter your questions:
  //   </label>
  //   <input
  //     type="text"
  //     id="userInput"
  //     className="form-control"
  //     value={inputValue}
  //     onChange={(e) => setInputValue(e.target.value)}
  //     placeholder="Ask Question like Give me the average sales value from..."
  //     style={{ border: "1px solid gray" }}
  //   />
  // </div>
  
  // {inputs.length >= 5 && (
  //   <div className="alert alert-warning" role="alert">
  //     You have reached the maximum number of inputs.
  //   </div>
  // )}

  // {filteredSuggestions.length > 0 && (
  //   <ul
  //     className="list-group position-absolute bg-white border rounded shadow"
  //     style={{
  //       maxHeight: "150px",
  //       overflowY: "auto",
  //       zIndex: 10,
  //       marginTop: "5px", // Space between input and dropdown
  //       padding: "0", // Remove extra padding
  //     }}
  //   >
  //     {filteredSuggestions.map((suggestion, index) => (
  //       <li
  //         key={index}
  //         className="list-group-item list-group-item-action"
  //         onClick={() => {
  //           setInputValue(suggestion.question);
  //           setFilteredSuggestions(filteredSuggestions.filter((item) => item.question !== suggestion.question)); // Remove selected suggestion from the dropdown
  //         }}
  //         style={{
  //           cursor: "pointer",
  //           padding: "10px",
  //         }}
  //       >
  //         {suggestion.question}
  //       </li>
  //     ))}
  //   </ul>
  // )}

  // <button
  //   type="submit"
  //   className="btn btn-primary mt-2"
  //   disabled={inputs.length >= 5}
  // >
  //   Add More
  // </button>

  //           {/* questions suggestions */}
  //           {suggestionQuestions.length > 0 && (
  //           <div className="container text-center mt-4">
  //             <h3>Suggested Questions</h3>
  //             <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
  //               {suggestionQuestions.map((item, index) => (
  //                 <div
  //                   key={index}
  //                   className="bg-light rounded p-1 shadow-sm d-flex align-items-center justify-content-center"
  //                   style={{ minWidth: "200px", maxWidth: "300px" }}
  //                 >
  //                   {item.question}
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //             )}
  //         </form>
  //       </div>

  //       {/* Date Picker Column (col-4) */}
  //       <div className="col-12 col-md-4">
  //         <div className="card shadow-lg">
  //           <div className="card-header bg-primary text-white text-center">
  //             <h4>Select Date Range</h4>
  //           </div>
  //           <div className="card-body p-4">
  //             <form onSubmit={handleSubmit}>
  //               <div className="mb-3">
  //                 <label htmlFor="dateFrom" className="form-label">
  //                   Date From:
  //                 </label>
  //                 <input
  //                   type="date"
  //                   id="dateFrom"
  //                   value={dateFrom}
  //                   onChange={(e) => setDateFrom(e.target.value)}
  //                   className="form-control"
  //                   required
  //                 />
  //               </div>
  //               <div className="mb-3">
  //                 <label htmlFor="dateTo" className="form-label">
  //                   Date To:
  //                 </label>
  //                 <input
  //                   type="date"
  //                   id="dateTo"
  //                   value={dateTo}
  //                   onChange={(e) => setDateTo(e.target.value)}
  //                   className="form-control"
  //                   required
  //                 />
  //               </div>
  //               <button
  //                 type="submit"
  //                 className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
  //                 disabled={loading}
  //               >
  //                 {loading ? (
  //                   <>
  //                     <span
  //                       className="spinner-border spinner-border-sm me-2"
  //                       role="status"
  //                       aria-hidden="true"
  //                     ></span>
  //                     Generating...
  //                   </>
  //                 ) : (
  //                   "Submit"
  //                 )}
  //               </button>
  //             </form>
  //           </div>
  //         </div>
  //       </div>
        
//         {/* Information Column (col-8) */}
//         <div className="col-12 col-md-8">
//           { (
//             <div className="card shadow-sm mb-4">
//               <div className="card-header bg-secondary text-white">
//                 <h5 className="mb-0">About This Application</h5>
//               </div>
//               <div className="card-body">
//                 <p>
//                   Welcome to the "Report AI" application! This tool allows you
//                   to generate custom reports by selecting a date range. Simply
//                   choose the start and end dates, and our system will generate a
//                   PDF report for you.
//                 </p>
//                 <p>
//                   Before submitting, make sure that the date range is accurate,
//                   as it will determine the data included in the generated
//                   report.
//                 </p>
//                 <p>
//                   Once you submit the dates, the system will process the request
//                   and provide a PDF preview of the report based on your selected
//                   criteria.
//                 </p>
//                 <hr />
//                 <p>
//                   <strong>Instructions:</strong>
//                 </p>
//                 <ul>
//                   <li>Select the "Date From" and "Date To" fields.</li>
//                   <li>Ensure the dates are within a valid range.</li>
//                   <li>Click "Submit" to generate the report.</li>
//                 </ul>
//               </div>
//             </div>
//           )}
//         </div>
//         {/* Error handling */}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* Show PDF Template after successful data retrieval */}
//      {responseData && <PdfTemplate data={responseData}/>}
//       </div>
//     </div>
//   );
// };

// export default DateInput;

// import React, { useState } from 'react';
// import { Container, Row, Col, Nav } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import About from './About';
// import Generator from './Generator';
// //import MyReport from './components/MyReport';

// function Dashboard() {
//   const [activeComponent, setActiveComponent] = useState('about');

//   // Function to render the active component
//   const renderComponent = () => {
//     switch (activeComponent) {
//       case 'about':
//         return <About />;
//       case 'generator':
//         return <Generator />;
//       // case 'myreport':
//       //   return <MyReport />;
//       default:
//         return <About />;
//     }
//   };

//   return (
//     <Container fluid>
//       <Row>
//         {/* Sidebar */}
//         <Col md={2} className="bg-dark text-white vh-100">
//           <h4 className="p-3">Dashboard</h4>
//           <Nav className="flex-column">
//             <Nav.Link className="text-white" onClick={() => setActiveComponent('about')}>
//               About
//             </Nav.Link>
//             <Nav.Link className="text-white" onClick={() => setActiveComponent('generator')}>
//               Generator
//             </Nav.Link>
//             {/* <Nav.Link className="text-white" onClick={() => setActiveComponent('myreport')}>
//               My Report
//             </Nav.Link> */}
//           </Nav>
//         </Col>

//         {/* Main Content */}
//         <Col md={9} className="p-4">
//           {renderComponent()}
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default Dashboard;

// import React, { useState } from 'react';
// import { Container, Row, Col, Nav } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import About from './About';
// import Generator from './Generator';

// function Dashboard() {
//   const [activeComponent, setActiveComponent] = useState('about');

//   // Function to render the active component
//   const renderComponent = () => {
//     switch (activeComponent) {
//       case 'about':
//         return <About />;
//       case 'generator':
//         return <Generator />;
//       default:
//         return <About />;
//     }
//   };

//   return (
//     <Container fluid>
//       <Row>
//         {/* Sidebar */}
//         <Col
//           md={2}
//           className="bg-dark text-white vh-100 position-relative d-flex flex-column"
//           style={{ left: 0, top: 0 }}
//         >
//           <h4 className="p-3 text-left">Dashboard</h4>
//           <Nav className="flex-column">
//             <Nav.Link
//               className="text-white"
//               onClick={() => setActiveComponent('about')}
//               style={{ cursor: 'pointer' }}
//             >
//               About
//             </Nav.Link>
//             <Nav.Link
//               className="text-white"
//               onClick={() => setActiveComponent('generator')}
//               style={{ cursor: 'pointer' }}
//             >
//               Generator
//             </Nav.Link>
//           </Nav>
//         </Col>

//         {/* Main Content */}
//         <Col
//           md={{ span: 10, offset: 2 }}
//           className="p-4 overflow-auto"
//           style={{ height: '100vh' }}
//         >
//           {renderComponent()}
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default Dashboard;

import React, { useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import About from './About';
import Generator from './Generator';
import MyReport from './MyReport';

function Dashboard() {
  const [activeComponent, setActiveComponent] = useState('about');

  const handleLogout = async () => {
    try {
        const response = await axios.post(
            'http://127.0.0.1:8000/logout',
            {},
            { withCredentials: true }
        );

        if (response.status === 200 && response.data.isSucess) {
            alert(response.data.message);
            localStorage.removeItem('UserId'); 
            window.location.href = "/login"; 
        } else {
            alert(response.data.message || "Failed to log out");
        }
    } catch (error) {
        console.error("Error logging out:", error);
        alert("An error occurred while logging out");
    }
};


  // Function to render the active component
  const renderComponent = () => {
    switch (activeComponent) {
      case 'about':
        return <About />;
      case 'generator':
        return <Generator />;
      case 'myreport':
        return <MyReport />;
      default:
        return <About />;
    }
  };

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col
          md={2} // Sidebar width
          className=" text-light d-flex flex-column"
          style={{
            minHeight: '100vh',
            borderRight: '1px solid gray',
            background: '#001c55'
          }}
        >
          <h4 className="p-3">Dashboard</h4>
          <Nav className="flex-column">
            <Nav.Link
              className="text-light"
              onClick={() => setActiveComponent('about')}
              style={{ cursor: 'pointer' }}
            >
              About
            </Nav.Link>
            <Nav.Link
              className="text-light"
              onClick={() => setActiveComponent('generator')}
              style={{ cursor: 'pointer' }}
            >
              Generator
            </Nav.Link>
            <Nav.Link
              className="text-light"
              onClick={() => setActiveComponent('myreport')}
              style={{ cursor: 'pointer' }}
            >
              My Report
            </Nav.Link>
          </Nav>
          <div className="mt-auto p-3">
            <button
              className="btn btn-outline-light w-100 bg-red"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </Col>

        {/* Main Content */}
        <Col
          md={10} // Main content width
          className="p-4"
          style={{
            minHeight: '100vh',
            overflowY: 'auto',
            backgroundColor: '#f8f9fa',
          }}
        >
          {renderComponent()}
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
