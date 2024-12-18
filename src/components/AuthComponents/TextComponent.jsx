import React from "react";
import { useNavigate } from 'react-router-dom';
import Typewriter from "typewriter-effect";

const TextComponent = ({ onClick }) => {
  const userExist = localStorage.getItem("UserId");
  const navigate = useNavigate()
  return (
    <div className="col-md-6">
      <h1>
        <Typewriter
          options={{
            strings: [
              "Welcome to AI-powered reporting!",
              "Transform data into reports with AI.",
              "Start Your Journey Today",
            ],
            autoStart: true,
            loop: true,
            delay: 100,
            deleteSpeed: 50,
          }}
        />
      </h1>
      <p>
        AI-powered reporting transforms raw data into clear, actionable
        insights. Automate your reporting process, gain accurate results
        quickly, and make smarter decisions with intelligent, data-driven
        reports tailored to your needs.
      </p>
      {/* Login Button */}
      {userExist ? (
        <button
          onClick={() => navigate("dashboard")}
          className="btn btn-primary"
        >
          Back to Dashboard
        </button>
      ) : (
        <button onClick={onClick} className="btn btn-primary">
          {" "}
          Login to Explore
        </button>
      )}
    </div>
  );
};

export default TextComponent;
