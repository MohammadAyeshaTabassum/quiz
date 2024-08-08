import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/QuizApp.css';

const QuizApp = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  // Fetch quizzes on component mount
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('http://localhost:5000/quizzes', {
          credentials: 'include',
        });

        if (!response.ok) {
          const text = await response.text(); // Read the response as text
          throw new Error(`HTTP error! Status: ${response.status}. Response: ${text}`);
        }

        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleChange = (e, quizId) => {
    setAnswers({
      ...answers,
      [quizId]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/submit-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ answers }),
      });

      const data = await response.json();
      if (response.ok) {
        // Handle successful submission
        console.log('Quiz submitted successfully:', data);
        setShowPopup(true); // Show the popup
      } else if (response.status === 403) {
        // Handle case where the user has already submitted the quiz
        alert(data.message);
      } else {
        console.error('Error submitting quiz:', data.message);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    navigate('/');  // Redirect to homepage or another page
  };

  return (
    <div className="quiz-app">
      <h2>Quiz</h2>
      <form onSubmit={handleSubmit}>
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="quiz-item">
            <p>{quiz.question}</p>
            <div>
              {['A', 'B', 'C', 'D'].map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name={`quiz-${quiz.id}`}
                    value={option}
                    onChange={(e) => handleChange(e, quiz.id)}
                    checked={answers[quiz.id] === option}
                  />
                  {quiz[`option_${option.toLowerCase()}`]}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button type="submit">Submit Quiz</button>
      </form>
      {showPopup && (
        <div style={popupStyle}>
          <div style={popupContentStyle}>
            <p>Quiz submitted successfully!</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const popupStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const popupContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '5px',
  textAlign: 'center',
};

export default QuizApp;
