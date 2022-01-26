module.exports = (id, name) => {
  const ws = new WebSocket(
    `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${
      window.location.host
    }/ws?id=${id}&name=${name}`
  );

  const wsReady = new Promise(resolve => ws.addEventListener('open', resolve));

  const send = data => wsReady.then(() => ws.send(JSON.stringify(data)));

  const recieved = callback => ws.addEventListener('message', callback);

  return {
    send,
    recieved,
  };
};
