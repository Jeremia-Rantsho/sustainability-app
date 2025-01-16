// src/components/Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import logo from '../assets/Logo.png'; // Adjust path if necessary

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Remove authentication data
        navigate('/'); // Navigate back to the login page
    };

    return (
        <div className="logout-container">
            <div className="logout-box">
                <img src={logo} alt="App Logo" className="logo" />
                <h2>Goodbye!</h2>
                <p>You have successfully logged out.</p>
                <button onClick={handleLogout}>Log Back In</button>
            </div>
        </div>
    );
};

export default Logout;
