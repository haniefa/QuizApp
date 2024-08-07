export const saveQuizState = (state) => {
  localStorage.setItem('quizState', JSON.stringify(state));
};

export const loadQuizState = () => {
  const savedState = localStorage.getItem('quizState');
  return savedState ? JSON.parse(savedState) : null;
};

export const clearQuizState = () => {
  localStorage.removeItem('quizState');
};