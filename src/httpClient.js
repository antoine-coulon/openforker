/* eslint-disable no-console */
/* eslint-disable camelcase */
const { yellowBright } = require('chalk');
const got = require('got');
const { grey } = require('kleur');

async function getAccessToken({ code, state }) {
  const { body } = await got.post('https://github.com/login/oauth/access_token', {
    json: {
      client_id: 'b21103718c308abe6916',
      client_secret: 'd434a4d3c716e40ea3d221bc6c6a029a52527854',
      code,
      state,
    },
    responseType: 'json',
  });

  const { access_token } = body;

  return access_token;
}

async function getUserProfile(access_token) {
  const { body } = await got('https://api.github.com/user', {
    headers: {
      authorization: `Bearer ${access_token}`,
    },
    responseType: 'json',
  });

  console.log(`${grey('Succesfully connected as')} : ${yellowBright(body.login)}`);

  return {
    body,
  };
}

async function executeFork() {
  got();
}

module.exports = { executeFork, getAccessToken, getUserProfile };
