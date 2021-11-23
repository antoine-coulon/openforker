#!/usr/bin/env node

const sade = require('sade');
const { italic } = require('kleur');
require('make-promises-safe');

const { version } = require('../package.json');
const { forkOne } = require('../src/actions/fork');
const { cliDefaultFont, divWrapper } = require('../src/util/ui');
const exploreTrends = require('../src/actions/trends');

const program = sade('forker').version(version);

divWrapper(`${cliDefaultFont('Forker executed from : ')} ${italic().yellow(process.cwd())}`);

program
  .command('trends')
  .describe('List top GitHub trends and choose ones to fork')
  .option('-l, --language', 'Select the trends language', false)
  .option('-p, --period', 'Select the period', false)
  .action(trendsTask);

program
  .command('use <repositoryInformation>')
  .describe('Fork a public GitHub repository by owner & repository name')
  .option('-c, --remoteOnly', 'Only fork the repository on GitHub', false)
  .option('-o, --open', 'Automatically open forked repository', false)
  .action(forkTask);

async function forkTask(repositoryInformation, options) {
  const [owner, repositoryName] = repositoryInformation.split('/');
  await forkOne({ author: owner, name: repositoryName }, options);
}

async function trendsTask(options) {
  await exploreTrends(options);
}

program.parse(process.argv);
