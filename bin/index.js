#!/usr/bin/env node

/* eslint-disable no-console */
const sade = require('sade');
const { italic } = require('kleur');
require('make-promises-safe');

const { version, name } = require('../package.json');
// eslint-disable-next-line no-unused-vars
const { forkOne } = require('../src/actions/fork');
const { cliDefaultFont, divWrapper } = require('../src/util/ui');
const exploreTrends = require('../src/actions/trends');

const program = sade(name).version(version);

divWrapper(`${cliDefaultFont('Forker executed from : ')} ${italic().yellow(process.cwd())}`);


program
  .command('trends')
  .describe('List top GitHub trends')
  .option('-l, --language', 'Select the trends language', false)
  .option('-p, --period', 'Select the period', false)
  .action(trendsTask);

program
  .command('use <owner> <repositoryName>')
  .describe('Fork a public GitHub repository by owner & repository name')
  .option('-c, --clone', 'Automatically clone the remote fork', false)
  .option('-o, --open', 'Automatically open forked repository', false)
  .action(forkTask);

async function forkTask(owner, repositoryName, options) {
  await forkOne({ owner, repositoryName }, options);
}

async function trendsTask(options) {
  await exploreTrends(options);
}

program.parse(process.argv);
