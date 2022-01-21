import React from 'react';
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import api from './api';
import { useHistory } from 'react-router-dom';
const CreateGame = () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const onSubmit = data => api.create(data.name).then(data => history.push('/game/' + data.id));
  return (
    <>
      <header>
        <h1>Create game</h1>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Game's name" id="games-name" {...register('name', { required: true })} />
        <Button color="primary" variant="contained" type="submit">
          Create
        </Button>
      </form>
    </>
  );
};

export default CreateGame;
