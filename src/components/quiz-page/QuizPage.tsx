import { useState } from 'react';
import QuizForm from '../quiz-form/QuizForm'; // Make sure the path is correct
import './QuizPage.css';

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
    <div className="quiz-list-container">
      <div className="quiz-list-header">
        <h1 className="quiz-list-title">Quiz Generator</h1>
        <button className="header-button" onClick={() => setShowForm(true)}>New Quiz</button>
      </div>

      <input
        className="quiz-list-search"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <button className="more-button">≡</button>

      <div className="quiz-list-column-headers">
        <span className="date-header">Date</span>
        <span className="subject-header">Subject</span>
      </div>

      <div className="quiz-list">
        {filteredQuizzes.map((item) => (
          <div key={item.id} className="quiz-item-container">
            <div className="quiz-item-main" onClick={() => toggleExpand(item.id)}>
              <div className="quiz-item-code">{item.code}</div>
              <div className="quiz-item-content">
                <div className="quiz-item-date">{item.date}</div>
                <div className="quiz-item-subject">{item.subject}</div>
                <div className="quiz-item-toggle">
                  {expandedItems[item.id] ? '▲' : '▼'}
                </div>
              </div>
            </div>

            {expandedItems[item.id] && item.quizzes.length > 0 && (
              <div className="quiz-expanded-content">
                {item.quizzes.map((quiz, index) => (
                  <div key={index} className="quiz-option">
                    <span className="quiz-name">{quiz}</span>
                    <button className="take-quiz-button">Take quiz</button>
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
