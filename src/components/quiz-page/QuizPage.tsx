import { useState } from 'react';
import QuizForm from '../quiz-form/QuizForm';
import './QuizPage.css';
import '../quiz/quiz-list/QuizList.css';

const QuizPage: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);

  const quizzes = [
    { id: '1', code: "Усил", date: "Dec 5", subject: "Управување со ИКТ проекти", quizzes: ["Quizz 2", "Quizz 1"] },
    { id: '2', code: "Вис", date: "Dec 5", subject: "Веројатност и статистика", quizzes: ["Quizz 2", "Quizz 1"] },
    { id: '3', code: "Ос", date: "Dec 5", subject: "Оперативни системи", quizzes: ["Quizz 1"] },
    { id: '4', code: "Дм", date: "Dec 5", subject: "Дискретна математика", quizzes: [] },
    { id: '5', code: "Ввнп", date: "Dec 5", subject: "Вовед во науката за податоци", quizzes: [] },
    { id: '6', code: "Ма", date: "Dec 5", subject: "Мобилни апликации", quizzes: [] },
    { id: '7', code: "Нп", date: "Dec 5", subject: "Напредно програмирање", quizzes: [] },
    { id: '8', code: "Ансб", date: "Dec 5", subject: "Анализа на софтверските барања", quizzes: [] },
  ];

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredQuizzes = quizzes.filter(quiz =>
    quiz.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quiz.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="quizpage-list-container">
      <div className="quizpage-list-header">
        <h1 className="quizpage-list-title">Quiz Generator</h1>
        <button className="quizpage-header-button" onClick={() => setShowForm(true)}>New Quiz</button>
      </div>

      <input
        className="quizpage-list-search"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <button className="quizpage-more-button">≡</button>

      <div className="quizpage-list-column-headers">
        <span className="quizpage-date-header">Date</span>
        <span className="quizpage-subject-header">Subject</span>
      </div>

      <div className="quizpage-list">
        {filteredQuizzes.map((item) => (
          <div key={item.id} className="quizpage-item-container">
            <div className="quizpage-item-main" onClick={() => toggleExpand(item.id)}>
              <div className="quizpage-item-code">{item.code}</div>
              <div className="quizpage-item-content">
                <div className="quizpage-item-date">{item.date}</div>
                <div className="quizpage-item-subject">{item.subject}</div>
                <div className="quizpage-item-toggle">
                  {expandedItems[item.id] ? '▲' : '▼'}
                </div>
              </div>
            </div>

            {expandedItems[item.id] && item.quizzes.length > 0 && (
              <div className="quizpage-expanded-content">
                {item.quizzes.map((quiz, index) => (
                  <div key={index} className="quizpage-option">
                    <span className="quizpage-name">{quiz}</span>
                    <button className="take-quizpage-button">Take quiz</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setShowForm(false)}>✖</button>
            <QuizForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
