import { useEffect, useState } from 'react';
import QuizForm from '../quiz-form/QuizForm';
import './QuizPage.css';
import '../quiz/quiz-list/QuizList.css';
import { db } from "../../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useAuth } from '../Login';

const QuizPage: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [userQuizzes, setUserQuizzes] = useState<any[]>([]);
  const { user } = useAuth();
  useEffect(() => {
    if (!user?.id) return; 

    const fetchQuizzes = async () => {
      const q = query(
        collection(db, "users", user.id, "quizzes"),
        orderBy("timestamp", "desc")
      );
      const quizSnap = await getDocs(q);
      const quizzes = quizSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUserQuizzes(quizzes);
    };
    fetchQuizzes();
  }, [user?.id]);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp?.toDate) return "";
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatScore = (score: number) => {
    if (score === undefined || score === null) return "-";
    return `${score}%`;
  };

  const filteredQuizzes = userQuizzes.filter(quiz =>
    quiz.quizData?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quiz.quizData?.subject?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="quizpage-list-container">
      <div className="quizpage-list-header">
        <h1 className="quizpage-list-title">Your Quizzes</h1>
        <button className="quizpage-header-button" onClick={() => setShowForm(true)}>
          + New Quiz
        </button>
      </div>

      <input
        className="quizpage-list-search"
        placeholder="Search quizzes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="quizpage-list-column-headers">
        <span>Date</span>
        <span>Title</span>
        <span>Score</span>
        <span></span>
      </div>

      <div className="quizpage-list">
        {filteredQuizzes.map((quiz) => (
          <div key={quiz.id} className="quizpage-item-container">
            <div className="quizpage-item-main" onClick={() => toggleExpand(quiz.id)}>
              <div className="quizpage-item-date">
                {formatDate(quiz.timestamp)}
              </div>
              <div className="quizpage-item-subject">{quiz.quizData?.title}</div>
              <div className="quizpage-item-score">{formatScore(quiz.score)}</div>
              <div className="quizpage-item-toggle">
                {expandedItems[quiz.id] ? '▼' : '▶'}
              </div>
            </div>
            {expandedItems[quiz.id] && (
              <div className="quizpage-expanded-content">
                <h3>Quiz Details</h3>
                <div className="quiz-details">
                  {quiz.quizData?.questions?.map((question: any, index: number) => (
                    <div key={index} className="quiz-question">
                      <p><strong>Q{index + 1}:</strong> {question.text}</p>
                      <ul>
                        {question.options.map((option: string, optIndex: number) => {
                          const userAnswer = quiz.selectedAnswers?.[question.id];
                          let className = "";
                          if (option === question.correctAnswer) {
                            className = "correct";
                          }
                          if (option === userAnswer && userAnswer !== question.correctAnswer) {
                            className = "incorrect";
                          }
                          return (
                            <li key={optIndex} className={className}>
                              {option}
                              {option === question.correctAnswer && <span className="answer-label"> (Correct)</span>}
                              {option === userAnswer && userAnswer !== question.correctAnswer && (
                                <span className="answer-label"> (Your answer)</span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={(e) => {
          if (e.target === e.currentTarget) setShowForm(false);
        }}>
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
