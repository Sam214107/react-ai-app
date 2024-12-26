// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Dashboard.css";
// import axios from "axios";
// import About from "../DashboardComponents/About";
// import Generator from "../DashboardComponents/Generator";
// import MyReport from "../DashboardComponents/MyReport";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   useEffect(() => {
//     const userExist = localStorage.getItem("UserId");

//     // Redirect to login page if no UserId is found
//     if (!userExist) {
//       navigate("/"); // Replace with your login route
//     }
//   }, [navigate]);

//   const [activeComponent, setActiveComponent] = useState("about");

//   const handleLogout = async () => {
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/logout",
//         {SessionId : String(localStorage.getItem("SessionId"))},
        
//       );

//       if (response.status === 200 && response.data.isSucess) {
//         alert(response.data.message);
//         localStorage.removeItem("UserId");
//         localStorage.removeItem("SessionId");
//         navigate("/");
//       } else {
//         alert(response.data.message || "Failed to log out");
//       }
//     } catch (error) {
//       console.error("Error logging out:", error);
//       alert("An error occurred while logging out");
//     }
//   };

//   const renderComponent = () => {
//     switch (activeComponent) {
//       case "about":
//         return <About />;
//       case "generator":
//         return <Generator />;
//       case "myreport":
//         return <MyReport />;
//       default:
//         return <About />;
//     }
//   };

//   return (
 
//     <div className="d-flex" style={{ paddingTop:'56px' }}>
//     {/* Sidebar */}
//     <div
//       className="sidebar text-white d-flex flex-column justify-content-between p-3 fixed-left"
//       style={{ width: "250px", height: "100vh", position: "fixed", background: "#001c55"}}
//     >
//       {/* Navigation Links */}
//       <div>
//         <ul className="nav flex-column align-items-center">
//           <h3>Dashboard</h3>
//           <li className="nav-item mb-1">
//             <a
//               className="nav-link text-white"
//               onClick={() => setActiveComponent("about")}
//               style={{ cursor: "pointer" }}
//             >
//               About
//             </a>
//           </li>
//           <li className="nav-item mb-1">
//             <a
//               className=" nav-link text-light"
//               onClick={() => setActiveComponent("generator")}
//               style={{ cursor: "pointer" }}
//             >
//               Generate
//             </a>
//           </li>
//           <li className="nav-item mb-5">
//             <a
//               className="nav-link text-light"
//               onClick={() => setActiveComponent("myreport")}
//               style={{ cursor: "pointer" }}
//             >
//               My Reports
//             </a>
//           </li>
//           <li className="nav-item">
//               <button
//                 className="btn btn-outline-light w-100"
//                 onClick={handleLogout}
//                 style={{ width:"50%"}}
//               >
//                 Logout
//               </button>
//             </li>
//         </ul>
//       </div>
//     </div>
  
//     {/* Main Content */}
//     <div className="main-content p-3 align-items-center">{renderComponent()}</div>
//   </div>
  
//   );
// };

// export default Dashboard;

// // Dashboard.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Dashboard.css";
// import axios from "axios";
// import About from "../DashboardComponents/About";
// import Generator from "../DashboardComponents/Generator";
// import MyReport from "../DashboardComponents/MyReport";
// import DashboardButtons from "../ButtonComponents/DashboardButtons";

// const Dashboard = () => {
//   const navigate = useNavigate();
  
//   useEffect(() => {
//     const userExist = localStorage.getItem("UserId");
//     if (!userExist) {
//       navigate("/");
//     }
//   }, [navigate]);

//   const [activeComponent, setActiveComponent] = useState("about");

//   const handleLogout = async () => {
//     try {
//       const response = await axios.post("http://127.0.0.1:8000/logout", {
//         SessionId: String(localStorage.getItem("SessionId")),
//       });
//       if (response.status === 200 && response.data.isSucess) {
//         alert(response.data.message);
//         localStorage.removeItem("UserId");
//         localStorage.removeItem("SessionId");
//         navigate("/");
//       } else {
//         alert(response.data.message || "Failed to log out");
//       }
//     } catch (error) {
//       console.error("Error logging out:", error);
//       alert("An error occurred while logging out");
//     }
//   };

//   const renderComponent = () => {
//     switch (activeComponent) {
//       case "about":
//         return <About />;
//       case "generator":
//         return <Generator />;
//       case "myreport":
//         return <MyReport />;
//       default:
//         return <About />;
//     }
//   };

//   return (
//     <div className="d-flex" style={{ paddingTop: "56px" }}>
//       {/* Sidebar */}
//       <div
//         className="sidebar text-white d-flex flex-column justify-content-between p-3 fixed-left"
//         style={{ width: "250px", height: "100vh", position: "fixed", background: "#001c55" }}
//       >
//         {/* Navigation Links */}
//         <div>
//           <h3 className="text-left">Dashboard</h3>
//           <div className="mb-3">
//             <DashboardButtons label="About" onClick={() => setActiveComponent("about")} />
//           </div>
//           <div className="mb-3">
//             <DashboardButtons label="Generate" onClick={() => setActiveComponent("generator")} />
//           </div>
//           <div className="mb-5">
//             <DashboardButtons label="My Reports" onClick={() => setActiveComponent("myreport")} />
//           </div>
//         </div>
//         <div className="mb-5">
//           <DashboardButtons label="Logout" onClick={handleLogout} />
//         </div>
//       </div>

//       {/* Main Content */}
//       <div style={{ marginLeft: "250px", padding: "20px", width: "100%" }}>
//         {renderComponent()}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Navbar";
import "./Dashboard.css";
import About from "../DashboardComponents/About";
import Generator from "../DashboardComponents/Generator";
import MyReport from "../DashboardComponents/MyReport";
import DashboardButtons from "../ButtonComponents/DashboardButtons";
import axios from "axios";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("about");
  const navigate = useNavigate();

  useEffect(() => {
    const userExist = localStorage.getItem("UserId");
    if (!userExist) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/logout", {
        SessionId: String(localStorage.getItem("SessionId")),
      });
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

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* Dashboard Layout */}
      <div className="d-flex" style={{ paddingTop: "56px" }}>
        {/* Sidebar */}
        {isSidebarOpen && (
          <div
            className="sidebar text-white d-flex flex-column justify-content-between p-3 fixed-left"
            style={{
              width: "250px",
              height: "100vh",
              position: "fixed",
              background: "#14213D",
              zIndex: 1050, // Ensure it overlays main content
              transition: "transform 0.3s ease-in-out",
              transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
            }}
          >
            <div>
              <h3 className="text-center">Dashboard</h3>
              <div className="mb-3 text-center">
                <DashboardButtons label="About" onClick={() => setActiveComponent("about")} />
              </div>
              <div className="mb-3 text-center">
                <DashboardButtons label="Generate" onClick={() => setActiveComponent("generator")} />
              </div>
              <div className="mb-5 text-center">
                <DashboardButtons label="My Reports" onClick={() => setActiveComponent("myreport")} />
              </div>
            </div>
            <div className="mb-5 text-center">
              <DashboardButtons label="Logout" onClick={handleLogout} />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div style={{ marginLeft: isSidebarOpen ? "250px" : "0", padding: "20px", width: "100%" }}>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
