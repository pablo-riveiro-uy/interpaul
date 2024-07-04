import React, { useState, useEffect } from 'react';

export default function Login() {
  const [quizData, setQuizData] = useState({ question: '', incorrect_answers: [], correct_answer: '' });

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`https://opentdb.com/api.php?amount=1&type=multiple`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Quiz data", data.results[0]);
        setQuizData(data.results[0]);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuiz();
  }, []);

  return (
    <>
      <h3>Welcome agent</h3>
      <p>Answer the secret question to enter INTERPAUL database</p>
      <p>{quizData.question}</p>
      <select>
        {quizData.incorrect_answers.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
        <option value={quizData.correct_answer}>{quizData.correct_answer}</option>
      </select>
    </>
  );
}
