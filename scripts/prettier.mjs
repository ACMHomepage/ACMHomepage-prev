console.log("$ Try to find prettier's path.");
const prettier = (await $`yarn bin`).stdout.trim() + '/prettier';

const flags = ['-w', '--color'];
const exts = [
  'mjs',
  'js',
  'jsx',
  'ts',
  'tsx',
  'json',
  'md',
  'html',
  'sql',
  'yml',
].join(',');
const path = [
  'front/mock/**/',
  'front/src/**/',
  'front/',
  'back/src/**/',
  'back/',
  'scripts/',
  '',
].join(',');
const file_glob = `{${path}}*.{${exts}}`;

console.log('$ Format code.');
await $`${prettier} ${flags} ${file_glob}`;
