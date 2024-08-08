import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import QuizApp from './components/QuizApp';
import Admin from './components/Admin';
import ViewScores from './components/ViewScores'; // Import ViewScores component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quizapp" element={<QuizApp />} />
        <Route path="/view-scores" element={<ViewScores />} /> {/* Add ViewScores route */}
      </Routes>
    </Router>
  );
};

export default App;
