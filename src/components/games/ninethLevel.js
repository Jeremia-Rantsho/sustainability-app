import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Card from "./cardNine.js";
import "./memoryGameLevels.css";

const initialCards = [
  {
    id: 1,
    image: "/sdg9/sdg9-pic01.png",
    value: "SDG1",
    matched: false,
  },
  {
    id: 2,
    image: "/sdg9/sdg9-pic02.png",
    value: "SDG2",
    matched: false,
  },
  {
    id: 3,
    value: "SGD3",
    image: "/sdg9/sdg9-pic03.jpg",
    matched: false,
  },
  {
    id: 4,
    value: "SDG4",
    image: "/sdg9/sdg9-pic04.jpg",
    matched: false,
  },
  {
    id: 5,
    value: "SDG5",
    image: "/sdg9/sdg9-pic05.jpg",
    matched: false,
  },
  {
    id: 6,
    value: "SDG6",
    image: "/sdg9/sdg9-pic06.png",
    matched: false,
  },
  {
    id: 7,
    value: "SDG7",
    image: "/sdg9/sdg9-pic07.png",
    matched: false,
  },
  {
    id: 8,
    value: "SDG8",
    image: "/sdg9/sdg9-pic08.png",
    matched: false,
  },
  {
    id: 9,
    value: "SDG9",
    image: "/sdg9/sdg9-pic09.png",
    matched: false,
  },
  {
    id: 10,
    value: "SDG10",
    image: "/sdg9/sdg9-pic10.png",
    matched: false,
  },
];

const MemoryGameNine = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const shuffledCards = shuffleCards([...initialCards, ...initialCards]);
    setCards(shuffledCards);
  }, []);

  const shuffleCards = (cards) => {
    return cards
      .map((card) => ({ ...card, id: Math.random() }))
      .sort(() => Math.random() - 0.5);
  };

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index)) return;

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [firstIndex, secondIndex] = newFlipped;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.value === secondCard.value) {
        setMatchedCards([...matchedCards, firstCard.id, secondCard.id]);
      }

      setTimeout(() => setFlippedCards([]), 1000);
      setMoves((prev) => prev + 1);
    }
  };

  const resetGame = () => {
    const shuffledCards = shuffleCards([...initialCards, ...initialCards]);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
  };

  const goBack = () => {
    navigate(-1);
  };

  const isGameWon = matchedCards.length === initialCards.length * 2;
  if(isGameWon){
    navigate("/games/tenthLevel/10");
  }

  return (
    <div>
      <div className="memoryGame-nav">
        <button onClick={goBack} className="back-button">
          <FaArrowLeft /> Back
        </button>
        <button onClick={resetGame} className="nav-button">
          New Game
        </button>
        <label>Moves: {moves}</label>
        <label>Game Timer:</label>
        <button onClick={resetGame} className="nav-button">
          Audio Settings
        </button>
        <button onClick={resetGame} className="nav-button">
          Best Records
        </button>
      </div>
      <h1>Memory Game</h1>
      <div className="game-board">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            flipped={
              flippedCards.includes(index) || matchedCards.includes(card.id)
            }
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
      {/* <div className="footer">
        <p>Sustainability Awareness Gaming App</p>
        <p>University of Johannesburg</p>
        <p>2024</p>
      </div> */}
    </div>
  );
};

export default MemoryGameNine;
