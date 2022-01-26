/* eslint-disable no-console */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import CreateGame from './CreateGame';
import Game from './Game';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/game/:id" element={<Game />} />
          <Route exact path="/" element={<CreateGame />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
