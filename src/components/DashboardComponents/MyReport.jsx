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
//                 const response = await axios.get("http://localhost:8000/get_reports/", {
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
import PdfCard from "../CardComponents/PdfCard";

const MyReport = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); // Stores error messages
    
    const fetchReports = async () => {
        setLoading(true);

        try {
            const UserId = localStorage.getItem("UserId");
            
            console.log(typeof UserId);
            console.log(UserId);
            const userObject =  {
                UserID : Number(UserId) 
            }

            const response = await axios.post("http://localhost:8000/api/report/get_reports",userObject);

            // Handle response
            if (response.status === 200 && response.data.isSuccess) {
                setReports(response.data.data); 
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
    useEffect(() => {
        fetchReports();
    }, []);

    const handleDeleteReport = async (reportId) => {
        console.log("Report ID to delete:", reportId);
        if (!reportId) {
            console.error("No report ID provided!");
            return;
        }

        if (!window.confirm("Are you sure you want to delete this report?")) {
            return; 
        }

        try {
            setLoading(true);
            const deleteObject = {
                ReportID: reportId
            }
            const response = await axios.post("http://localhost:8000/api/report/delete_report", deleteObject);

            if (response.status === 200) {
                alert(response.data.message || "Report deleted successfully.");

                await fetchReports();
            } else {
                setError(response.data.detail || "Failed to delete the report.");
            }
        } catch (err) {
            console.error("Error deleting report:", err);
            setError("An unexpected error occurred while deleting the report.");
        } finally {
            setLoading(false);
        }
    };

    // const handleViewReport = (base64String) => {
    //     try {
    //         if (!base64String.startsWith("data:application/pdf;base64,")) {
    //             alert("Invalid PDF data format.");
    //             return;
    //         }

    //         // Open the Base64 PDF string directly in a new tab
    //         const pdfWindow = window.open();
    //         pdfWindow.document.write(
    //             `<iframe width="100%" height="100%" src="${base64String}"></iframe>`
    //         );
    //     } catch (err) {
    //         console.error("Error while previewing report:", err);
    //         alert("Failed to preview the report.");
    //     }
    // };
    const handleViewReport = (base64String) => {
        try {
          // Ensure the Base64 string has the correct prefix
          if (!base64String.startsWith("data:application/pdf;base64,")) {
            base64String = `data:application/pdf;base64,${base64String}`;
          }
      
          // Decode the Base64 string and convert it to a Blob
          const byteCharacters = atob(base64String.split(",")[1]);
          const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0));
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: "application/pdf" });
      
          // Create a Blob URL
          const pdfUrl = URL.createObjectURL(blob);
      
          // Open the Blob URL in a new tab
          const pdfWindow = window.open();
          if (pdfWindow) {
            pdfWindow.location.href = pdfUrl;
          } else {
            alert("Failed to open a new tab. Please allow pop-ups in your browser.");
          }
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
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {reports.map((report) => (
                    <PdfCard
                        key={report.ReportID}
                        title={report.Title}
                        description={report.Description}
                        onViewReport={() => handleViewReport(report.ReportData)}
                        onDeleteReport={() => handleDeleteReport(report.ReportID)} 
                    />
                ))}
            </div>
        </div>
    );
};

export default MyReport;
