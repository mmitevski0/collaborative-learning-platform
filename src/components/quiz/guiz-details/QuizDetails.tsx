import './QuizDetails.css'

export interface QuizDetailsProps {
    quiz: {
        title: string;
        color: string;
    }
}

const QuizDetails: React.FC<QuizDetailsProps> = ({ quiz }) => {
    return (
        <div className="card" style={{ width: '8rem', height: '12rem', padding: '0', textAlign: 'initial', border: 'none' }}>
            <div className="placeholder-box" style={{ backgroundColor: quiz.color }}></div>
            <div className="card-body" style={{ height: '4rem', paddingTop: '5px'}}>
                <h5 className="card-title" style={{marginBottom: '0', fontSize: '16px'}}>{quiz.title}</h5>
            </div>
        </div>
    )
}

export default QuizDetails