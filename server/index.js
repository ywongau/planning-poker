const express = require('express');
const routes = require('./src/routes');
const { onUpgrade } = require('./src/wsServer');

routes(express()).listen(8080).on('upgrade', onUpgrade);
