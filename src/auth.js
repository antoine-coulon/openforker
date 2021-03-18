/* eslint-disable camelcase */
/* eslint-disable no-console */
const { EventEmitter } = require('events').EventEmitter;
const browser = require('openurl');
const { redBright } = require('chalk');

const { bindServer } = require('./httpServer');
// eslint-disable-next-line no-unused-vars
const { getAccessToken } = require('./httpClient');
const { SERVER_URL } = require('./constants');

function isAuthenticated() {
  return false;
}

async function authenticate() {
  if (!isAuthenticated()) {
    const authEmitter = new EventEmitter();

    bindServer(authEmitter, () => {
      browser.open(SERVER_URL);
    });

    const authProcess = () => new Promise((resolve, reject) => {
      authEmitter.on('authenticated', (code, state) => {
        resolve({ code, state });
      });

      authEmitter.on('aborted', () => {
        console.log(redBright('aborted'));
        reject();
      });
    });

    const codeCredentials = await authProcess();
    authEmitter.emit('endAuthProcess');

    const token = await getAccessToken(codeCredentials);

    return {
      token,
    };
  }

  return getCredentials();
}

function getCredentials() {
  return {
    token: null,
  };
}

module.exports = { authenticate, isAuthenticated };
