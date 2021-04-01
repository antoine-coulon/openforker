module.exports = class EmptyRepositories extends Error {
  constructor() {
    super();
    this.message = 'There must be atleast one repository.';
  }
};
