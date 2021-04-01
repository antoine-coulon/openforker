const runCommand = require('../util/command');
const {
  cliDefaultFont, cliErrorFont, cliInfoFont, divWrapper,
} = require('../util/ui');

async function cloneRepository(repository) {
  divWrapper(
    `${cliDefaultFont('[git clone] ')} ${cliInfoFont(process.cwd())} `,
  );

  runCommand(`git clone ${repository.clone_url}`)
    .then((status) => {
      console.log(cliDefaultFont(status));
    })
    .catch((error) => {
      console.log(cliErrorFont(error));
    });
}

module.exports = cloneRepository;
