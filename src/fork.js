/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const { EventEmitter } = require('events');

const { green } = require('kleur');
const { yellowBright } = require('chalk');

const { authenticate } = require('./auth');
const { getUserProfile } = require('./httpClient');

async function fork(repositoryName, options) {
  const { branch, install } = options;

  // eslint-disable-next-line no-use-before-define
  const { token } = await authenticate();

  const userDetails = await getUserProfile(token);

  await proceedFork({ ...userDetails, repositoryName }, options);
}

// eslint-disable-next-line no-empty-function
async function proceedFork({ repositoryName, login, html_url }, options) {
  console.log(`${green('forking')} : ${yellowBright(repositoryName)}`);
}

module.exports = { fork };
