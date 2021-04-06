
<h1 align="center">
    OpenForker 🔗🌎
</h1>

<p align="center">
    CLI / API helping developers view, chose and fork an open-source GitHub repository
</p>

<p align="center">
    <a href="https://www.npmjs.com/package/openforker"><img src="https://img.shields.io/github/package-json/v/antoine-coulon/openforker?style=flat-square" alt="npm version"></a>
    <a href="https://www.npmjs.com/package/openforker"><img src="https://img.shields.io/npm/dw/openforker?style=flat-square" alt="downloads"></a>
</p>

<p align="center">
    <img src="https://user-images.githubusercontent.com/43391199/113750631-5d426980-970b-11eb-89a8-7ee45e267f82.gif">
</p>

## Getting started

### CLI Mode

To use OpenForker as a CLI :

```console
$ npm install openforker -g 
```

* explore GitHub trends by language and filter them by period
```console
$ forker trends --language --period
```

* directly fork a repository by knowing author & repository name, then clones it locally and open a browser tab
on the forked repository
```console
$ forker use discordjs discord.js --clone
```

### API Mode

To use OpenForker as an API :

```console
$ npm install openforker
```

```js
const forker = require('openforker');

(async () => {
    await forker.forkOne({ owner: "discordjs", repositoryName: "discord.js"})
})().catch();
```

## Authentication

OpenForker uses [Auth0](https://auth0.com/) to provide secure access to GitHub API.