const NodeCache = require('node-cache');
const cache = new NodeCache({
  stdTTL: 10000,
});

const init = (gameId, name) =>
  cache.set(gameId, {
    name,
    players: [],
  });

const update = (gameId, state) => cache.set(gameId, state);

const get = gameId => cache.get(gameId);

module.exports = {
  init,
  update,
  get,
};
