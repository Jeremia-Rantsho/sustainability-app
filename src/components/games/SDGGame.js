// src/pages/SDGGame.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaArrowLeft } from 'react-icons/fa'; // Import icons
import '../index.css';

function SDGGame() {
  const [number, setNumber] = useState(Math.floor(Math.random() * 10) + 1);
  const [message, setMessage] = useState("");

  const handleGuess = (guess) => {
    if ((number % 2 === 0 && guess === 'even') || (number % 2 !== 0 && guess === 'odd')) {
      setMessage("Correct! Well done!");
    } else {
      setMessage("Oops! Try again.");
    }
    setNumber(Math.floor(Math.random() * 10) + 1);
  };

  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem('authToken');
  navigate('/');
};

const goToProfile = () => {
  navigate('/profile');
};

const goToQuizPage = (sdgId) => {
  navigate(`/games/Quiz/${sdgId}`);
};

const goBack = () => {
  navigate(-1);
};

  return (
    <div className="game-container">
      <div className="top-nav">
        <button onClick={goBack} className="back-button">
          <FaArrowLeft /> Back
        </button>
        <div className="nav-buttons-right">
          <button onClick={goToProfile} className="nav-button">
            <FaUser /> Profile
          </button>
          <button onClick={handleLogout} className="logout-button">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
      <div className='horizontal-line'></div>
      <h2>SDG Game</h2>
      <p>Is the number {number} odd or even?</p>
      <div className="guess-buttons">
        <button onClick={() => handleGuess('odd')}>Odd</button>
        <button onClick={() => handleGuess('even')}>Even</button>
      </div>
      {message && <p className="message">{message}</p>}
      <button className="next-button" onClick={goToQuizPage}>
        Next: Take the Quiz
      </button>
      <div className='horizontal-lines'></div>
      <div className="footer">
        <p>Sustainability Awareness Gaming App</p>
        <p>University of Johannesburg</p>
        <p>2024</p>
      </div>
    </div>
  );
}

export default SDGGame;
