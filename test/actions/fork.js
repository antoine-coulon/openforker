const fork = require('../../src/actions/fork');
const authModule = require('../../src/auth/auth');
const server = require('../../src/http/httpServer');

describe('Fork task', () => {
  beforeEach(() => {
    server.bindServer = jest.fn().mockImplementation((cb) => setTimeout(cb));
    fork.forkOne = jest.fn().mockImplementation(() => {});
    fork.forkMultiple = jest.fn().mockImplementation(async (repositories) => {
      if (repositories.length === 1) { fork.forkOne(repositories[0]); }
    });
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

  it('should not start the fork multiple because no repositories were supplied', async () => {
    expect(await fork.forkMultiple([])).toEqual(undefined);
  });

  it('should not start the fork multiple but fallback to fork one because only one repo was supplied', async () => {
    const forkOneSpy = jest.spyOn(fork, 'forkOne');

    const repositoryFixture = {
      owner: 'bitcoin',
      repositoryName: 'bitcoin',
    };
    await fork.forkMultiple([repositoryFixture]);
    await expect(forkOneSpy).toBeCalled();
  });
});
