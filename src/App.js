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
import ShoppingListChallenge from './components/games/firstLevel';
import WordSearchGame from './components/games/secondLevel';
import SortingGame from './components/games/thirdLevel';


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
        <Route path="/games/firstLevel/:sdgId" element={<ProtectedRoute><ShoppingListChallenge /></ProtectedRoute>} />
        <Route path="/games/secondLevel/:sdgId" element={<ProtectedRoute><WordSearchGame /></ProtectedRoute>} />
        <Route path="/games/thirdLevel/:sdgId" element={<ProtectedRoute><SortingGame /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
