import { useState } from 'react';
import './QuizView.css';
import { useLocation } from 'react-router-dom';
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from '../Login';
import { PDFDownloadLink, Document, Page, Text, StyleSheet, View, Image } from '@react-pdf/renderer';

interface QuizAnswer {
  [key: number]: string;
}

interface QuizQuestion {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

interface QuizData {
  title: string;
  questions: QuizQuestion[];
}

interface QuizViewProps {
  quizData: QuizData;
}

const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 30,
    fontFamily: 'Helvetica',
    height: '100%'
  },
  logoText: {
    fontSize: 36,
    color: '#7886C7',
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'Helvetica-Bold',
  },
  logoSubText: {
    fontSize: 16,
    color: '#7886C7',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Helvetica',
  },
  certificateBorder: {
    margin: 20,
    padding: 40,
    borderWidth: 2,
    borderColor: '#000',
    borderStyle: 'solid',
    borderRadius: 5,
    height: '95%',
    justifyContent: 'space-between'
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#2d3748',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  content: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 1.5,
  },
  score: {
    fontSize: 28,
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
    color: '#2d3748',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    marginTop: 30,
    textAlign: 'center',
    color: '#4a5568',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  seal: {
    width: 250,
    height: 150,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 30,
    opacity: 0.8,
  },
  signature: {
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 10,
    width: 200,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 12,
    color: '#4a5568',
  }
});

const QuizPDF = ({ name, score, total }: { name: string, score: number, total: number }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.certificateBorder}>
        <Text style={pdfStyles.logoText}>School AI ChatBot</Text>
        <Text style={pdfStyles.header}>Certificate of Completion</Text>
        <Text style={pdfStyles.content}>
          This is to certify that
        </Text>
        <Text style={[pdfStyles.content, { fontSize: 24, fontWeight: 'bold', marginTop: 10 }]}>
          {name}
        </Text>
        <Text style={pdfStyles.content}>
          has successfully completed the quiz
        </Text>
        <Text style={pdfStyles.score}>
          with a score of {score} out of {total}
        </Text>
        <Text style={pdfStyles.date}>
          Awarded on {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </Text>
        <Image
          src="/seal.png"
          style={pdfStyles.seal}
        />
        <Text style={pdfStyles.signature}>
          Authorized Signature
        </Text>
      </View>
    </Page>
  </Document>
);

const QuizView: React.FC = () => {
  const location = useLocation();
  const quizData = location.state?.quizData as QuizData;
  const [selectedAnswers, setSelectedAnswers] = useState<QuizAnswer>({});
  const [score, setScore] = useState<number | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const { user } = useAuth();
  const [showModal, setShowModal] = useState<boolean>(false);

  if (!quizData || !quizData.questions) {
    return <div>No quiz data available</div>;
  }

  const handleAnswerSelect = (questionId: number, answer: string): void => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = () => {
    let correct = 0;
    quizData.questions.forEach((question: QuizQuestion) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct += 1;
      }
    });
    setScore(correct);
  };

  const handleSave = async () => {
    if (user && user.id) {
      await addDoc(collection(db, "users", user.id, "quizzes"), {
        quizData,
        selectedAnswers,
        score,
        timestamp: serverTimestamp(),
      });
      setSaveStatus("Progress saved!");
      setShowModal(true);
    } else {
      setSaveStatus("You must be logged in to save progress.");
    }
  };

  if (!quizData || !quizData.questions) {
    return <div>No quiz data available</div>;
  }

  return (
    <div className="quiz-view-container">
      <h2 className="quiz-title">{quizData.title}</h2>
      <div className="quiz-content">
        <div className="questions-grid">
          {quizData.questions.map((question, index) => (
            <div key={question.id} className="question-card">
              <h3 className="question-number">Question {index + 1}</h3>
              <p className="question-text">{question.text}</p>
              <div className="options-container">
                {question.options.map((option, optionIndex) => (
                  <div
                    key={`${question.id}-${optionIndex}`}
                    className={`option ${selectedAnswers[question.id] === option ? 'selected' : ''}`}
                    onClick={() => handleAnswerSelect(question.id, option)}
                  >
                    <div className="radio-outer">
                      <div className="radio-inner"></div>
                    </div>
                    <span className="option-text">{option}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="bottom-content">
          {score === null && (
            <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={Object.keys(selectedAnswers).length !== quizData.questions.length}
            >
              Submit
            </button>
          )}
          {/* {score !== null && (
            <>
              <div className="score-result">
                You scored {score} out of {quizData.questions.length}
              </div>
              <button className="submit-button" onClick={handleSave}>
                Save Progress
              </button>
              {saveStatus && <div className="save-status">{saveStatus}</div>}
            </>
          )} */}
          {score !== null && (
            <>
              <div className="score-result">
                You scored {score} out of {quizData.questions.length}
              </div>
              <div className="button-group">
                <button className="submit-button" onClick={handleSave}>
                  Save Progress
                </button>
                <PDFDownloadLink
                  document={
                    <QuizPDF
                      name={user?.name || 'Student'}
                      score={score}
                      total={quizData.questions.length}
                    />
                  }
                  fileName="quiz-certificate.pdf"
                  className="submit-button pdf-button"
                >
                  {({ blob, url, loading, error }) =>
                    loading ? 'Generating PDF...' : 'Export PDF'
                  }
                </PDFDownloadLink>
              </div>
              {saveStatus && <div className="save-status">{saveStatus}</div>}
            </>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlayProgress" onClick={() => setShowModal(false)}>
          <div className="confetti">
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
          </div>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Congratulations! 🎉</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <p>Your progress has been successfully saved!</p>
              <p className="score-highlight">Score: {score} out of {quizData.questions.length}</p>
            </div>
            <div className="modal-footer">
              <button className="modal-button" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizView;