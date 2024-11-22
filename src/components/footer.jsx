import React from 'react';
import Logo from "../assets/abc.png"

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>TeamLease EdTech</h5>
            <img src={Logo} alt="logo" className='logo'/>
            <p>
            TeamLease EdTech Ltd.
            B-903,Western Edge II, Borivali East,
            Mumbai 400066
            </p>
          </div>
          <div className="col-md-3">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: support@example.com</li>
              <li>Phone: +123 456 7890</li>
            </ul>
          </div>
        </div>
        <div className="text-right mt-3">
          <small>&copy; Copyright ©2024 ReportAI | Powered by TeamLease EdTech</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
