import React, { useState } from "react";
import { FaUser, FaSignOutAlt, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./secondLevel.css";

const wordsToFind = [
    "Equality", "Equity", "Inclusivity", "Diversity", "Justice", "Representation", "Intersectionality", "Empowerment", "Opportunity", "Parity", "Gender equality",
    "Gender equity", "Gender balance", "Gender gap", "Gender roles", "Gender identity", "Gender expression", "Non-binary", "Transgender", "Cisgender", "Intersectional feminism",
    "Feminism", "Feminist", "Misogyny", "Misandry", "Patriarchy", "Matriarchy", "Toxic masculinity", "Toxic femininity", "Women’s rights", "Men’s rights", "LGBTQIA+", "Sexual orientation",
    "Pay equity", "Wage gap", "Glass ceiling", "Representation quotas", "Leadership diversity", "Harassment-free workplace", "Anti-discrimination policies", "Work-life balance", "Inclusive leadership",
    "Gender mainstreaming", "Cultural diversity", "Ethnic diversity", "Racial diversity", "Multiculturalism", "Inclusion", "Accessibility", "Belonging", "Equal opportunity", "Unconscious bias",
    "Privilege", "Allyship", "Affirmative action", "Women empowerment", "HeForShe", "MeToo", "Equal Pay Day", "International Women’s Day", "Gender justice",
    "Human rights", "Collaboration", "Empathy", "Respect", "Fairness", "Mutual respect", "Harmony", "Innovation through diversity", "Social cohesion"

];

const gridSize = 10;

function WordSearchGame() {
    const navigate = useNavigate();
    const [grid, setGrid] = useState([]);
    const [foundWords, setFoundWords] = useState([]);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
    };

    const goToProfile = () => {
        navigate("/profile");
    };

    const goBack = () => {
        navigate(-1);
    };

    const generateGrid = () => {
        const newGrid = Array.from({ length: gridSize }, () =>
            Array(gridSize).fill("")
        );

        wordsToFind.forEach((word) => {
            placeWordInGrid(newGrid, word);
        });

        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (newGrid[i][j] === "") {
                    newGrid[i][j] = String.fromCharCode(
                        65 + Math.floor(Math.random() * 26)
                    );
                }
            }
        }
        setGrid(newGrid);
    };

    const placeWordInGrid = (grid, word) => {
        const directions = [
            [0, 1], // Horizontal
            [1, 0], // Vertical
            [1, 1], // Diagonal
        ];
        let placed = false;
        let attempts = 0;

        while (!placed && attempts < 100) {
            const row = Math.floor(Math.random() * gridSize);
            const col = Math.floor(Math.random() * gridSize);
            const [dRow, dCol] =
                directions[Math.floor(Math.random() * directions.length)];

            if (canPlaceWord(grid, word, row, col, dRow, dCol)) {
                for (let i = 0; i < word.length; i++) {
                    grid[row + i * dRow][col + i * dCol] = word[i];
                }
                placed = true;
            }
            attempts++;
        }
    };

    const canPlaceWord = (grid, word, row, col, dRow, dCol) => {
        for (let i = 0; i < word.length; i++) {
            const newRow = row + i * dRow;
            const newCol = col + i * dCol;
            if (
                newRow < 0 ||
                newCol < 0 ||
                newRow >= gridSize ||
                newCol >= gridSize ||
                (grid[newRow][newCol] !== "" && grid[newRow][newCol] !== word[i])
            ) {
                return false;
            }
        }
        return true;
    };

    const handleCellClick = (row, col) => {
        console.log(`Clicked cell at row ${row}, col ${col}: ${grid[row][col]}`);
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
            <div className="horizontal-line"></div>
            <div className="wordContainer">
                <div>
                    <h1>Word Search Game</h1>
                    <button onClick={generateGrid}>Start Game</button>
                    <div className="grid">
                        {grid.flatMap((row, rowIndex) =>
                            row.map((cell, colIndex) => (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    className="cell"
                                    onClick={() => handleCellClick(rowIndex, colIndex)}
                                >
                                    {cell}
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div>
                    <h1>Words to Find:</h1>
                    <ul>
                        {wordsToFind.map((word) => (
                            <li
                                key={word}
                                style={{
                                    textDecoration: foundWords.includes(word) ? "line-through" : "",
                                }}
                            >
                                {word}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* <div className="footer">
                <p>Sustainability Awareness Gaming App</p>
                <p>University of Johannesburg</p>
                <p>2024</p>
            </div> */}
        </div>
    );
}

export default WordSearchGame;
