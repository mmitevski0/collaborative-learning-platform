import React from "react";
import "./Legal.css";
import { useNavigate } from "react-router-dom";

const Privacy: React.FC = () => {
    const navigate = useNavigate();
  return (
    <div className="legal-wrapper">
         <button className="back-button" onClick={() => navigate("/")}>
            ← Back 
          </button>
      <div className="legal-container">
        <div className="legal-content legal-box">
          <h1 className="legal-title">Privacy Policy</h1>
          <div className="legal-text">
            <p><strong>1. Information Collection</strong><br />
              We collect information you provide when signing up, including your name, email, and interactions with the chatbot.</p>
            <p><strong>2. Data Usage</strong><br />
              Collected data is used to improve the chatbot experience and deliver personalized educational content.</p>
            <p><strong>3. Data Sharing</strong><br />
              We do not share your data with third parties except as required by law or with your explicit consent.</p>
            <p><strong>4. Data Security</strong><br />
              Your data is stored securely and access is restricted to authorized personnel only.</p>
            <p><strong>5. Your Rights</strong><br />
              You have the right to request access, correction, or deletion of your personal data.</p>
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

export default Privacy;