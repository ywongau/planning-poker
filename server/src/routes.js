const uuid = require('uuid');
const express = require('express');
const { init } = require('./storage');

module.exports = app =>
  app
    .use(express.json())
    .use(express.static('build'))
    .use('/game/*', express.static('build'))
    .post('/api/game', (req, res) => {
      const id = uuid.v4();
      const name = req.body.name;
      init(id, name);
      return res.json({ id, name });
    });
