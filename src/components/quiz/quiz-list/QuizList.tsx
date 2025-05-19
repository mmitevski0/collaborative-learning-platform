import { useEffect, useState } from "react";
import QuizDetails, { QuizDetailsProps } from "../guiz-details/QuizDetails";
import QuizForm from "../../quiz-form/QuizForm";
import { db } from "../../../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useAuth } from '../../Login';
import "./QuizList.css";
import { useNavigate } from "react-router-dom";



const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};


const QuizList: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const [quizzes, setQuizzes] = useState<QuizDetailsProps[]>([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.id) return;

        const fetchQuizzes = async () => {
            const q = query(
                collection(db, "users", user.id, "quizzes"),
                orderBy("timestamp", "desc")
            );
            const quizSnap = await getDocs(q);
            const fetchedQuizzes = quizSnap.docs.map(doc => {
                const data = doc.data();
                return {
                    quiz: {
                        title: data.quizData?.title || "No title",
                        color: getRandomColor() || "#ccc",
                    }
                };
            });
            setQuizzes(fetchedQuizzes);
        };

        fetchQuizzes();
    }, [user?.id]);

    return (
        <div className="QuizList-container">
            <div className="QuizList-header">
                <h3 className="QuizList-title">Quiz generator</h3>
                <button
                    className="QuizList-header-button"
                    onClick={() => setShowForm(true)}
                >
                    New Quiz Generator
                </button>
            </div>
            <div>
                <p className="QuizList-subtitle">Previous 7 days</p>
            </div>
            <div className="QuizList-grid">
                {quizzes.length > 0 ? (
                    quizzes.map((quiz, index) => (
                        <div
                            key={index}
                            className="QuizList-quiz"
                            onClick={() => navigate("/home/quiz")}
                        >
                            <QuizDetails quiz={quiz.quiz} />
                        </div>

                    ))
                ) : (
                    <p>No quizzes found.</p>
                )}
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

export default QuizList;
