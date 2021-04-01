/* eslint-disable no-bitwise */
const envPaths = require('env-paths');
const { constants } = require('fs');
const { join } = require('path');
const {
  access, mkdir, writeFile, readFile,
} = require('fs').promises;

const CONFIG_FILE_NAME = 'conf.json';
const envConfigDirPath = envPaths('', { suffix: '' }).config;
const envConfigFilePath = join(envConfigDirPath, CONFIG_FILE_NAME);

let storedToken = null;

async function storeToken(token) {
  try {
    const OSDataDir = await getOsDataDir();
    await writeFile(`${OSDataDir}/conf.json`, JSON.stringify({ token }));
  // eslint-disable-next-line no-empty
  } catch {}
}

async function retrieveStoredToken() {
  if (storedToken) {
    return storedToken;
  }
  try {
    await access(envConfigFilePath, constants.F_OK | constants.R_OK);
    const config = await readFile(envConfigFilePath, 'utf-8');
    storedToken = JSON.parse(config).token;
    return storedToken;
  } catch {
    return null;
  }
}

async function getOsDataDir() {
  try {
    await access(envConfigDirPath, constants.F_OK | constants.W_OK | constants.R_OK);
  } catch {
    await mkdir(envConfigDirPath);
  }
  return envConfigDirPath;
}

module.exports = { storeToken, retrieveStoredToken };
