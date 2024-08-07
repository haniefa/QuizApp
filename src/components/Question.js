import React, { useContext, useMemo } from 'react';
import { QuizContext } from '../contexts/QuizContext';
import { decodeHtml } from '../utils/htmlDecode';

function Question({ question }) {
  const { nextQuestion } = useContext(QuizContext);

  const shuffledAnswers = useMemo(() => {
    return question.type === 'multiple'
      ? question.incorrect_answers
          .concat(question.correct_answer)
          .sort(() => Math.random() - 0.5)
      : ['True', 'False'];
  }, [question]);

  return (
    <div className="question-container">
      <h3 className="question-text">{decodeHtml(question.question)}</h3>
      <div className="answers-container">
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            className="btn btn-answer"
            onClick={() => nextQuestion(answer)}
          >
            {decodeHtml(answer)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;