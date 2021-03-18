const path = require('path');

const publicDir = path.join(__dirname, 'public');
const outDir = path.join(__dirname, 'dist');

require('esbuild').build({
  entryPoints: [
    path.join(publicDir, 'index.js'),
  ],
  platform: 'browser',
  bundle: true,
  treeShaking: true,
  outdir: outDir,
}).catch(() => process.exit(1));
