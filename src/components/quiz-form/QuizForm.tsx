import './QuizForm.css';

const QuizForm: React.FC = () => {
  return (
    <div className="quiz-form-container">
      <h2 className="quiz-form-title">Quiz Generator</h2>
      <div className="quiz-form-group">
        <div className="quiz-form-select-container">
          <input
            type="text"
            className="quiz-form-input"
            placeholder="Enter subject name"
            name="Subject"
          />
        </div>
        <div className="quiz-form-file-container">
          <label className="quiz-form-file-label">
            <span>Upload file</span>
            <input type="file" className="quiz-form-file" />
          </label>
        </div>
        <button className="quiz-form-button">Generate</button>
      </div>
    </div>
  );
};

export default QuizForm;
