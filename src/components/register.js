import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const { name, surname, username, email, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/register", {
                name,
                surname,
                username,
                email,
                password,
            });
            if (response.data.success) {
                setSuccess("Registration successful!");
                setFormData({
                    name: "",
                    surname: "",
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
            } else {
                setError(response.data.message || "Registration failed");
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="registration-container">
            <div className="bubble-container">
                {/* This will hold our animated bubbles */}
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="bubble"></div>
                ))}
            </div>
            <div className='registration-box'>
                <h2>Registration</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className='user-registration'>
                            <><label>
                                Name <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                            </label></>

                            <><label>
                                Surname <input type="text" name="surname" value={formData.surname} onChange={handleChange} required />
                            </label></>
                        </div>
                        <div className='user-registration'>
                            <><label>
                                Email <input type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required />
                            </label></>

                            <><label>
                                Username <input type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required />
                            </label></>
                        </div>
                        <div className='user-registration'>
                            <><label>
                                Password <input type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required />
                            </label></>

                            <><label>
                                Confirm Pasword <input type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required />
                            </label></>
                        </div>
                        <button type="submit">Register</button>
                    </div>
                </form>
                <p>Already have an account? <a className='' href='/Login.js'>Login</a> </p>
            </div>

            {/* <div className="footer">
                <p>Sustainability Awareness Gaming App</p>
                <p>University of Johannesburg</p>
                <p>2024</p>
            </div> */}
        </div>
    );
};

export default Register;
