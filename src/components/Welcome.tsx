import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

const Welcome: React.FC = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white font-sans">
      <div className="absolute inset-0 -z-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,320 C480,160 960,160 1440,0"
            stroke="#ccc"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M0,280 C480,120 960,120 1440,-20"
            stroke="#ddd"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M0,240 C480,80 960,100 1440,10"
            stroke="#bbb"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      <div className="welcome-container">
        <div className="welcome-content">
          <h1 className="welcome-title">School AI<br />ChatBot</h1>
          <div className="welcome-button-group">
            <Link to="/login">
              <button className="welcome-button">Log In</button>
            </Link>
            <Link to="signup">
              <button className="welcome-button welcome-signup-button">Sign Up</button>
            </Link>
          </div>
          <div className="welcome-button-group">
            <button className="welcome-try-button">Try it First</button>
          </div>
          <p className="welcome-footer">Terms of Service | Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
