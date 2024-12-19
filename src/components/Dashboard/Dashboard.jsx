import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import axios from "axios";
import About from "../DashboardComponents/About";
import Generator from "../DashboardComponents/Generator";
import MyReport from "../DashboardComponents/MyReport";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userExist = localStorage.getItem("UserId");

    // Redirect to login page if no UserId is found
    if (!userExist) {
      navigate("/"); // Replace with your login route
    }
  }, [navigate]);

  const [activeComponent, setActiveComponent] = useState("about");

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/logout",
        {SessionId : String(localStorage.getItem("SessionId"))},
        
      );

      if (response.status === 200 && response.data.isSucess) {
        alert(response.data.message);
        localStorage.removeItem("UserId");
        localStorage.removeItem("SessionId");
        navigate("/");
      } else {
        alert(response.data.message || "Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      alert("An error occurred while logging out");
    }
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "about":
        return <About />;
      case "generator":
        return <Generator />;
      case "myreport":
        return <MyReport />;
      default:
        return <About />;
    }
  };

  return (
 
    <div className="d-flex">
    {/* Sidebar */}
    <div
      className="sidebar text-white d-flex flex-column justify-content-between p-3 fixed-left"
      style={{ width: "250px", height: "100vh", position: "fixed", background: "#001c55"}}
    >
      {/* Navigation Links */}
      <div>
        <ul className="nav flex-column">
          <li className="nav-item mb-3">
            <a
              className="nav-link text-white"
              onClick={() => setActiveComponent("about")}
              style={{ cursor: "pointer" }}
            >
              About
            </a>
          </li>
          <li className="nav-item mb-3">
            <a
              className=" nav-link text-light"
              onClick={() => setActiveComponent("generator")}
              style={{ cursor: "pointer" }}
            >
              Generate
            </a>
          </li>
          <li className="nav-item mb-3">
            <a
              className="nav-link text-light"
              onClick={() => setActiveComponent("myreport")}
              style={{ cursor: "pointer" }}
            >
              My Reports
            </a>
          </li>
          <li className="nav-item">
              <button
                className="btn btn-outline-light w-100"
                onClick={handleLogout}
                style={{background:"red", width:"50%"}}
              >
                Logout
              </button>
            </li>
        </ul>
      </div>
    </div>
  
    {/* Main Content */}
    <div className="main-content p-3 align-items-center">{renderComponent()}</div>
  </div>
  
  );
};

export default Dashboard;
