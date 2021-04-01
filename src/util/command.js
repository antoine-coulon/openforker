const { exec } = require('child_process');
const { cliErrorFont, cliDefaultFont } = require('./ui');

function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        return reject(err);
      }

      console.log(cliErrorFont(stderr));
      console.log(cliDefaultFont(stdout));

      return resolve();
    });
  });
}

module.exports = runCommand;
