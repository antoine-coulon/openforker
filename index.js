const { forkOne: forkOneAction, forkMultiple: forkMultipleAction } = require('./src/actions/fork');

async function forkOne(repositoryTarget, options) {
  if (!repositoryTarget.owner) {
    throw new Error('Missing repository owner');
  }

  if (!repositoryTarget.repositoryName) {
    throw new Error('Missing repository name');
  }

  await forkOneAction(repositoryTarget, options);
}

async function forkMultiple(repositories = []) {
  if (repositories.length === 0) {
    throw new Error('Missing repositories');
  }
  if (repositories.length === 1) {
    await forkOneAction(repositories[0]);
    return;
  }
  const validRepositories = repositories
    .filter((repository) => (!repository.author && !repository.name));

  await forkMultipleAction(validRepositories);
}

module.exports = { forkOne, forkMultiple };
