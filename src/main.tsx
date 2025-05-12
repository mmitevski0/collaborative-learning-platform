import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* the google client id should be here to enable google sign in but my free trial has ended someone else should do it :) */}
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
