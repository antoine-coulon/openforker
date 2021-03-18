const express = require('express');
const { join } = require('path');

const PUBLIC = join(__dirname, '..', 'dist');
const TEMPLATE = join(__dirname, '..', 'template');

function bindServer(eventEmitter, callback) {
  const app = express();

  app.use(express.static(PUBLIC));

  app.get('/', (req, res) => {
    res.sendFile(join(TEMPLATE, '/index.html'));
  });

  app.post('/', (req, res) => {
    console.log(req.headers);
    return res.json();
  });

  app.get('/callback', (req, res) => {
    const { error, code, state } = req.query;

    console.log(code, state);

    if (error) {
      eventEmitter.emit('aborted', code, state);
      return res.status(401).json('error auth');
    }

    if (code && state) {
      eventEmitter.emit('authenticated', code, state);
      return res.status(200).json('auth, you can close');
    }

    return res.status(500).end();
  });

  app.listen(4243);

  callback();
}

module.exports = { bindServer };
