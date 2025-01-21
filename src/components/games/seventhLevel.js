import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./riddleLevels.css";

const RiddleGameSeven = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="riddle-nav">
        <button onClick={goBack} className="back-button">
          <FaArrowLeft /> Back
        </button>
        <button className="nav-button">New Game</button>
        <label>
            Game Timer: 
        </label>
        <button className="nav-button">Audio Settings</button>
        <button className="nav-button">Best Records</button>
      </div>
      <h1>Riddle Game</h1>
      <h2>Good Health and Well-Being</h2>
      <div className="riddle-container">
        <label>
           I have weights, treadmills, and places to run, keeping you fit and having fun. Found on campus, I'm health's friend. What am I in the gym?
        </label>
        <input name="myInput" placeholder="What do you reckon it is" />
        <hr />
        <label>
        I am a space to heal and mend, Students visit when they need a friend. Nurses and care are what I provide,
        Where on campus do I reside?
        </label>
        <input name="myInput" placeholder="What do you reckon it is" />
        <hr />
        <label>
        Healthy snacks and meals I sell, On-campus students know me well. I fuel your body, brain, and might.
        What am I, in your sight?
        </label>
        <input name="myInput" placeholder="What do you reckon it is" />
        <hr />
        <label>
        Workshops on stress and mental care, Helping students when burdens they bear. A place of listening, calm, and peace,
        Which UJ service helps burdens decrease?
        </label>
        <input name="myInput" placeholder="What do you reckon it is" />
        <hr />
        <label>
        Across four campuses, my routes run wide, Carrying students from side to side. I help you avoid a tiresome walk,
        What am I? Let's take a talk.
        </label>
        <input name="myInput" placeholder="What do you reckon it is" />
        <hr />
        <button className="nav-button">
            Continue
        </button>
      </div>
    </div>
  );
};

export default RiddleGameSeven;
