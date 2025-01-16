// src/components/Game.js
import React, { useState } from 'react';

const Game = () => {
  const [state, setState] = useState();

  const investInSustainability = () => {
    if (state.budget >= 10000) {
      setState({
        ...state,
        budget: state.budget - 10000,
        sustainabilityScore: state.sustainabilityScore + 5,
        reputation: state.reputation + 2,
      });
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Business Dashboard</h2>
      <p><strong>Budget:</strong> ${state.budget}</p>
      <p><strong>Sustainability Score:</strong> {state.sustainabilityScore}</p>
      <p><strong>Reputation:</strong> {state.reputation}</p>

      <button onClick={investInSustainability} style={{ margin: '10px 0', padding: '10px' }}>
        Invest in Sustainability ($10,000)
      </button>
    </div>
  );
};

export default Game;
