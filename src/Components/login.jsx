import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import hoverSoundURL from "../beep1.wav"
const boverURL = hoverSoundURL;

export default function Login({ answer }) {
  const [quizData, setQuizData] = useState({ question: '', incorrect_answers: [], correct_answer: '' });
  const [selectedValue, setSelectedValue] = useState(false);
  const [message, setMessage] = useState(<></>)
  const [playHover] = useSound(boverURL)



  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);

  };

  const fetchQuiz = async () => {
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=1&type=multiple`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setQuizData(data.results[0]);
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }
  };



  useEffect(() => {
    fetchQuiz();
    if (selectedValue === quizData.correct_answer) {
      setMessage(<p className='alowed'>Access Alowed</p>)
      playHover();
      setTimeout(() => {
        answer(true)
      }, [1000])

    } else {
      setMessage(<p className='no-records'>Code needed</p>)
    }

  }, [selectedValue])

  return (
    <>
      <h3>Welcome agent</h3>

      <fieldset className='radioForm'>
        <legend>Answer the secret question to enter INTERPAUL database</legend>
        <p>{quizData.question}</p>
        {quizData.incorrect_answers.map((option, key) => (
          <div className='options' key={key}>
            <input className='costumedRadio'
              type="radio"
              id={key}
              name="quizOption"
              value={option}
              checked={selectedValue === option}
              onChange={handleRadioChange}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
        <div>
          <input className='costumedRadio'
            type="radio"
            id={quizData.correct_answer}
            name="quizOption"
            value={quizData.correct_answer}
            checked={selectedValue === quizData.correct_answer}
            onMouseLeave={fetchQuiz}
            onChange={handleRadioChange}
          />
          <label htmlFor={quizData.correct_answer}>{quizData.correct_answer}</label>
        </div>
        {console.log('selected value', selectedValue)}
      </fieldset>
      {message}
    </>
  );
}
