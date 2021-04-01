const fork = require('../../src/actions/fork');
const authModule = require('../../src/auth/auth');

const server = require('../../src/http/httpServer');

describe('Fork task', () => {
  beforeEach(() => {
    server.bindServer = jest.fn().mockImplementation((cb) => setTimeout(cb));
    fork.forkMultiple = jest.fn().mockImplementation(() => {});
    fork.forkOne = jest.fn().mockImplementation(() => {});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should try to auth before forking', async () => {
    const authModuleSpy = jest.spyOn(authModule, 'authenticate');
    authModule.authenticate = jest.fn();

    await fork.forkOne({ repositoryName: 'angular', owner: 'angular' }, { branch: 'main', install: false });
    await (() => expect(authModuleSpy).toBeCalled());
  });

  it('should start the fork because user is auth', async () => {
    authModule.authenticate = jest.fn().mockResolvedValue(
      {
        login: 'anonymous1', id: '4542s',
      },
    );
  });
});
