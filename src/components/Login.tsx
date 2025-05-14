import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { createContext, useContext, useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';

interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const SignUp: React.FC = () => {
    const { setUser } = useAuth();

const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${response.access_token}` },
        }).then(res => res.json());

        const userData = {
          id: userInfo.sub,
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture
        };

        setUser(userData);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    onError: () => console.log('Login Failed'),
  });

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

          <div className="flex justify-center mb-5">
            <button
              type="button"
              onClick={() => login()}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl shadow hover:bg-gray-100 transition"
            >
              <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>
          </div>

          <p className="text-xs text-gray-400">Terms of Service | Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
