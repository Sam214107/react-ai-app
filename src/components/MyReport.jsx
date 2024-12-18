import React, { useState, useEffect } from "react";
import axios from "axios";

const MyReport = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            setLoading(true);

            try {
                const UserId = localStorage.getItem('UserId');
                if (!UserId) {
                alert('User not logged in.');
                return;
                }
                const response = await axios.get("http://127.0.0.1:8000/get_reports/", {
                    params: {'userId':UserId},
                });

                if (response.status === 200 && response.data.isSuccess) {
                    setReports(response.data.data); 
                } else {
                    alert(response.data.message || 'Failed to retrieve reports.');
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

    return (
        <div className="container mt-4">
            <h1>My Reports</h1>
            <hr style={{ width: "100%", marginBottom: "16px", border: "1px solid gray" }} />

            {loading && (
                <div className="text-center">
                    <span className="spinner-border" role="status" aria-hidden="true"></span>
                    <span>Loading...</span>
                </div>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && reports.length === 0 && <p>No reports available. Start generating!</p>}

            <div className="row">
                {reports.map((report, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{report.Title}</h5>
                                <p className="card-text">{report.Description}</p>
                                <button 
                                    className="btn btn-primary"
                                    onClick={() => alert("Report Data: " + report.ReportData)}
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
