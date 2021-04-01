/* eslint-disable no-console */
/* eslint-disable camelcase */
const { yellowBright } = require('chalk');
const got = require('got');
const { grey } = require('kleur');
const { SERVERLESS_API } = require('../auth/constants');
const { divWrapper } = require('../util/ui');

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

  divWrapper(`${grey('Connected as')} : ${yellowBright(body.login)}`);

  return body;
}

async function findRepository({ owner, repositoryName, token }) {
  try {
    const { body } = await got(`https://api.github.com/repos/${owner}/${repositoryName}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      responseType: 'json',
    });

    if (body) {
      return body;
    }
  // eslint-disable-next-line no-empty
  } catch {}

  return null;
}

async function executeFork({ owner, repositoryName, token }) {
  const { body } = await got.post(`https://api.github.com/repos/${owner}/${repositoryName}/forks`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    responseType: 'json',
  });
  return body;
}

module.exports = {
  executeFork, getAccessToken, getUserProfile, findRepository,
};
