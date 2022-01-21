import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import api from './api';

const Estimate = ({ player }) => {
  const [state, setState] = useState({ name: '', players: [] });
  const id = useParams().id;
  const pointList = [0, 0.5, 1, 2, 3, 5];
  const onClick = point => {
    api.send({ action: 'estimate', data: { name: player, points: point }, id });
  };
  const onReveal = () => {
    api.send({ action: 'reveal', id });
  };

  useEffect(() => {
    api.recieved(setState);
  }, []);
  return (
    <>
      <h1>{state.name}</h1>
      <section aria-label="Results">
        <ul>
          {state.players.map((player, index) => (
            <li
              key={index}
              aria-label={
                player.points != null ? `${player.name} is ready` : `${player.name} is not ready`
              }
            >
              {player.name}
              {state.revealed && <span>{player.points}</span>}
            </li>
          ))}
        </ul>
      </section>
      {pointList.map((num, index) => (
        <Button key={index} onClick={() => onClick(num)}>
          {num}
        </Button>
      ))}
      <Button onClick={onReveal}>Reveal</Button>
    </>
  );
};

export default Estimate;
