import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaArrowLeft } from 'react-icons/fa';
import '../index.css';

const quizQuestions = {
  1: [
    { 
      question: "What is the main goal of SDG 1?", 
      options: ["End poverty", "Quality education", "Climate action"], 
      answer: "End poverty" 
    },
    { 
      question: "Which year does SDG 1 aim to end poverty?", 
      options: ["2025", "2030", "2040"], 
      answer: "2030" 
    },
    { 
      question: "What does SDG 1 prioritize for vulnerable groups?", 
      options: ["Access to land and property", "Affordable energy", "Universal education"], 
      answer: "Access to land and property" 
    },
  ],
  2: [
    { 
      question: "What is the focus of SDG 2?", 
      options: ["Zero hunger", "Climate action", "Clean water"], 
      answer: "Zero hunger" 
    },
    { 
      question: "Which is a target of SDG 2?", 
      options: ["Achieve food security", "Promote gender equality", "Affordable energy"], 
      answer: "Achieve food security" 
    },
    { 
      question: "SDG 2 also aims to:", 
      options: ["End all forms of malnutrition", "Provide universal healthcare", "Ensure clean water"], 
      answer: "End all forms of malnutrition" 
    },
  ],
  3: [
    { 
      question: "What is the main goal of SDG 3?", 
      options: ["Healthy lives and well-being", "Sustainable cities", "Gender equality"], 
      answer: "Healthy lives and well-being" 
    },
    { 
      question: "By 2030, SDG 3 aims to reduce global maternal mortality to:", 
      options: ["Less than 70 per 100,000 live births", "Less than 50 per 100,000 live births", "Less than 30 per 100,000 live births"], 
      answer: "Less than 70 per 100,000 live births" 
    },
    { 
      question: "Which diseases does SDG 3 aim to end?", 
      options: ["Malaria and AIDS", "Cancer and diabetes", "Cholera and smallpox"], 
      answer: "Malaria and AIDS" 
    },
  ],
  4: [
    { 
      question: "What does SDG 4 promote?", 
      options: ["Quality education", "Clean energy", "Gender equality"], 
      answer: "Quality education" 
    },
    { 
      question: "By 2030, SDG 4 aims to ensure all children complete:", 
      options: ["Primary and secondary education", "Higher education", "Technical training"], 
      answer: "Primary and secondary education" 
    },
    { 
      question: "SDG 4 aims to eliminate disparities in:", 
      options: ["Education", "Employment", "Housing"], 
      answer: "Education" 
    },
  ],
  5: [
    { 
      question: "What is the main goal of SDG 5?", 
      options: ["Gender equality", "Clean water", "Zero hunger"], 
      answer: "Gender equality" 
    },
    { 
      question: "Which is a target of SDG 5?", 
      options: ["End discrimination against women", "Achieve universal healthcare", "Ensure affordable energy"], 
      answer: "End discrimination against women" 
    },
    { 
      question: "SDG 5 aims to eliminate all forms of:", 
      options: ["Violence against women", "Malnutrition", "Energy poverty"], 
      answer: "Violence against women" 
    },
  ],
  6: [
    { 
      question: "What is the main focus of SDG 6?", 
      options: ["Clean water and sanitation", "Affordable energy", "Zero hunger"], 
      answer: "Clean water and sanitation" 
    },
    { 
      question: "By 2030, SDG 6 aims to achieve:", 
      options: ["Universal access to safe drinking water", "Universal access to healthcare", "Access to clean energy"], 
      answer: "Universal access to safe drinking water" 
    },
    { 
      question: "SDG 6 also focuses on improving:", 
      options: ["Water quality", "Food security", "Housing conditions"], 
      answer: "Water quality" 
    },
  ],
};


function Quiz(props) {
  const { sdgId } = useParams();
  const selectedSDG = parseInt(sdgId || props.selectedSDG, 10);
  const questions = quizQuestions[selectedSDG] || [];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const navigate = useNavigate();

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
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

  const goToGameSelection = () => {
    navigate('/games'); // Navigate back to the game selection page
  };

  return (
    <div className="quiz-container">
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
      <h2>SDG {selectedSDG} Quiz</h2>
      {showScore ? (
        <div className="score-section">You scored {score} out of {questions.length}</div>
      ) : (
        questions.length > 0 && questions[currentQuestion] ? (
          <div className="question-section">
            <h3>{questions[currentQuestion].question}</h3>
            <div className="answer-section">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswerOptionClick(option === questions[currentQuestion].answer)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>No questions available for SDG {selectedSDG}.</div>
        )
      )}
      <button className="next-button" onClick={goToGameSelection}>
        Back to Game Selection
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

export default Quiz;
