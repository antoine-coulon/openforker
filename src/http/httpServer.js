/* eslint-disable no-console */
const express = require('express');
const { join } = require('path');

const PUBLIC = join(__dirname, '..', '..', 'dist');
const TEMPLATE = join(__dirname, '..', '..', 'template');

function bindServer(eventEmitter, callback) {
  const app = express();

  app.use(express.static(PUBLIC));

  app.get('/', (req, res) => {
    res.sendFile(join(TEMPLATE, '/index.html'));
  });

  app.get('/callback', (req, res) => {
    const { code, state } = req.query;

    if (code && state) {
      eventEmitter.emit('authenticated', code, state);
      return res.sendFile(join(TEMPLATE, '/success.html'));
    }

    eventEmitter.emit('aborted');
    return res.sendFile(join(TEMPLATE, '/fail.html'));
  });

  const server = app.listen(4243, () => {
    eventEmitter.on('endAuthProcess', () => {
      setImmediate(() => {
        server.close();
      });
    });
  });

  callback();
}

module.exports = { bindServer };
