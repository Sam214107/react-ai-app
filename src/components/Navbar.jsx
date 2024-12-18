import React from 'react';
import '../styles/hero.css'
function Navbar() {
  return (<>
    <nav className="navbar navbar-expand-lg navbar-dark " style={{ backgroundColor: '#14213d' }}>
      <div className="container justify-content-center">
        <div className="d-flex align-items-center  justify-content-between">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link fs-6 text-light" href="https://console.groq.com/docs/overview">
                Groq
              </a>
            </li>
          </ul>

          <div className="navbar-brand fw-bold fs-4 mx-4 fs-5 text-grey text-center">
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

    <hr style={{ width: '100%', margin: '0 auto', border: '1px solid gray' }} />

    </>
  );
}

export default Navbar;
