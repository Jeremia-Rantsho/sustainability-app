// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Survey from './components/Survey';
import GameSelection from './components/GameSelection';
import Results from './components/Results';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import Logout from './components/Logout';
import ProtectedRoute from './components/ProtectedRoute';
import SDGGame from './components/games/SDGGame';
import Learn from './components/games/Learn';
import Quiz from './components/games/Quiz';
import Register from './components/register';
// import AlphabetWheel from './components/games/alphabetWheelLevels';
// import MemoryGame from './components/games/memoryGameLevels';
// import RiddleGame from './components/games/riddleLevels';
// import WordSearchGames from './components/games/wordSearchLevels';
import MemoryGameOne from './components/games/firstLevel';
import MemoryGameFive from './components/games/fifthLevel';
import MemoryGameNine from './components/games/ninethLevel';
import MemoryGameThirteen from './components/games/thirteenthLevel';

import WordSearchGameTwo from './components/games/secondLevel';
import WordSearchGameSix from './components/games/sixthLevel';
import WordSearchGameTen from './components/games/tenthLevel';
import WordSearchGameFourteen from './components/games/fourteenthLevel';

import RiddleGameThree from './components/games/thirdLevel';
import RiddleGameSeven from './components/games/seventhLevel';
import RiddleGameEleven from './components/games/eleventhLevel';
import RiddleGameFifteen from './components/games/fifteenthLevel';

import AlphabetWheelFour from './components/games/fourthLevel';
import AlphabetWheelEight from './components/games/eigthLevel';
import AlphabetWheelTwelve from './components/games/twelveLevel';
import AlphabetWheelSixteen from './components/games/sixteenthLevel';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/survey" element={<ProtectedRoute><Survey /></ProtectedRoute>} />
        <Route path="/games" element={<ProtectedRoute><GameSelection /></ProtectedRoute>} />
        <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/games/learn/:sdgId" element={<ProtectedRoute><Learn /></ProtectedRoute>} />
        <Route path="/games/quiz/:sdgId" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
        <Route path="/games/SDGGame/:sdgId" element={<ProtectedRoute><SDGGame /></ProtectedRoute>} />
        {/* <Route path="/games/alphabetWheelLevels/:sdgId" element={<ProtectedRoute><AlphabetWheel /></ProtectedRoute>} /> */}
        {/* <Route path="/games/memoryGameLevels/:sdgId" element={<ProtectedRoute><MemoryGame /></ProtectedRoute>} />
        <Route path="/games/riddleLevels/:sdgId" element={<ProtectedRoute><RiddleGame /></ProtectedRoute>} />
        <Route path="/games/wordSearchLevels/:sdgId" element={<ProtectedRoute><WordSearchGames /></ProtectedRoute>} /> */}
        <Route path="/games/firstLevel/:sdgId" element={<ProtectedRoute><MemoryGameOne /></ProtectedRoute>} />
        <Route path="/games/fifthLevel/:sdgId" element={<ProtectedRoute><MemoryGameFive /></ProtectedRoute>} />
        <Route path="/games/ninethLevel/:sdgId" element={<ProtectedRoute><MemoryGameNine /></ProtectedRoute>} />
        <Route path="/games/thirteenthLevel/:sdgId" element={<ProtectedRoute><MemoryGameThirteen /></ProtectedRoute>} />

        <Route path="/games/secondLevel/:sdgId" element={<ProtectedRoute><WordSearchGameTwo /></ProtectedRoute>} />
        <Route path="/games/sixthLevel/:sdgId" element={<ProtectedRoute><WordSearchGameSix /></ProtectedRoute>} />
        <Route path="/games/tenthLevel/:sdgId" element={<ProtectedRoute><WordSearchGameTen /></ProtectedRoute>} />
        <Route path="/games/fourteenthLevel/:sdgId" element={<ProtectedRoute><WordSearchGameFourteen /></ProtectedRoute>} />

        <Route path="/games/thirdLevel/:sdgId" element={<ProtectedRoute><RiddleGameThree /></ProtectedRoute>} />
        <Route path="/games/seventhLevel/:sdgId" element={<ProtectedRoute><RiddleGameSeven /></ProtectedRoute>} />
        <Route path="/games/eleventhLevel/:sdgId" element={<ProtectedRoute><RiddleGameEleven /></ProtectedRoute>} />
        <Route path="/games/fifteenthLevel/:sdgId" element={<ProtectedRoute><RiddleGameFifteen /></ProtectedRoute>} />

        <Route path="/games/fourthLevel/:sdgId" element={<ProtectedRoute><AlphabetWheelFour /></ProtectedRoute>} />
        <Route path="/games/eigthLevel/:sdgId" element={<ProtectedRoute><AlphabetWheelEight /></ProtectedRoute>} />
        <Route path="/games/twelveLevel/:sdgId" element={<ProtectedRoute><AlphabetWheelTwelve /></ProtectedRoute>} />
        <Route path="/games/sixteenthLevel/:sdgId" element={<ProtectedRoute><AlphabetWheelSixteen /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
