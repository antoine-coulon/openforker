/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const { EventEmitter } = require('events');

const openurl = require('openurl');

const got = require('got');
const { red, green, grey } = require('kleur');
const { yellowBright } = require('chalk');
const { bindServer } = require('./httpServer');

const { isAuthenticated, authenticate } = require('./auth');
const { getUserProfile } = require('./httpClient');

async function fork(repositoryName, options) {
  const { branch, install } = options;

  const authEmitter = new EventEmitter();

  // eslint-disable-next-line no-use-before-define
  const { token } = await authenticate();

  const { login, html_url, id } = await getUserProfile(token);

  await proceedFork(repositoryName, options);
}

// eslint-disable-next-line no-empty-function
async function proceedFork(repositoryName, userProfile, options) {}

module.exports = { fork };
