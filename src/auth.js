/* eslint-disable camelcase */
/* eslint-disable no-console */
const { EventEmitter } = require('events').EventEmitter;
const browser = require('openurl');
const { greenBright, redBright } = require('kleur');

const { bindServer } = require('./httpServer');
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
        console.log(greenBright(`authenticated : ${code}, ${state}`));
        resolve({ code, state });
      });

      authEmitter.on('aborted', () => {
        console.log(redBright('aborted'));
        reject();
      });
    });

    const codeCredentials = await authProcess();

    const { access_token } = await getAccessToken(codeCredentials);

    return {
      token: access_token,
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
