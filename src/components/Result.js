import React, { useContext } from 'react';
import { QuizContext } from '../contexts/QuizContext';
import { useNavigate } from 'react-router-dom';

function Result() {
  const { correctAnswers, wrongAnswers, questions, startQuiz } = useContext(QuizContext);
  const navigate = useNavigate();

  const handleRestartQuiz = () => {
    startQuiz();
    navigate('/quiz');
  };

  return (
    <div className="container">
      <h2 className="title">Quiz Result</h2>
      <div className="result-container">
        <p className="result-item">Correct Answers: <span className="result-value">{correctAnswers}</span></p>
        <p className="result-item">Wrong Answers: <span className="result-value">{wrongAnswers}</span></p>
      </div>
      <h2 className="title">Score: <span className="result-value">{(correctAnswers/10)*100}</span></h2>
      <div className='button-container'>
      <button className="btn btn-primary" onClick={handleRestartQuiz}>Restart Quiz</button>
      </div>
    </div>
  );
}

export default Result; 