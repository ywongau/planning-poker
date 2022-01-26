const mapping = {
  join: (state, action) => ({
    ...state,
    players: state.players.concat({
      name: action.payload,
    }),
  }),
  estimate: (state, action) => ({
    ...state,
    players: state.players.map(player =>
      player.name === action.payload.name ? { ...player, points: action.payload.points } : player
    ),
  }),
  reveal: state => ({
    ...state,
    revealed: true,
  }),
  reset: state => ({
    ...state,
    revealed: false,
    players: state.players.map(({ name }) => ({ name })),
  }),
  leave: (state, action) => ({
    ...state,
    players: state.players.filter(player => player.name !== action.payload),
  }),
};

const reducer = (state, action) => state && (mapping[action?.type]?.(state, action) ?? state);

module.exports = reducer;
