import React from 'react';
import { useNavigate } from 'react-router-dom';

const Results = ({ score, maxScore }) => {
    return (
        <div className="results">
            <h1>Game Results</h1>
            <p>Your Score: {score}</p>
            <p>Max Score: {maxScore}</p>
        </div>
    );
};

export default Results;