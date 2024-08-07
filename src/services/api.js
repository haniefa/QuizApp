import axios from 'axios';

export const fetchQuestions = async () => {
  try {
    const response = await axios.get('https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
};