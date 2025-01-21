import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import figureImage from '../assets/figure.jpg'; // Import the figure image
import loadingGif from '../assets/SDG Wheel.gif';
import { FaUser, FaSignOutAlt, FaArrowLeft } from 'react-icons/fa'; // Import icons

const Survey = () => {
    const navigate = useNavigate();

    const [answers, setAnswers] = useState(() => {
        const savedAnswers = localStorage.getItem('surveyAnswers');
        return savedAnswers
            ? JSON.parse(savedAnswers)
            : { question1: '', question2: '', question3: '' };
    });

    const [popupVisible, setPopupVisible] = useState(false); // For controlling popup visibility
    const [currentMessage, setCurrentMessage] = useState('');
    const [bubbleColors, setBubbleColors] = useState([0, 1, 2, 3, 4]); // Bubble colors index

    useEffect(() => {
        if (popupVisible) {
            let messageTimeout;
            let colorChangeInterval;

            // Sequence of "Ready!", "Set!", "Go!" and bubble colors changing
            const showMessages = () => {
                setCurrentMessage('Ready!');
                messageTimeout = setTimeout(() => {
                    setCurrentMessage('Set!');
                }, 1500);
                setTimeout(() => {
                    setCurrentMessage('Go!');
                }, 3000);
            };

            // Bubble color changing every second
            const changeBubbleColors = () => {
                colorChangeInterval = setInterval(() => {
                    setBubbleColors((prevColors) => prevColors.map(() => Math.floor(Math.random() * 5)));
                }, 1000);
            };

            // Reset popup after 5 seconds
            const popupDuration = setTimeout(() => {
                setPopupVisible(false);
                clearInterval(colorChangeInterval);
                clearTimeout(messageTimeout);
            }, 5000);

            showMessages();
            changeBubbleColors();

            // Cleanup timers
            return () => {
                clearTimeout(popupDuration);
                clearTimeout(messageTimeout);
                clearInterval(colorChangeInterval);
            };
        }
    }, [popupVisible]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [name]: value,
        }));
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Survey submitted', answers);
        localStorage.removeItem('surveyAnswers');
        setPopupVisible(true); // Trigger popup on submit
        setTimeout(() => {
            navigate('/games');
        }, 5000); // Navigate after popup ends
    };

    return (
        <div className="survey-container">
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
        
        
            <div className="character-container">
                <img src={figureImage} alt="Survey Character" className="character-image" />
                <div className="speech-bubble">
                    <p>Please fill in the survey before proceeding!</p>
                </div>
            </div>
            <div className="survey-form">
                <h1>Student Survey</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Question 1: What is your faculty?</label>
                        <input
                            type="text"
                            name="question1"
                            value={answers.question1}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Question 2: In what year are you?</label>
                        <select
                            name="question2"
                            value={answers.question2}
                            onChange={handleChange}
                        >
                            <option value="">Select year</option>
                            <option value="Incoming">Incoming Student</option>
                            <option value="1st">1st Year</option>
                            <option value="2nd">2nd Year</option>
                            <option value="3rd">3rd Year</option>
                            <option value="4th">4th Year</option>
                            <option value="Honours">Honours</option>
                            <option value="Masters">Masters</option>
                            <option value="Doctorate">Doctorate</option>
                            <option value="Graduate">Graduate</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Question 3: Do you prefer online or in-person classes?</label>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="question3"
                                    value="Online"
                                    checked={answers.question3 === 'Online'}
                                    onChange={handleChange}
                                />
                                Online
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="question3"
                                    value="In-person"
                                    checked={answers.question3 === 'In-person'}
                                    onChange={handleChange}
                                />
                                In-person
                            </label>
                        </div>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>

            {popupVisible && (
                <div className="popup">
                    <img src={loadingGif} alt="Loading..." className="loading-gif" />
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

export default Survey;
