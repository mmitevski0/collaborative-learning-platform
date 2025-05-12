import { useState } from 'react';
import quizData from '../../data/sampleQuiz.json';
import './QuizView.css';

interface QuizAnswer {
  [key: number]: string;
}

const QuizView: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<QuizAnswer>({});

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  return (
    <div className="quiz-view-container">                    

      <h2 className="quiz-title">{quizData.title}</h2>

      <div className="quiz-content">
        <div className="questions-grid">
          {quizData.questions.map((q, index) => (
            <div key={q.id} className="question-card">
              <h3 className="question-number">Question {index + 1}.</h3>
              <p className="question-text">{q.text}</p>
              
              <div className="options-container">
                {q.options.map((opt, i) => (
                  <div 
                    key={i} 
                    className={`option ${selectedAnswers[q.id] === opt ? 'selected' : ''}`}
                    onClick={() => handleAnswerSelect(q.id, opt)}
                  >
                    <div className="radio-outer">
                      <div className="radio-inner"></div>
                    </div>
                    <span className="option-text">{opt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="bottom-content">
          <button className="submit-button">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default QuizView;