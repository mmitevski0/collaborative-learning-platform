import { useState } from 'react';
import ChatHistory from './components/ChatHistory';
import ChatWindow from './components/ChatWindow';
import QuizForm from './components/QuizForm';
import QuizList from './components/QuizList';
import QuizView from './components/QuizView';

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

