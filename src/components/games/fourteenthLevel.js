import React, { useState } from "react";
import { FaUser, FaSignOutAlt, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./wordSearchLevels.css";

const wordsToFind = [
    "ocean",
    "sea",
    "marine",
    "ecosystem",
    "conservation",
    "sustainable",
    "development",
    "pollution",
    "plastic",
    "waste",
    "overfishing",
    "acidification",
    "coral",
    "reef",
    "biodiversity",
    "habitat",
  ];

const gridSize = 10;

const WordSearchGameFourteen = () => {
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

    //Add an if statement to check the SDG id and generate the grid accordingly with appropriate words
    wordsToFind.forEach((word) => {
      placeWordInGrid(newGrid, word);
    });

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (newGrid[i][j] === "") {
          newGrid[i][j] = String.fromCharCode(
            97 + Math.floor(Math.random() * 26)
          );
        }
      }
    }
    setGrid(newGrid);
  };

  const placeWordInGrid = (grid, word) => {
    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
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
    setFoundWords((prev) => [...prev, { row, col }]);
  };

  return (
    <div className="game-container">
      <div className="word-search-nav">
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
                  textDecoration: foundWords.includes(word)
                    ? "line-through"
                    : "",
                }}
              >
                {word}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* <div style={{ display: 'grid', gridTemplateColumns: `repeat(${grid[0].length}, 50px)` }}>
                {grid.map((row, rowIndex) =>
                    row.map((letter, colIndex) => {
                        const isSelected = foundWords.some(
                            (cell) => cell.row === rowIndex && cell.col === colIndex
                        );
                        return (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid black',
                                    backgroundColor: isSelected ? 'lightblue' : 'white',
                                    cursor: 'pointer',
                                }}
                            >
                                {letter}
                            </div>
                        );
                    })
                )}
            </div> */}
      {/* <div className="footer">
                <p>Sustainability Awareness Gaming App</p>
                <p>University of Johannesburg</p>
                <p>2024</p>
            </div> */}
    </div>
  );
};

export default WordSearchGameFourteen;
