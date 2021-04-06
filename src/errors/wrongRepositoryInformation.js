module.exports = class WrongRepositoryInformation extends Error {
  constructor() {
    super();
    this.message = '<repositoryInformation> must be formatted as "owner/repositoryName"';
  }
};
