#!/usr/bin/env zx
// Using `yarn global add zx`, and make sure that `yarn global bin` is in your
// PATH env variable.

// The first 3 arguments is: node's path, zx's path and this file's path.
// Remove to get the really arguments.
const [node_path, zs_path, this_file_path, ...argv] = process.argv;

$.verbose = false;

if (argv.length === 1 && argv[0] === 'find_all_file') {
  const ignore_regex = [
    '.*/node_modules/.*',
    '.*/\\.git/.*',
    '.*/dist/.*',

    '.*/yarn\\.lock',
    '.*/package-lock\\.json',
  ];
  await $`find . -type f ${(() => {
    const result = [];
    ignore_regex.forEach((value) => {
      result.push('!');
      result.push('-regex');
      result.push(value);
    });
    return result;
  })()}`.pipe(process.stdout);
} else {
  console.log(
    [
      'Usage: ./helper.mjs <command>',
      '',
      'Command:',
      '  find_all_file  Show all files of the pwd row by row.',
      '  help           Show this message',
    ].join('\n'),
  );
}
