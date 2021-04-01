module.exports = class ForkProcessFailed extends Error {
  constructor(repository) {
    super();
    this.message = `Fork ${repository} failed.`;
  }
};
