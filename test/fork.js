const { fork } = require('../src/fork');
const authModule = require('../src/auth');

const server = require('../src/httpServer');

describe('Fork task', () => {
  beforeEach(() => {
    server.bindServer = jest.fn().mockImplementation((cb) => setTimeout(cb));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should try to auth before forking', async () => {
    const authModuleSpy = jest.spyOn(authModule, 'authenticate');
    authModule.authenticate = jest.fn();
    authModule.isAuthenticated = jest.fn().mockReturnValue(false);

    expect(authModule.isAuthenticated()).toBeFalsy();
    await fork('angular', { branch: 'main', install: false });
    await (() => expect(authModuleSpy).toBeCalled());
  });

  it('should proceed to fork because user is auth', async () => {
    authModule.authenticate = jest.fn().mockResolvedValue(
      {
        login: 'anonymous1', id: '4542s', html_url: '',
      },
    );
  });
});
