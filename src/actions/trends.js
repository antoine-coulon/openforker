const { prompt } = require('inquirer');
const trending = require('trending-github');
const { forkMultiple } = require('./fork');

async function exploreTrends(options) {
  const repos = await exploreRepositories(options);
  await selectRepositoriesToFork(repos);
}

async function exploreRepositories(options) {
  const { language, period } = options;

  const questions = [];

  if (language) {
    questions.push(
      {
        name: 'language',
        message: 'Programming language concerned by trends',
      },
    );
  }

  if (period) {
    questions.push(
      {
        type: 'list',
        name: 'period',
        message: 'Trends period',
        choices: ['today', 'week', 'month'],
      },
    );
  }

  const finalOptions = {
    language: 'all',
    period: 'week',
  };

  if (questions.length > 0) {
    const results = await prompt(questions);
    finalOptions.language = results.language !== 'all' ? results.language : '';
    finalOptions.period = results.period;
  }

  let repos = [];

  if (finalOptions.language !== 'all') {
    repos = repos.concat(await trending(finalOptions.period, finalOptions.language));
  } else {
    repos = repos.concat(await trending(finalOptions.period));
  }

  return repos;
}

async function selectRepositoriesToFork(repos) {
  const reposDataMap = new Map();

  const reposPromptData = repos.map((repo) => {
    reposDataMap.set(repo.name, repo);
    return `${repo.name} (${repo.language ?? 'ressources'}) - ⭐ ${repo.stars} (stars) => Already forked by ${repo.forks} developers! `;
  });

  const { repositories } = await prompt([{
    type: 'checkbox',
    name: 'repositories',
    message: 'Repositories you want to fork',
    choices: reposPromptData,
  }]);

  const reposFullData = [];

  repositories.forEach((chosenRepo) => {
    const repoName = chosenRepo.split('(')[0].trimRight();
    reposFullData.push(reposDataMap.get(repoName));
  });

  await forkEachSelectedRepository(reposFullData);
}

async function forkEachSelectedRepository(repositories) {
  await forkMultiple(repositories);
}

module.exports = exploreTrends;
