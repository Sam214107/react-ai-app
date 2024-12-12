import React from 'react';
import '../styles/hero.css'
function Navbar() {
  return (<>
    <nav className="navbar navbar-expand-lg navbar-dark " style={{ backgroundColor: 'transparent' }}>
      <div className="container justify-content-center">
        <div className="d-flex align-items-center  justify-content-between">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link fs-6 text-primary" href="https://console.groq.com/docs/overview">
                Groq
              </a>
            </li>
          </ul>

          <div className="navbar-brand fw-bold fs-4 mx-4 fs-5 text-black text-center">
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
      </div>
    </nav>

    <hr style={{ width: '20%', margin: '0 auto', border: '1px solid gray' }} />

    </>
  );
}

export default Navbar;
