import React from "react";
import "./SignUp.css";

const SignUp: React.FC = () => {
  return (
    <div className="relative w-screen h-screen bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,320 C480,120 960,220 1440,60" stroke="#ccc" strokeWidth="1" fill="none" />
          <path d="M0,240 C400,180 1040,20 1440,100" stroke="#ddd" strokeWidth="1" fill="none" />
          <path d="M0,200 C600,0 840,320 1440,240" stroke="#bbb" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="signup-container">
        <div className="signup-card">
          <h1 className="signup-title">School AI ChatBot</h1>
          <h2 className="signup-subtitle">Create an account</h2>
          <p className="signup-description">Enter your email to sign up for this app</p>

          <input
            type="email"
            placeholder="email@domain.com"
            className="signup-input"
          />

          <button className="signup-button">
            Continue
          </button>

          <p className="signup-login-link">
            Already have an account?{" "}
            <a href="/login">Log in</a>
          </p>

          <p className="signup-divider">or continue with</p>

          <button className="signup-google-button">
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="signup-google-icon"
            />
            <span className="signup-google-text">Google</span>
          </button>

          <p className="signup-footer">Terms of Service | Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
