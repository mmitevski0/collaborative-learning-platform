import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { createContext, useContext, useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import "./SignUp.css";

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

      <div className="signup-container">
        <div className="signup-card">
          <h1 className="signup-title">School AI ChatBot</h1>
          <h2 className="signup-subtitle">Welcome back</h2>
          <p className="signup-description">Enter your email to log in for this app</p>

          <input
            type="email"
            placeholder="email@domain.com"
            className="signup-input"
          />

          <button className="signup-button">
            Continue
          </button>

          <p className="signup-login-link">
            Don't have an account?{" "}
            <a href="/signup">Sign Up</a>
          </p>

          <p className="signup-divider">or continue with</p>

          <button 
              type="button"
              onClick={() => login()}
              className="signup-google-button">
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