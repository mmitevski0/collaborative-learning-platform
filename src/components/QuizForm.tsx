import './QuizForm.css';

const QuizForm: React.FC = () => {
  return (
    <div className="quiz-form-container">
      <h2 className="quiz-form-title">Quiz Generator</h2>
      <div className="quiz-form-group">
        <div className="quiz-form-select-container">
          <select className="quiz-form-select">
            <option hidden disabled selected>Subject</option>
            <option>Управување со ИКТ проекти</option>
            <option>Веројатност и статистика</option>
            <option>Оперативни системи</option>
            <option>Дискретна математика</option>
            <option>Вовед во науката за податоци</option>
            <option>Мобилни апликации</option>
            <option>Напредно програмирање</option>
            <option>Анализа на софтверските барања</option>
          </select>
          <div className="dropdown-arrow">▼</div>
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
