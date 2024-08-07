import React, { useContext } from 'react';
import { QuizContext } from '../contexts/QuizContext';
import Question from './Question';
import Result from './Result';

function Quiz() {
  const { 
    questions, 
    currentQuestionIndex, 
    timeLeft, 
    isFinished,
  } = useContext(QuizContext);

  if (isFinished) {
    return <Result />;
  }

  return (
    <div className="container">
      <div className="quiz-header">
        <h2 className="question-number">Question {currentQuestionIndex + 1} of {questions.length}</h2>
        <p className="timer">Time left: {timeLeft} seconds</p>
      </div>
      {questions[currentQuestionIndex] && (
        <Question question={questions[currentQuestionIndex]} />
      )}
    </div>
  );
}

export default Quiz;