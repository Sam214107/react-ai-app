import React from 'react';
import Typewriter from 'typewriter-effect';
import '../styles/hero.css'

const Hero = () => {
  return (
    <div className="hero-container" style={{ textAlign: 'center'}}>
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
            delay: 100, // Typing speed
            deleteSpeed: 50, // Deleting speed
          }}
        />
      </h1>
      <p>AI-powered reporting transforms raw data into clear, actionable insights. Automate your reporting process, gain accurate results quickly, and make smarter decisions with intelligent, data-driven reports tailored to your needs.</p>
    </div>
    
  );
};

export default Hero;
