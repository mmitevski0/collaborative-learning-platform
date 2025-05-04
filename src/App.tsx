import { useState } from 'react';
import QuizForm from './components/QuizForm';
import QuizList from './components/QuizList';
import QuizView from './components/QuizView';

function App() {
  return (
    <div>
      {/* <QuizForm />  <QuizList />  <QuizView /> */}
      <QuizView />
    </div>
  );
}

export default App;

