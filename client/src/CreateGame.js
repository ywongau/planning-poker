import React from 'react';
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import api from './api';
import { useNavigate } from 'react-router-dom';
const CreateGame = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = data => api.create(data.name).then(data => navigate('/game/' + data.id));
  return (
    <>
      <header>
        <h1>What&apos;s the name of the game?</h1>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField fullWidth label="Game's name" {...register('name', { required: true })} />
        <Button color="primary" variant="contained" type="submit">
          Create
        </Button>
      </form>
    </>
  );
};

export default CreateGame;
