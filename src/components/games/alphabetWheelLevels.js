import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './alphabetWheelLevels.css';
import { FaUser, FaSignOutAlt, FaArrowLeft } from 'react-icons/fa';


const categories = {
    sdgFour: ["University", "Learning Tools", "Innovations"],
    sdgEight: ["Jobs", "Economic Terms", "Industries"],
    sdgTwelve: ["Sustainability Terms", "Eco-Friendly Products", "Waste Management"],
    sdgSixteen: ["SRC Initiatives", "Justice Systems/Organizations", "Peace-Building Terms"]
};

// const AlphabetWheel = () => {
//     return <SDGGame sdgId={4} categories={categories} />;
// };

const AlphabetWheel = ({ sdgId, categories }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentLetter, setCurrentLetter] = useState(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [userWord, setUserWord] = useState('');
    const [feedback, setFeedback] = useState('');


    const navigate = useNavigate();
    const handleLogout = () => {
      localStorage.removeItem('authToken');
      navigate('/');
    };

    const goToProfile = () => {
      navigate('/profile');
    };

    const goBack = () => {
      navigate(-1);
    };

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    const spinWheel = () => {
        setIsSpinning(true);
        setFeedback(''); 
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * letters.length);
            setCurrentLetter(letters[randomIndex]);
            setIsSpinning(false);
        }, 3000); 
    };

    const handleWordSubmission = () => {
        if (userWord.trim() === '') {
            setFeedback('Please type a word!');
        } else {
            setFeedback(`Great! "${userWord}" relates to "${selectedCategory}"`);
        }
        setUserWord('');
    };


    return (
        <div className="category-wheel-container">
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
            <h1>SDG {sdgId} Game</h1>

            {/* Category Selection */}
            {!selectedCategory ? (
                <div>
                    <h2>Choose a Category</h2>
                    <div className="categories-container">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                className="category-button"
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                // Alphabet Wheel Game
                <div>
                    <h2>Category: {selectedCategory}</h2>

                    {/* Alphabet Wheel */}
                    <div className={`wheel ${isSpinning ? 'spinning' : ''}`}>
                        {letters.map((letter, index) => (
                            <div
                                key={index}
                                className={`wheel-letter ${
                                    currentLetter === letter ? 'highlighted' : ''
                                }`}
                            >
                                {letter}
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={spinWheel}
                        className="spin-button"
                        disabled={isSpinning}
                    >
                        Spin the Wheel
                    </button>

                    {currentLetter && !isSpinning && (
                        <div className="letter-display">
                            <h3>Letter: {currentLetter}</h3>
                            <p>Type a word related to {selectedCategory} starting with "{currentLetter}"!</p>
                            <input
                                type="text"
                                value={userWord}
                                onChange={(e) => setUserWord(e.target.value)}
                                placeholder="Type your word here"
                                className="word-input"
                            />
                            <button onClick={handleWordSubmission} className="submit-button">
                                Submit
                            </button>
                        </div>
                    )}

                    {feedback && <p className="feedback">{feedback}</p>}

                    {/* Reset Category Button */}
                    <button
                        className="reset-button"
                        onClick={() => {
                            setSelectedCategory(null);
                            setCurrentLetter(null);
                            setUserWord('');
                            setFeedback('');
                        }}
                    >
                        Choose Another Category
                    </button>
                </div>
            )}

        <div className="footer">
          <p>Sustainability Awareness Gaming App</p>
          <p>University of Johannesburg</p>
          <p>2024</p>
        </div>
      </div>
    );
};

export default AlphabetWheel;

