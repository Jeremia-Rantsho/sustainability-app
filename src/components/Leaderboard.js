import React from 'react';
import { useNavigate } from 'react-router-dom';

const leaderboardData = [
  { name: 'Alice', score: 50 },
  { name: 'Bob', score: 40 },
  { name: 'Charlie', score: 30 },
];

function Leaderboard() {
  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboardData.map((entry, index) => (
          <li key={index}>{entry.name}: {entry.score} points</li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
