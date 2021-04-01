const {
  greenBright, redBright, whiteBright, yellowBright,
} = require('chalk');
const { bold } = require('kleur');
const ui = require('cliui')();

const cliDefaultFont = (text) => `${whiteBright(bold(text))}`;
const cliSuccessFont = (text) => `${greenBright(bold(text))}`;
const cliErrorFont = (text) => `${redBright(bold(text))}`;
const cliInfoFont = (text) => `${yellowBright(bold(text))}`;

const divWrapper = (text) => {
  ui.div(
    {
      text,
      padding: [1, 0, 1, 1],
    },
  );
  console.log(`${ui.toString()}`);
  ui.resetOutput();
};

module.exports = {
  divWrapper,
  cliDefaultFont,
  cliSuccessFont,
  cliErrorFont,
  cliInfoFont,
};
