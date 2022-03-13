const ignore_regex = [
  '.*/node_modules/.*',
  '.*/\\.git/.*',
  '.*/dist/.*',
  '.*/coverage/.*',

  '.*/yarn\\.lock',
  '.*/yarn-error\\.log',
  '.*/package-lock\\.json',
];

const flags = ['-type', 'f'];
ignore_regex.forEach((value) => {
  flags.push('!');
  flags.push('-regex');
  flags.push(value);
});

const all_files = (await quiet($`find . ${flags}`)).stdout.trim().split('\n');
console.log(all_files.join('\n'));
