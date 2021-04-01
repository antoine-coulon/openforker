/* eslint-disable camelcase */
/* eslint-disable no-console */
const { EventEmitter } = require('events').EventEmitter;
const browser = require('openurl');

const { bindServer } = require('../http/httpServer');
// eslint-disable-next-line no-unused-vars
const { getAccessToken } = require('../http/httpClient');
const { storeToken, retrieveStoredToken } = require('../util/token');
const AuthenticationProcessFailed = require('../errors/authProcessFailed');

const { SERVER_URL } = require('./constants');

async function authenticate() {
  let token = await retrieveStoredToken();

  if (token) {
    return { token };
  }

  const authToken = await startAuth();

  if (authToken) {
    token = authToken;
  }

  return {
    token,
  };
}

async function startAuth() {
  const authEmitter = new EventEmitter();

  bindServer(authEmitter, () => {
    browser.open(SERVER_URL);
  });

  const authProcess = () => new Promise((resolve, reject) => {
    authEmitter.on('authenticated', (code, state) => {
      resolve({ code, state });
    });

    authEmitter.on('aborted', () => {
      reject(new AuthenticationProcessFailed());
    });
  });

  const codeCredentials = await authProcess();

  authEmitter.emit('endAuthProcess');

  const token = await getAccessToken(codeCredentials);

  await storeToken(token);

  return token;
}

module.exports = { authenticate };
