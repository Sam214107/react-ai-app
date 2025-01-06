// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';


// const Navbar = () => {
//   return (
//     <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: "#14213D"}}>
//       <div className="container justify-content-center">
//         <div className="d-flex align-items-center justify-content-between">
//           <ul className="navbar-nav">
//             <li className="nav-item">
//               <a className="nav-link fs-6 text-light" href="https://console.groq.com/docs/overview">
//                 Groq
//               </a>
//             </li>
//           </ul>

//           <div className="navbar-brand fw-bold fs-4 mx-4 fs-5 text-white text-center">
//             Report AI
//           </div>

//           <ul className="navbar-nav">
//             <li className="nav-item">
//               <a className="nav-link fs-6 text-light" href="#">
//                 Llama 3.1
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: "#14213D" }}>
      <div className="container-fluid d-flex justify-content-center align-items-center">
        {/* Sidebar Toggle Button */}
        <button
          className="btn"
          style={{background: 'none',border: 'none',cursor: 'pointer',display: 'flex',flexDirection: 'column',justifyContent: 'space-between',height: '20px',width: '25px',padding: '0'}}
          onClick={toggleSidebar}
        >
          <span
            style={{backgroundColor: 'white',height: '3px',width: '100%',display: 'block',borderRadius: "2px"}}
          ></span>
          <span
            style={{backgroundColor: 'white',height: '3px',width: '100%',display: 'block',borderRadius: "2px"}}
          ></span>
          <span
            style={{backgroundColor: 'white',height: '3px',width: '100%',display: 'block',borderRadius: "2px"}}
          ></span>
        </button>

        {/* Centered Navbar Content */}
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
          <ul className="navbar-nav d-flex flex-row align-items-center">
            <li className="nav-item mx-3">
              <a className="nav-link fs-6 text-light" href="https://console.groq.com/docs/overview">
                Groq
              </a>
            </li>
          </ul>

          <div className="navbar-brand fw-bold fs-4 mx-3 fs-5 text-white text-center">
            Report AI
          </div>

          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link fs-6 text-primary" href="https://ai.meta.com/blog/meta-llama-3/">
                Llama 3.1
              </a>
            </li>
          </ul>
        </div>
         {/* Placeholder for right alignment (optional) */}
         <div style={{ width: "48px" }}></div>
      </div>
    </nav>
  );
};

export default Navbar;
