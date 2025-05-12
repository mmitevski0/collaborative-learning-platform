import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Welcome from './components/Welcome';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Navigation from './components/Navigation';
import ChatHistory from './components/ChatHistory';
import ChatWindow from './components/ChatWindow';

function App() {
  return (
    <div className='container'>
      {/* <ChatHistory />  <ChatWindow />  <QuizForm />  <QuizList />  <QuizView /> */}
      <ChatHistory />
      <ChatWindow />
    </div>
  );
}

export default App;

