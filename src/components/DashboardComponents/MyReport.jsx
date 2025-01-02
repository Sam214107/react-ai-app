import React, { useState, useEffect } from "react";
import axios from "axios";
import PdfCard from "../CardComponents/PdfCard";

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
                
                console.log(typeof UserId);
                console.log(UserId);
                const userObject =  {
                    UserID : Number(UserId) 
                }

                // Send GET request to the backend API
                const response = await axios.post("http://localhost:8000/get_reports",userObject);

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

    const handleDeleteReport = async (reportId) => {
        try {
            const response = await axios.post("http://localhost:8000/delete_report", { ReportID: reportId });

            if (response.status === 200 && response.data.isSuccess) {
                setReports(reports.filter((report) => report.id !== reportId));
                alert("Report deleted successfully.");
            } else {
                alert(response.data.message || "Failed to delete report.");
            }
        } catch (err) {
            console.error("Error deleting report:", err);
            alert("An unexpected error occurred while deleting the report.");
        }
    };

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
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {reports.map((report) => (
                    <PdfCard
                        key={report.id}
                        title={report.Title}
                        description={report.Description}
                        onViewReport={() => handleViewReport(report.ReportData)}
                        onDeleteReport={() => handleDeleteReport(report.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyReport;
