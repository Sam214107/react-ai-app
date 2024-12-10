import React from 'react';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import reportImage from '../report.jpg'; // Import the image file directly

const Hero = () => {
  return (
    <div className="container hero-container">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h1>
            <Typewriter
              options={{
                strings: [
                  "Welcome to AI-powered reporting!",
                  "Transform data into reports with AI.",
                  "Start Your Journey Today"
                ],
                autoStart: true,
                loop: true,
                delay: 100,
                deleteSpeed: 50,
              }}
            />
          </h1>
          <p>
            AI-powered reporting transforms raw data into clear, actionable insights. Automate your reporting process, gain accurate results quickly, and make smarter decisions with intelligent, data-driven reports tailored to your needs.
          </p>
          {/* Login Button */}
          <Link to="/login" className="btn btn-primary mt-4">
            Login to Get Started
          </Link>
        </div>
        <div className="col-md-6">
          <img 
            src={reportImage} // Use the imported image variable here
            alt="AI Reporting Illustration" 
            className="img-fluid" 
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
