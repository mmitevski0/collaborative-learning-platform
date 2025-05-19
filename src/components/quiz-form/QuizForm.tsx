import { useState } from 'react';
import './QuizForm.css';
import { sendMessageToGemini } from '../../AIModel';
import { useNavigate } from 'react-router-dom';

function cleanAIResponse(aiText: string) {
  return aiText
    .replace(/^\s*```(?:json)?\s*/i, '')
    .replace(/\s*```$/, '')
    .trim();
}

const QuizForm: React.FC = () => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState<any>(null);
  const [subject, setSubject] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files?.length) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        setError('Please upload a PDF file');
        setPdfFile(null);
        return;
      }
      setPdfFile(file);
    }
  };

  const handleGenerate = async () => {
    if (!subject.trim()) {
      alert('Please enter a subject');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let contentText = '';

      if (pdfFile) {
        const formData = new FormData();
        formData.append('file', pdfFile);

        const response = await fetch(
          'https://europe-west3-uiktp-team-project.cloudfunctions.net/extractPdfText',
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to extract PDF text: ${response.statusText}`);
        }

        const data = await response.json();
        contentText = data.text;
      } else {
        contentText = `
          wake up to reality: Nothing ever goes as planned in this accursed world. The longer you live, the more you realize that the only things that truly exist in this reality are merely pain, suffering and Anfutility. Listen... Everywhere you look in this world, wherever there is light, there will always be shadows to be found as well. As long as there is a concept of victors, the vanquished will also exist. The selfish intent of wanting to preserve peace initiates wars and hatzed is born in order to protect love. There are nexuses, causal relationships that cannot be separated. In I want to sever the fate of this world. A world of only victors. A world of only peace. A world of only love. I will create such a world. I am...the ghost of the Uchihas. For truly this reality...is a hell, - Madara Uchiha
        `;
      }

      const prompt = `
          Given the following content about ${subject}:

          ${contentText}

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
      const cleaned = cleanAIResponse(aiText);
      const quiz = JSON.parse(cleaned);

      setQuizData(quiz);
      navigate('/home/quiz-view', { state: { quizData: quiz } });
    } catch (err: any) {
      setError(err.message || 'Failed to generate quiz');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quiz-form-container">
      <h2 className="quiz-form-title">Quiz Generator</h2>

      <div className="quiz-form-group">
        <input
          type="text"
          className="quiz-form-input"
          placeholder="Enter subject name"
          value={subject}
          onChange={e => setSubject(e.target.value)}
        />
      </div>

      <div className="quiz-form-file-container">
        <label className="quiz-form-file-label">
          Upload PDF file (optional)
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="quiz-form-file"
          />
        </label>
      </div>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <button
        className="quiz-form-button"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Quiz'}
      </button>
    </div>
  );
};

export default QuizForm;
