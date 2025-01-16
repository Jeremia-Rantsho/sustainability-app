import React, { useState } from "react";
import { FaUser, FaSignOutAlt, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import "./thirdLevel.css";

const items = [
    { id: 1, name: "Plastic Bottle", recyclable: true },
    { id: 2, name: "Banana Peel", recyclable: false },
    { id: 3, name: "Glass Jar", recyclable: true },
    { id: 4, name: "Styrofoam", recyclable: false },
    { id: 5, name: "Aluminum Can", recyclable: true },
    { id: 6, name: "Pizza Box", recyclable: false },
];

function SortingGame() {
    const navigate = useNavigate();
    const [bin, setBin] = useState([]); 
    const [score, setScore] = useState(0); 
    const [remainingItems, setRemainingItems] = useState([...items]);

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

    const handleDrop = (item, isRecyclableBin) => {
        // Remove item from the list of remaining items
        setRemainingItems((prev) => prev.filter((i) => i.id !== item.id));

        // Check if the drop was correct
        if (item.recyclable === isRecyclableBin) {
            setScore((prev) => prev + 1);
        } else {
            setScore((prev) => Math.max(0, prev - 1));
        }

        // Add item to the bin for display
        setBin((prev) => [...prev, { ...item, correct: item.recyclable === isRecyclableBin }]);
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
            <div className='horizontal-lines'></div>
            <h1>Sorting Mini-Game</h1>
            <h2>Score: {score}</h2>

            <div className="bins">
                <div
                    className="bin"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        const itemId = e.dataTransfer.getData("text/plain");
                        const item = items.find((i) => i.id === parseInt(itemId, 10));
                        handleDrop(item, true);
                    }}
                >
                    <h3>Recyclable</h3>
                </div>

                <div
                    className="bin"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        const itemId = e.dataTransfer.getData("text/plain");
                        const item = items.find((i) => i.id === parseInt(itemId, 10));
                        handleDrop(item, false);
                    }}
                >
                    <h3>Non-Recyclable</h3>
                </div>
            </div>

            <div className="items">
                {remainingItems.map((item) => (
                    <div
                        key={item.id}
                        className="item"
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData("text/plain", item.id)}
                    >
                        {item.name}
                    </div>
                ))}
            </div>

            <h3>Sorted Items:</h3>
            <ul>
                {bin.map((sortedItem, index) => (
                    <li key={index} style={{ color: sortedItem.correct ? "green" : "red" }}>
                        {sortedItem.name} - {sortedItem.correct ? "Correct" : "Wrong"}
                    </li>
                ))}
            </ul>

            {remainingItems.length === 0 && (
                <h2 className="success">Game Over! Final Score: {score}</h2>
            )}
            <div className='horizontal-lines'></div>
            <div className="footer">
                <p>Sustainability Awareness Gaming App</p>
                <p>University of Johannesburg</p>
                <p>2024</p>
            </div>
        </div>
    );
}
export default SortingGame;
