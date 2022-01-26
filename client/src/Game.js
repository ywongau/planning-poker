/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import React, { useEffect, useRef, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import qrcode from 'qrcode';
import Ws from './ws';
import Estimate from './Estimate';

const Game = () => {
  const [playerName, setPlayerName] = useState();
  const [gameStarted, setGameStarted] = useState(false);
  const canvasRef = useRef();
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
  const [ws, setWs] = useState();

  const onSubmit = data => {
    const newWs = Ws(id, data.name);
    setWs(newWs);
    setPlayerName(data.name);
    newWs.send({ type: 'join', payload: data.name, id });
    setGameStarted(true);
  };

  useEffect(() => {
    qrcode.toCanvas(canvasRef.current, window.location.href);
  }, []);

  return gameStarted ? (
    <Estimate ws={ws} playerName={playerName} />
  ) : (
    <>
      <header>
        <h1>Who the hell are you?</h1>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField fullWidth label="Player's name" {...register('name', { required: true })} />
        <Button color="primary" type="submit" variant="contained">
          Join
        </Button>
      </form>
      <canvas ref={canvasRef}></canvas>
    </>
  );
};

export default Game;
