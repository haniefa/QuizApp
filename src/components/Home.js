import React, { useContext } from 'react';
import { QuizContext } from '../contexts/QuizContext';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { hasUnfinishedQuiz, startQuiz, resumeQuiz } = useContext(QuizContext);
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    startQuiz();
    navigate('/quiz');
  };

  const handleResumeQuiz = () => {
    resumeQuiz();
    navigate('/quiz');
  };

  return (
    <div className="container">
      <h1 className="title">Welcome to the Quiz App</h1>
      <div className="button-container">
        {hasUnfinishedQuiz ? (
          <button className="btn btn-primary" onClick={handleResumeQuiz}>Resume Quiz</button>
        ) : (
          <button className="btn btn-primary" onClick={handleStartQuiz}>Start New Quiz</button>
        )}
      </div>
    </div>
  );
}

export default Home;