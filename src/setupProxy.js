const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/getAuthenticate', proxy({
    target: 'http://localhost:3553/',
    changeOrigin: true,
  }));
};