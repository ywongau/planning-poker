const json = response => response.json();

const create = name =>
  fetch(`${window.location.origin}/api/game`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      name,
    }),
  }).then(json);
const api = { create }

export default api;
