const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = app =>
  app
    .use(
      '/api',
      createProxyMiddleware({
        target: 'http://localhost:8080',
        changeOrigin: true,
      })
    )
    .use(
      '/foo',
      createProxyMiddleware({
        target: 'http://localhost:8080',
        changeOrigin: true,
        logLevel: 'debug',
      })
    )
    .use(
      '/ws',
      createProxyMiddleware({
        target: 'ws://localhost:8080',
        ws: true,
        changeOrigin: true,
      })
    );
