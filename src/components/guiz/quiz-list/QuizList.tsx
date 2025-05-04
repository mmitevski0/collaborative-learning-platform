import QuizDetails, { QuizDetailsProps } from "../guiz-details/QuizDetails"

const QuizList: React.FC = () => {
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
        <div style={{width: '700px'}}>
            <div className="d-flex justify-content-between align-items-center">
                <h3 style={{ textAlign: 'left', marginBottom: '0'}}>Quiz generator</h3>
                <button className="btn btn-primary">New quiz generator</button>
            </div>
            <div>
                <p style={{textAlign: 'left'}}>Previous 7 days</p>
            </div>
            <div className="d-flex justify-content-center" style={{ flexDirection: 'column' }}>
                <div style={{display: 'flex', gap: '20px', padding: '0', width: '100%'}}>
                    {quizes.map((quiz, index) => (
                        <QuizDetails key={index} quiz={quiz.quiz} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default QuizList