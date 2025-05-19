import React from "react";
import "./Legal.css";
import { useNavigate } from "react-router-dom";

const Terms: React.FC = () => {
    const navigate = useNavigate();
  return (
    <div className="legal-wrapper">
    <button className="back-button" onClick={() => navigate("/")}>
            ← Back 
          </button>
    <div className="legal-container">
      <div className="legal-content legal-box">
        <h1 className="legal-title">Terms of Service</h1>
        <div className="legal-text">
          <p><strong>1. Acceptance of Terms</strong><br />
          By accessing or using our School AI ChatBot, you agree to be bound by these Terms of Service.</p>

          <p><strong>2. Use of the Service</strong><br />
          You agree to use the application only for lawful purposes and in a way that does not infringe on the rights of others.</p>

          <p><strong>3. User Accounts</strong><br />
          You are responsible for maintaining the confidentiality of your login credentials and all activities under your account.</p>

          <p><strong>4. Intellectual Property</strong><br />
          All content, branding, and materials are the intellectual property of School AI unless otherwise stated.</p>

          <p><strong>5. Limitation of Liability</strong><br />
          We are not liable for any damages or losses resulting from the use or inability to use our service.</p>
        </div>
      </div>
      </div>
      <div className="svg-background">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,320 C480,160 960,160 1440,0" strokeWidth="1" stroke="#FFE1E0" fill="none" />
          <path d="M0,280 C480,120 960,120 1440,-20" stroke="#FFFBDE" strokeWidth="1" fill="none" />
          <path d="M0,240 C480,80 960,100 1440,10" stroke="#F4F8D3" strokeWidth="1" fill="none" />
          <path d="M0,253 C480,100 910,110 1440,30" stroke="#A6D6D6" strokeWidth="1" fill="none" />
        </svg>
      </div>
    </div>
  );
};

export default Terms;