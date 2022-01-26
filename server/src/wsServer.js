const ws = require('ws');
const { update, get } = require('./storage');
const reducer = require('./reducer');

const updateState = (gameId, newState) => {
  update(gameId, newState);
  [...wsServer.clients]
    .filter(client => client.id === gameId)
    .forEach(client => client.send(JSON.stringify(newState)));
};

const onMessage = gameId => message => {
  const action = JSON.parse(message.toString());
  const state = get(gameId);
  updateState(gameId, reducer(state, action));
};

const onClose = (gameId, playerName) => () =>
  updateState(gameId, reducer(get(gameId), { type: 'leave', payload: playerName }));

const wsServer = new ws.Server({ noServer: true }).on('connection', (socket, request) => {
  const [, search] = request?.url?.split?.('?');
  const params = new URLSearchParams(search);
  const gameId = params.get('id');
  const playerName = params.get('name');
  socket.id = gameId;
  socket.on('message', onMessage(gameId));
  socket.on('close', onClose(gameId, playerName));
});

const onUpgrade = (request, socket, head) =>
  wsServer.handleUpgrade(request, socket, head, socket =>
    wsServer.emit('connection', socket, request)
  );

module.exports = { onUpgrade };
