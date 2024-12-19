// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const MyReport = () => {
//     const [reports, setReports] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchReports = async () => {
//             setLoading(true);

//             try {
//                 const UserId = localStorage.getItem('UserId');
//                 if (!UserId) {
//                 alert('User not logged in.');
//                 return;
//                 }
//                 const response = await axios.get("http://127.0.0.1:8000/get_reports/", {
//                     params: {userId:UserId},
//                 });

//                 if (response.status === 200 && response.data.isSuccess) {
//                     setReports(response.data.data); 
//                 } else {
//                     alert(response.data.message || 'Failed to retrieve reports.');
//                 }
//             } catch (err) {
//                 console.error("Error fetching reports:", err);
//                 setError("An unexpected error occurred while fetching reports.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchReports();
//     }, []);

//     return (
//         <div className="container mt-4">
//             <h1>My Reports</h1>
//             <hr style={{ width: "100%", marginBottom: "16px", border: "1px solid gray" }} />

//             {loading && (
//                 <div className="text-center">
//                     <span className="spinner-border" role="status" aria-hidden="true"></span>
//                     <span>Loading...</span>
//                 </div>
//             )}

//             {error && <p style={{ color: "red" }}>{error}</p>}

//             {!loading && reports.length === 0 && <p>No reports available. Start generating!</p>}

//             <div className="row">
//                 {reports.map((report, index) => (
//                     <div key={index} className="col-md-4 mb-4">
//                         <div className="card shadow-sm">
//                             <div className="card-body">
//                                 <h5 className="card-title">{report.Title}</h5>
//                                 <p className="card-text">{report.Description}</p>
//                                 <button 
//                                     className="btn btn-primary"
//                                     onClick={() => alert("Report Data: " + report.ReportData)}
//                                 >
//                                     View Report
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default MyReport;
import React, { useState, useEffect } from "react";
import axios from "axios";

const MyReport = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); // Stores error messages

    useEffect(() => {
        const fetchReports = async () => {
            setLoading(true);

            try {
                // Get UserID from localStorage
                const UserId = localStorage.getItem("UserId");
                if (!UserId) {
                    alert("User not logged in.");
                    return;
                }

                // Send GET request to the backend API
                const response = await axios.get("http://127.0.0.1:8000/get_reports/", {
                    userID : UserId, 
                });

                // Handle response
                if (response.status === 200 && response.data.isSuccess) {
                    setReports(response.data.data); // Set the reports data
                } else {
                    setError(response.data.message || "Failed to retrieve reports.");
                }
            } catch (err) {
                console.error("Error fetching reports:", err);
                setError("An unexpected error occurred while fetching reports.");
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    // Function to handle Base64 to PDF preview
    const handleViewReport = (base64String) => {
        try {
            if (!base64String.startsWith("data:application/pdf;base64,")) {
                alert("Invalid PDF data format.");
                return;
            }

            // Open the Base64 PDF string directly in a new tab
            const pdfWindow = window.open();
            pdfWindow.document.write(
                `<iframe width="100%" height="100%" src="${base64String}"></iframe>`
            );
        } catch (err) {
            console.error("Error while previewing report:", err);
            alert("Failed to preview the report.");
        }
    };

    return (
        <div className="container mt-4">
            <h1>My Reports</h1>
            <hr style={{ width: "100%", marginBottom: "16px", border: "1px solid gray" }} />

            {/* Loading Spinner */}
            {loading && (
                <div className="text-center">
                    <span className="spinner-border" role="status" aria-hidden="true"></span>
                    <span>Loading...</span>
                </div>
            )}

            {/* Error Message */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* No Reports Message */}
            {!loading && reports.length === 0 && !error && (
                <p>No reports available. Start generating!</p>
            )}

            {/* Reports List */}
            <div className="row">
                {reports.map((report, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{report.Title}</h5>
                                <p className="card-text">{report.Description}</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleViewReport(report.ReportData)} // Pass Base64 string to the handler
                                >
                                    View Report
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyReport;
