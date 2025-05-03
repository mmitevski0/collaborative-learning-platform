import React from "react";

const Login: React.FC = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white">
      {/* Background solid lines with different directions */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* First line with a different angle */}
          <path
            d="M0,100 C40,30 60,70 100,10"
            stroke="#ccc"
            strokeWidth="1"
            fill="none"
          />
          {/* Second line with another angle */}
          <path
            d="M0,50 C40,90 80,10 100,50"
            stroke="#ddd"
            strokeWidth="1"
            fill="none"
          />
          {/* Third line with another variation */}
          <path
            d="M0,80 C20,20 80,40 100,90"
            stroke="#bbb"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      {/* Login container */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center max-w-md p-6 rounded-lg">
          {/* Main Heading */}
          <h1 className="text-5xl font-bold text-blue-500 mb-4 whitespace-nowrap">
            School AI ChatBot
          </h1>
          {/* Subheading */}
          <h2 className="text-xl font-semibold text-black mb-4">Welcome back</h2>
          {/* Description */}
          <p className="text-sm text-gray-600 mb-6">
            Enter your email to log in for this app
          </p>
          {/* Email input */}
          <input
            type="email"
            placeholder="email@domain.com"
            className="w-full p-3 border border-gray-300 rounded-xl mb-4"
          />
          {/* Continue button */}
          <button className="w-full py-3 bg-black text-white rounded-xl mb-4 hover:bg-gray-800">
            Continue
          </button>
          {/* Sign-up prompt */}
          <p className="text-sm text-gray-600 mb-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
          {/* Or continue with */}
          <p className="text-sm text-gray-600 mb-4">or continue with</p>
          {/* Google button */}
          <button className="w-full py-3 bg-gray-200 text-black rounded-xl flex items-center justify-center mb-4 hover:bg-gray-300">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google.png"
              alt="Google Logo"
              className="w-6 h-6 mr-3"
            />
            <span>Google</span>
          </button>
          {/* Terms of Service and Privacy Policy */}
          <p className="text-xs text-gray-400">
            Terms of Service | Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;