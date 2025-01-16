// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react';
import './index.css';
import axios from 'axios';
import logo from '../assets/Logo.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            console.log('Email:', email);
            console.log('Password:', password);
            localStorage.setItem('authToken', 'user-auth-token');
            navigate('/survey');
        } else {
            alert("Please enter email and password");
        }
    };

    return (
        <div className="login-container">
            <div className="bubble-container">
                {/* This will hold our animated bubbles */}
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="bubble"></div>
                ))}
            </div>
            <div className="login-box">
                <div className="login-logo">
                    <img src={logo} alt="App Logo" className="logo" />
                    <h2>Sustainability Awareness Gaming App</h2>
                </div>
                <div className="login-form">
                    <p>Sign in to explore your personalized student experience.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="input-container">
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-container">
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                    <p>Don't have an account? <a className='register' href="/register">Register</a></p>
                </div>
            </div>
            {/* <div className='horizontal-lines'></div> */}
            <div className="footer">
                <p>Sustainability Awareness Gaming App</p>
                <p>University of Johannesburg</p>
                <p>2024</p>
            </div>

        </div>
    );
};

export default Login;
