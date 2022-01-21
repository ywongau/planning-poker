/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import api from './api';
import Estimate from './Estimate';

const Game = () => {
  const [name, setName] = useState();
  const [gameStarted, setGameStarted] = useState(false);

  const getName = event => {
    setName(event.target.value);
  };

  const onOkClick = () => {
    api.send({ action: 'join', data: name });
    setGameStarted(true);
  };

  return gameStarted ? (
    <Estimate />
  ) : (
    <>
      <TextField label="Username" onChange={getName} />
      <Button onClick={onOkClick}>Ok</Button>
    </>
  );
};

export default Game;
