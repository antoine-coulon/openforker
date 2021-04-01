module.exports = class RepositoryNotFound extends Error {
  constructor(owner, repository) {
    super();
    this.message = `Repository ${owner}/${repository} could not be found`;
  }
};
