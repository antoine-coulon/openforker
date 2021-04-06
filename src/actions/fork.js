/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const {
  green, bold, grey, red,
} = require('kleur');
const {
  yellowBright, redBright, whiteBright, greenBright,
} = require('chalk');
const browser = require('openurl');

const { authenticate } = require('../auth/auth');
const httpClient = require('../http/httpClient');
const ForkProcessFailed = require('../errors/forkProcessFailed');
const EmptyRepositories = require('../errors/emptyRepositories');
const {
  cliDefaultFont, cliSuccessFont, divWrapper, cliErrorFont,
} = require('../util/ui');

const cloneRepository = require('./clone');
const findRepository = require('./findRepository');
const WrongRepositoryInformation = require('../errors/wrongRepositoryInformation');

const FORK_CHECKOUT_TIMEOUT = 10000;
const FORK_CHECKOUT_INTERVAL = 2500;

async function forkOne({ owner, repositoryName }, options = { clone: false, open: false }) {
  try {
    if (!owner || !repositoryName) {
      throw new WrongRepositoryInformation();
    }

    const { token } = await authenticate();

    const userDetails = await httpClient.getUserProfile(token);

    const forkedRepository = await startFork({
      ...userDetails, repositoryName, owner, token,
    }, options);

    continueActionsWithForkedRepository(forkedRepository, options);
  } catch (e) {
    console.log(redBright(e.message));
  }
}

async function forkMultiple(repositories) {
  try {
    if (repositories.length === 0) {
      throw new EmptyRepositories();
    }

    if (repositories.length === 1) {
      await forkOne(repositories[0]);
      return;
    }

    const { token } = await authenticate();

    const userDetails = await httpClient.getUserProfile(token);

    const forkMultipleResults = await Promise.allSettled(
      repositories.map((repository) => {
        const { author: owner, name: repositoryName } = repository;
        return startFork({
          owner, repositoryName, token, login: userDetails.login,
        });
      }),
    );

    forkMultipleResults.forEach((result) => {
      if (result.status === 'fulfilled') {
        divWrapper(cliSuccessFont(`1 fork completed : [${result.value.name}]`));
      } else {
        divWrapper(cliErrorFont(`1 fork failed : ${result.reason}`));
      }
    });
  } catch (e) {
    divWrapper(redBright(e.message));
  }
}

// eslint-disable-next-line no-empty-function
function startFork({
  repositoryName, owner, login, token,
}) {
  return new Promise((resolve, reject) => {
    divWrapper(`${green('Forking')} : ${yellowBright(`${owner}/${repositoryName}`)}`);

    httpClient.executeFork({ repositoryName, owner, token });

    divWrapper(whiteBright(bold(`Forking ${repositoryName} ...`)));

    const interval = setInterval(async () => {
      findRepository({ repositoryName, owner: login })
        .then((repository) => {
          clearInterval(interval);
          resolve(repository);
        })
        .catch(() => {});
    }, FORK_CHECKOUT_INTERVAL);

    setTimeout(() => {
      clearInterval(interval);
      reject(new ForkProcessFailed(repositoryName));
    }, FORK_CHECKOUT_TIMEOUT);
  });
}

async function continueActionsWithForkedRepository(repository, options) {
  const { clone, open } = options;

  divWrapper(`${cliDefaultFont('Successfully created fork : ')} ${cliSuccessFont(repository.html_url)}`);

  if (clone) {
    cloneRepository(repository);
  }

  if (open) {
    browser.open(repository.html_url);
  }
}

module.exports = { forkOne, forkMultiple };
