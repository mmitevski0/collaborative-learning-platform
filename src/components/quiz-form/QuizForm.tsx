import { useState } from 'react';
import './QuizForm.css';
import { sendMessageToGemini } from '../../AIModel';
import QuizView from '../quiz-view/QuizView';
import { useNavigate } from 'react-router-dom';


const HARDCODED_CONTENT = `"\n\nwake up to reality: Nothing ever goes as planned in this accursed world. The longer you live, the more you realize that the only things that truly exist in this reality are merely pain, suffering and Anfutility. Listen... Everywhere you look in this world, wherever there is light, there will always be \nshadows to be found as well. As long as there is a concept of victors, the vanquished will also exist. \nThe selfish intent of wanting to preserve peace initiates wars and hatzed is born in order to protect \nlove. There are nexuses, causal relationships that cannot be separated. In \nI want to sever the fate of this world. A world of only victors. A world of only peace. A world of only \nlove. I will create such a world. I am...the ghost of the Uchihas. For truly this reality...is a hell, \n \n- Madara Uchiha`;

function cleanAIResponse(aiText: string) {
  return aiText
    .replace(/^\s*```(?:json)?\s*/i, '') 
    .replace(/\s*```$/, '')
    .trim();
}

const QuizForm: React.FC = () => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [subject, setSubject] = useState('');

  const handleGenerate = async () => {
    const prompt = `
          Given the following content about ${subject}:

          ${HARDCODED_CONTENT}

          Generate 5 multiple-choice questions based on the key concepts from this content.
          Each question should have 4 options with one correct answer.
          Respond ONLY with valid JSON matching this schema:
          {
            "title": "string",
            "questions": [
            {
              "id": number,
              "text": "string",
              "options": ["string", "string", "string", "string"],
              "correctAnswer": "string"
          }
        ]
    }
    No explanations, no markdown, no comments, no code blocks.`;

    const aiText = await sendMessageToGemini(prompt);
    try {
      console.log("AI response:", aiText);
      const cleaned = cleanAIResponse(aiText);
      const quiz = JSON.parse(cleaned);
      setQuizData(quiz);
      navigate('/home/quiz-view', { state: { quizData: quiz } });
    } catch (err) {
      alert('Failed to parse AI response');
    }
  };


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
            value={subject}
            onChange={e => setSubject(e.target.value)}
          />
        </div>
        <div className="quiz-form-file-container">
          <label className="quiz-form-file-label">
            <span>Upload file</span>
            <input type="file" className="quiz-form-file" />
          </label>
        </div>
        <button className="quiz-form-button" onClick={handleGenerate}>Generate</button>
      </div>
    </div>
  );
};

export default QuizForm;
