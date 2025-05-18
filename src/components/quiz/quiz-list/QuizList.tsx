import { useState } from "react";
import QuizDetails, { QuizDetailsProps } from "../guiz-details/QuizDetails";
import QuizForm from "../../quiz-form/QuizForm";
import "./QuizList.css";

const QuizList: React.FC = () => {
    const [showForm, setShowForm] = useState(false);

    const quizes: QuizDetailsProps[] = [
                {
            quiz: {
                color: '#3D8D7A',
                title: 'Управување со ИКТ проекти'
            }
        },
        {
            quiz: {
                color: '#3D8D7A',
                title: 'Дискретна математика'
            }
        },
        {
            quiz: {
                color: '#5F99AE',
                title: 'Веројатност и статистика'
            }
        },
        {
            quiz: {
                color: '#E4EFE7',
                title: 'Електронска и мобилна трговија'
            }
        },
        {
            quiz: {
                color: '#E69DB8',
                title: 'Менаџмент информациски системи'
            }
        },
        {
            quiz: {
                color: '#E69DB8',
                title: 'Компјутерски мрежи'
            }
        },
        {
            quiz: {
                color: 'orange',
                title: 'Веб дизајн'
            }
        },
        {
            quiz: {
                color: '#E69DB8',
                title: 'Менаџмент информациски системи'
            }
        },
        {
            quiz: {
                color: '#E69DB8',
                title: 'Компјутерски мрежи'
            }
        },
        {
            quiz: {
                color: 'orange',
                title: 'Веб дизајн'
            }
        },
        {
            quiz: {
                color: 'pink',
                title: 'Бази на податоци'
            }
        }
    ];

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
                {quizes.map((quiz, index) => (
                    <div key={index} className="QuizList-quiz">
                        <QuizDetails quiz={quiz.quiz} />
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

export default QuizList;