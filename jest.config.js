module.exports = {
  setupFilesAfterEnv: [
    './jest.setup.js',
  ],
  collectCoverageFrom: [
    '**/src/actions/*.js',
    '**/src/auth/*.js',
  ],
  testEnvironment: 'node',
  testMatch: [
    '**/test/**/*.js',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
};
