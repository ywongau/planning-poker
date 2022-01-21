/* eslint-disable no-console */
import React from 'react';
import { Button, TextField } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.scss';

const Create = () => (
  <>
    <header>
      <h1>Create game</h1>
    </header>
    <TextField label="Game's name" id="games-name" />
    <Button color="primary" variant="contained" LinkComponent={Link} to="/game/:id">
      Create
    </Button>
  </>
);

const Game = () => (
  <>
    <header>
      <h1>:)</h1>
    </header>
    <TextField label="Your name" id="games-name" />
    <Button color="primary" variant="contained" LinkComponent={Link} to="/game/:id">
      Create
    </Button>
  </>
);

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/game/:id" element={<Game />} />
          <Route exact path="/" element={<Create />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
