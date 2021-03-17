#!/usr/bin/env node

/* eslint-disable no-console */
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const sade = require('sade');
const { bold, italic } = require('kleur');

const { version, name } = require('../package.json');

const program = sade(name).version(version);

clear();
console.log(
  chalk.greenBright(
    figlet.textSync('Forker', { horizontalLayout: 'full' }),
  ),
);

console.log(`${bold().gray('Forker executed from : ')} ${italic().yellow(process.cwd())}`);

program
  .command('trends')
  .describe('List top GitHub trends')
  .option('-l, --limit', 15)
  .action(() => {});

program
  .command('fork')
  .describe('Fork a public GitHub repository by name')
  .option('-b, --branch', 'Default branch target to fork the repository in', 'main')
  .option('-i, --install', 'Automatically install dependencies after fork', false)
  .action(() => {});

program.parse(process.argv);
