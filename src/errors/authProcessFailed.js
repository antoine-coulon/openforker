module.exports = class AuthenticationProcessFailed extends Error {
  constructor() {
    super();
    this.message = 'Authentication process failed.';
  }
};
