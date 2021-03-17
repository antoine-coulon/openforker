module.exports = {
  setupFilesAfterEnv: [
    './jest.setup.js',
  ],
  collectCoverageFrom: [
    '**/src/**/*.js',
  ],
  testEnvironment: 'node',
  testMatch: [
    '**/test/**/*.js',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
};
