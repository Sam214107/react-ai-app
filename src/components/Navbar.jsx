import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#14213D"}}>
      <div className="container justify-content-center">
        <div className="d-flex align-items-center justify-content-between">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link fs-6 text-light" href="https://console.groq.com/docs/overview">
                Groq
              </a>
            </li>
          </ul>

          <div className="navbar-brand fw-bold fs-4 mx-4 fs-5 text-white text-center">
            Report AI
          </div>

          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link fs-6 text-light" href="#">
                Llama 3.1
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
