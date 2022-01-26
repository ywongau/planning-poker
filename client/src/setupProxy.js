const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app =>
  app
    .use(
      createProxyMiddleware('/api', {
        target: 'http://localhost:8080',
        changeOrigin: true,
      })
    )
    .use(
      createProxyMiddleware('/ws', {
        target: 'ws://localhost:8080',
        ws: true,
        changeOrigin: true,
      })
    );
