// src/components/Profile.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMedal, FaLeaf, FaTrophy, FaUserCircle } from 'react-icons/fa';
import './index.css';
import { FaUser, FaSignOutAlt, FaArrowLeft } from 'react-icons/fa'; // Import icons

function Profile() {
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

  return (
    <div className="profile-container">
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
      {/* <div className='horizontal-line'></div> */}
      <div className="profile-card">
        <div className="profile-header">
          <FaUserCircle className="profile-picture" />
          <h2>Player Name</h2>
          <p className="profile-title">Eco Warrior</p>
        </div>
        
        <div className="profile-stats">
          <p><FaLeaf className="icon" /> Points: <span>50</span></p>
          <p><FaMedal className="icon" /> Achievements: <span>Beginner Green Champion</span></p>
        </div>
        
        <div className="achievements-section">
          <h3>Achievements</h3>
          <ul>
            <li><FaTrophy className="icon" /> Completed First Trivia</li>
            <li><FaTrophy className="icon" /> Matched All Pictures in Record Time</li>
            <li><FaTrophy className="icon" /> Eco-Challenge Beginner</li>
          </ul>
        </div>
        
        <button onClick={() => navigate('/games')} className="back-btn">Back to Home</button>
      </div>
      {/* <div className='horizontal-lines'></div> */}
      <div className="footer">
                <p>Sustainability Awareness Gaming App</p>
                <p>University of Johannesburg</p>
                <p>2024</p>
            </div>
    </div>
  );
}

export default Profile;
