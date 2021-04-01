const authModule = require('../auth/auth');
const RepositoryNotFound = require('../errors/repositoryNotFound');
const httpClient = require('../http/httpClient');

async function findRepository(repositoryData) {
  const { token } = await authModule.authenticate();

  const repository = await httpClient.findRepository({ ...repositoryData, token });

  if (!repository) {
    throw new RepositoryNotFound(repositoryData.owner, repositoryData.repositoryName);
  }

  return repository;
}

module.exports = findRepository;
