const findRepository = require('../../src/actions/findRepository');
const authModule = require('../../src/auth/auth');
const RepositoryNotFound = require('../../src/errors/repositoryNotFound');
const httpClientModule = require('../../src/http/httpClient');

describe('Find Repository task', () => {
  beforeEach(() => {
    authModule.authenticate = jest.fn().mockReturnValue({ token: 'sd5f4qsdf5qsdf' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should throw an exception because no repository found', async () => {
    httpClientModule.findRepository = jest.fn().mockResolvedValue(null);

    const fixture = {
      owner: 'ansible',
      repositoryName: 'ansible',
    };

    await expect(findRepository(fixture))
      .rejects.toThrow(new RepositoryNotFound(fixture.owner, fixture.repositoryName));
  });

  it('should find the supplied repository', async () => {
    const repositoryFixture = {
      name: 'ansible',
      author: 'ansible',
    };
    httpClientModule.findRepository = jest.fn().mockResolvedValue(repositoryFixture);

    expect(await findRepository()).toEqual(repositoryFixture);
  });
});
