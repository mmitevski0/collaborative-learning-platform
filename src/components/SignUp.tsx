import React from "react";

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

      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="w-full max-w-md bg-white/90 p-6 rounded-2xl shadow-xl text-center">
          <h1 className="text-4xl font-extrabold text-blue-500 mb-3">School AI ChatBot</h1>
          <h2 className="text-lg font-medium text-black mb-1">Create an account</h2>
          <p className="text-sm text-gray-600 mb-6">Enter your email to sign up</p>

          <input
            type="email"
            placeholder="email@domain.com"
            className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <button className="w-full py-3 mb-4 bg-black text-white rounded-xl hover:bg-gray-800 transition">
            Continue
          </button>

          <p className="text-sm text-gray-600 mb-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Log in
            </a>
          </p>

          <p className="text-sm text-gray-600 mb-3">or continue with</p>

          <button className="w-full flex items-center justify-center gap-3 py-3 mb-4 bg-white border border-gray-300 rounded-xl shadow hover:bg-gray-100 transition">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google Logo"
              className="w-5 h-5"
            />
            <span className="text-sm font-medium text-gray-700">Sign up with Google</span>
          </button>

          <p className="text-xs text-gray-400">Terms of Service | Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
