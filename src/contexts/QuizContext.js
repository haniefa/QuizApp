import React, { createContext, useState, useEffect } from 'react';
import { fetchQuestions } from '../services/api';
import { saveQuizState, loadQuizState, clearQuizState } from '../services/localStorage';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isFinished, setIsFinished] = useState(false);
  const [hasUnfinishedQuiz, setHasUnfinishedQuiz] = useState(false);

  useEffect(() => {
    const savedState = loadQuizState();
    if (savedState) {
      if (savedState.isFinished) {
        setHasUnfinishedQuiz(false);
      } else {
        setHasUnfinishedQuiz(true);
      }
    }
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(timer);
            finishQuiz();
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [questions]);

  useEffect(() => {
    if (questions.length > 0) {
      saveQuizState({
        questions,
        currentQuestionIndex,
        correctAnswers,
        wrongAnswers,
        timeLeft,
        isFinished,
      });
    }
  }, [questions, currentQuestionIndex, correctAnswers, wrongAnswers, timeLeft, isFinished]);

  const startQuiz = async () => {
    const fetchedQuestions = await fetchQuestions();
    setQuestions(fetchedQuestions);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setTimeLeft(300);
    setIsFinished(false);
    setHasUnfinishedQuiz(false);
  };

  const resumeQuiz = () => {
    const savedState = loadQuizState();
    if (savedState) {
      setQuestions(savedState.questions);
      setCurrentQuestionIndex(savedState.currentQuestionIndex);
      setCorrectAnswers(savedState.correctAnswers);
      setWrongAnswers(savedState.wrongAnswers);
      setTimeLeft(savedState.timeLeft);
      setIsFinished(false);
      setHasUnfinishedQuiz(false);
    }
  };

  const nextQuestion = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correct_answer) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setWrongAnswers(wrongAnswers + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setIsFinished(true);
    clearQuizState();
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentQuestionIndex,
        correctAnswers,
        wrongAnswers,
        timeLeft,
        isFinished,
        hasUnfinishedQuiz,
        startQuiz,
        resumeQuiz,
        nextQuestion,
        finishQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};