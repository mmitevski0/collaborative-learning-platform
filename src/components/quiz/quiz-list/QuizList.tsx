import { useState } from "react";
import QuizDetails, { QuizDetailsProps } from "../guiz-details/QuizDetails"
import QuizForm from "../../quiz-form/QuizForm";

const QuizList: React.FC = () => {
    const [showForm, setShowForm] = useState(false);


    const quizes: QuizDetailsProps[] = [
        {
            quiz: {
                color: 'red',
                title: 'Дискретна математика'
            }
        },
        {
            quiz: {
                color: 'gray',
                title: 'Веројатност и статистика'
            }
        },
        {
            quiz: {
                color: 'green',
                title: 'Електронска и мобилна трговија'
            }
        },
        {
            quiz: {
                color: 'lightblue',
                title: 'Менаџмент информациски системи'
            }
        },
        {
            quiz: {
                color: 'lightblue',
                title: 'Менаџмент информациски системи'
            }
        }
    ]

    return (
        <div className="container" style={{ width: '700px' }}>
            <div className="d-flex justify-content-between align-items-center">
                <h3 style={{ textAlign: 'left', marginBottom: '0' }}>Quiz generator</h3>
                <button className="header-button" onClick={() => setShowForm(true)}>New Quiz Generate</button>
            </div>
            <div>
                <p style={{ textAlign: 'left' }}>Previous 7 days</p>
            </div>
            <div className="d-flex justify-content-center" style={{ flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '20px', padding: '0', width: '100%' }}>
                    {quizes.map((quiz, index) => (
                        <QuizDetails key={index} quiz={quiz.quiz} />
                    ))}
                </div>
            </div>

            {
                showForm && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <button className="close-modal" onClick={() => setShowForm(false)}>✖</button>
                            <QuizForm />
                        </div>
                    </div>
                )
            }
        </div >
    );
};


export default QuizList