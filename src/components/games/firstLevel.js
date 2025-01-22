import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Card from "./card.js";

const initialCards = [
  {
    id: 1,
    image: "/sdg1/no-poverty01.jpeg",
    value: "pic1",
    matched: false,
  },
  // {
  //   id: 2,
  //   image: "/sdg1/no-poverty02.png",
  //   value: "pic2",
  //   matched: false,
  // },
  // {
  //   id: 3,
  //   value: "pic3",
  //   image: "/sdg1/no-poverty03.jpeg",
  //   matched: false,
  // },
  // {
  //   id: 4,
  //   value: "pic4",
  //   image: "/sdg1/no-poverty04.jpeg",
  //   matched: false,
  // },
  // {
  //   id: 5,
  //   value: "pic5",
  //   image: "/sdg1/no-poverty05.jpeg",
  //   matched: false,
  // },
  // {
  //   id: 6,
  //   value: "pic6",
  //   image: "/sdg1/no-poverty06.jpeg",
  //   matched: false,
  // },
  // {
  //   id: 7,
  //   value: "pic7",
  //   image: "/sdg1/no-poverty07.png",
  //   matched: false,
  // },
  // {
  //   id: 8,
  //   value: "pic8",
  //   image: "/sdg1/no-poverty08.png",
  //   matched: false,
  // },
  // {
  //   id: 9,
  //   value: "pic9",
  //   image: "/sdg1/no-poverty09.jpg",
  //   matched: false,
  // },
  // {
  //   id: 10,
  //   value: "pic10",
  //   image: "/sdg1/no-poverty10.jpeg",
  //   matched: false,
  // },
];

const MemoryGameOne = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [onceFlippedCards, setOnceFlippedCards] = useState(new Set());
  const [moves, setMoves] = useState(0);
  const [tokens, setTokens] = useState(20);
  const [gameStarted, setGameStarted] = useState(true);
  const [bestRecords, setBestRecords] = useState([]);
  const [timeTaken, setTimeTaken] = useState(0);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  const shuffleCards = (cards) => {
    return cards
      .map((card) => ({ ...card, id: Math.random() }))
      .sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const shuffledCards = shuffleCards([...initialCards, ...initialCards]);
    setCards(shuffledCards);
  }, []);

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index)) return;

    const currentCard = cards[index];

    // Penalize the player if they flip the same card twice (NEEDS TO BE REFINED)
    if (
      onceFlippedCards.has(currentCard.id) &&
      !matchedCards.includes(currentCard.id) &&
      !flippedCards.includes(index)
      // && onceFlippedCards.id === currentCard.id 
    ) {
      setTokens((prevTokens) => Math.max(prevTokens - 5, 0));
    }

    setOnceFlippedCards((prevSet) => {
      const updatedSet = new Set(prevSet);
      updatedSet.add(currentCard.id);
      return updatedSet;
    });

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [firstIndex, secondIndex] = newFlipped;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.value === secondCard.value) {
        setMatchedCards((prevMatched) => [
          ...prevMatched,
          firstCard.id,
          secondCard.id,
        ]);
      }

      setTimeout(() => setFlippedCards([]), 1000);
      setMoves((prevMoves) => prevMoves + 1);
    }
  };


  const resetGame = () => {
    const shuffledCards = shuffleCards([...initialCards, ...initialCards]);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTokens(20);
    setTimeTaken(0);
    setOnceFlippedCards(new Set());
    setTimer(0);
    setGameStarted(true);
  };

  const goBack = () => {
    navigate(-1);
  };

  const isGameWon = gameStarted && matchedCards.length === initialCards.length * 2;
  useEffect(() => {

    if (isGameWon) {
      setGameStarted(false);
      setTokens((prevTokens) => prevTokens + 10);

      setBestRecords((prevRecords) => [
        ...prevRecords,
        { time: timeTaken, moves },
      ]);

      setTimeout(() => {
        navigate("/games/secondLevel/2");
      }, 10000);
    }

    if (tokens <= 0) {
      setGameStarted(false);
      alert("Game Over! You've lost all your tokens.");
    }
  }, [matchedCards, tokens, gameStarted, timeTaken, moves, navigate]);

  const handleTimerUpdate = (time) => {
    setTimeTaken(time);
  };

  useEffect(() => {
    let interval;

    if (gameStarted) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [gameStarted]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };


  return (
    <div>
      <div className="memoryGame-nav">
        <button onClick={goBack} className="back-button">
          <FaArrowLeft /> Back
        </button>
        <button onClick={resetGame} className="nav-button">
          New Game
        </button>
        <button className="nav-button">Moves: {moves}</button>
        <button className="nav-button">Tokens: {tokens}</button>
        <button className="nav-button">Best Records</button>
        <button className="nav-button">Time: {formatTime(timer)}</button>
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

      {/* //Will Implement this later for the best records */}
      {/* <ul>
        {bestRecords
          .sort((a, b) => a.time - b.time || a.moves - b.moves)
          .map((record, index) => (
            <li key={index}>
              Time: {record.time}s, Moves: {record.moves}
            </li>
          ))}
      </ul> */}
      {isGameWon && <h1>Congratulations! You've won the game!</h1>}
    </div>
  );
};

export default MemoryGameOne;
