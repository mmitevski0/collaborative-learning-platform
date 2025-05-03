import React from "react";

const Welcome: React.FC = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* First line */}
          <path
            d="M0,100 C30,50 70,50 100,0"
            stroke="#ccc"
            strokeWidth="1"
            fill="none"
          />
          {/* Second line */}
          <path
            d="M0,90 C30,40 70,40 100,-10"
            stroke="#ddd"
            strokeWidth="1"
            fill="none"
          />
          {/* Third line*/}
          <path
            d="M0,70 C30,10 70,30 100,10"
            stroke="#bbb"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative z-10 flex items-center justify-start h-full">
        <div className="ml-24 max-w-md text-center">
          <h1 className="text-5xl font-bold text-blue-500 whitespace-pre-line mb-8">
            School AI{"\n"}ChatBot
          </h1>
          <div className="flex justify-center space-x-4 mb-4">
            <button className="bg-black text-white py-2 px-8 rounded hover:bg-gray-800">
              Log In
            </button>
            <button className="bg-black text-white py-2 px-8 rounded hover:bg-gray-800">
              Sign Up
            </button>
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