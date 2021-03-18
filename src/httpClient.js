/* eslint-disable no-console */
/* eslint-disable camelcase */
const { yellowBright } = require('chalk');
const got = require('got');
const { grey } = require('kleur');
const { SERVERLESS_API } = require('./constants');

async function getAccessToken({ code, state }) {
  const { body } = await got(`${SERVERLESS_API}?code=${code}&state=${state}`, {
    responseType: 'json',
  });

  return body.token;
}

async function getUserProfile(access_token) {
  const { body } = await got('https://api.github.com/user', {
    headers: {
      authorization: `Bearer ${access_token}`,
    },
    responseType: 'json',
  });

  console.log(`${grey('Successfully connected as')} : ${yellowBright(body.login)}`);

  return body;
}

async function executeFork() {
  got();
}

module.exports = { executeFork, getAccessToken, getUserProfile };
