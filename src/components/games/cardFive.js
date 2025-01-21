import React from "react";
import "./card.css";

const Card = ({ card, flipped, onClick }) => {
  return (
    <div className={`card ${flipped ? "flipped" : ""}`} onClick={onClick}>
      {flipped ? (
        <img src={card.image} alt={card.value} className="card-front" />
      ) : (
        <div className="card-back">
          <img src="/SDG5.gif" alt="No Poverty" />
        </div>
      )}
    </div>
  );
};

export default Card;
