import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';

const pointList = [0, 0.5, 1, 2, 3, 5, 8, 13, 21];

const Estimate = ({ playerName, ws }) => {
  const [state, setState] = useState({ name: '', players: [] });
  const { id } = useParams();
  const selectedPoints = state.players.find(player => player.name === playerName)?.points;

  const onClick = points =>
    ws.send({ type: 'estimate', payload: { name: playerName, points }, id });

  const onReveal = () => ws.send({ type: 'reveal', id });

  const onReset = () => ws.send({ type: 'reset', id });

  useEffect(() => {
    ws.recieved(event => setState(JSON.parse(event.data)));
  }, [ws]);

  return (
    <>
      <header>
        <h1>{state.name}</h1>
      </header>
      <section aria-label="Results">
        <ul className="Estimate__cards">
          {state.players.map((player, index) => (
            <li key={index}>
              <div
                className={
                  'Estimate__card' + (player.points != null ? `` : ` Estimate__card-pending`)
                }
                aria-label={
                  player.points != null ? `${player.name} is ready` : `${player.name} is not ready`
                }
              >
                {state.revealed && player.points}
              </div>
              <div className="Estimate__playerName">{player.name}</div>
            </li>
          ))}
        </ul>
      </section>
      <div className="Estimate__actions">
        <Button variant="contained" onClick={onReveal}>
          Reveal
        </Button>
        <Button variant="outlined" onClick={onReset}>
          Reset
        </Button>
      </div>
      <ul className="Estimate__cards">
        {pointList.map((num, index) => (
          <li key={index}>
            <Button
              aria-pressed={num === selectedPoints}
              className="Estimate__card"
              variant="outlined"
              onClick={() => onClick(num)}
            >
              {num}
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Estimate;
