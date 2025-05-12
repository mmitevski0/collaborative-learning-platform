import React from "react";
import { Link } from "react-router-dom";

const Welcome: React.FC = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white">
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

      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="text-center max-w-md w-full">
          <h1 className="text-5xl font-bold text-blue-500 mb-8 leading-tight">
            School AI<br />ChatBot
          </h1>
          <div className="flex justify-center space-x-4 mb-4">
            <Link to="/login">
              <button className="bg-black text-white py-2 px-8 rounded hover:bg-gray-800">
                Log In
              </button>
            </Link>
            <Link to="signup">
              <button className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800">
                Sign Up
              </button>
            </Link>
          </div>
          <div className="flex justify-center mb-4">
            <button className="bg-white text-gray-500 py-1 px-4 rounded hover:bg-gray-100">
              Try it First
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-6">
            Terms of Service | Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
