#!/usr/bin/env zx
// Using `yarn global add zx`, and make sure that `yarn global bin` is in your
// PATH env variable.

import assert from 'assert/strict';

// The first 3 arguments is: node's path, zx's path and this file's path.
// Remove to get the really arguments.
const [_node_path, _zs_path, _this_file_path, ...argv] = process.argv;

/******************************************************************************
 * Config part
 *****************************************************************************/
const DB_NAME = 'acm-homepage.maria-db';
const DB_PORT = 3306;
const DB_DOCKERFILE_DIR = `${__dirname}/src/db`;

/******************************************************************************
 * Main part
 *****************************************************************************/

/**
 * Entrypoint.
 */
const main = async () => {
  if (argv.length === 0) {
    help();
  } else if (argv[0] === 'build') {
    await build_db_docker_image();
  } else if (argv[0] === 'run') {
    await run_db_docker_container();
  } else if (argv[0] === 'rm') {
    await remove_db_docker_container();
  } else {
    help();
  }
};

/**
 * Show help message
 */
const help = () => {
  console.log(
    [
      'Usage: ./make.mjs <command>',
      '',
      'Command:',
      '  help  Show this message',
      "  build Build Database's docker image",
      "  run   Run Database's docker container from its image",
      "  rm    Remove Database's docker container",
    ].join('\n'),
  );
};

/**
 * Build database's image by name ${DB_NAME}.
 */
const build_db_docker_image = async () => {
  await $`docker build -t ${DB_NAME} ${DB_DOCKERFILE_DIR}`;
};

/**
 * Run the container by image with name ${DB_NAME}.
 */
const run_db_docker_container = async () => {
  await build_db_docker_image();
  await remove_db_docker_container();

  const RUN_FLAG = ['-d', '--name', DB_NAME, '-p', `${DB_PORT}:3306`];
  await $`docker run ${RUN_FLAG} ${DB_NAME}`;
};

/**
 * Try to remove the container named ${DB_NAME}.
 */
const remove_db_docker_container = async () => {
  // If the container is already running, then rm it forcely firstly.
  if (!(await docker_container_id())) {
    console.log('No container need to remove');
    return;
  }
  await $`docker rm -f ${DB_NAME}`;
};

/******************************************************************************
 * Util part
 *****************************************************************************/

/**
 * Return docker container's id.
 *
 * @returns If not existed, then return `undefined`. If existed, then return a
 * string of the id.
 */
const docker_container_id = async () => {
  const result = (await $`docker ps -q -a -f name=${DB_NAME}`).stdout;
  const result_list = result.split('\n').filter((id) => /\w+/.test(id));
  if (result_list.length === 0) {
    console.log(`No container named ${DB_NAME}`);
    return undefined;
  }
  assert.equal(result_list.length, 1);
  return result_list[0];
};

/******************************************************************************
 * Entrypoint
 *****************************************************************************/
try {
  main();
} catch (p) {
  console.log(`Exit code: ${p.exitCode}`);
  console.log(`Error: ${p.stderr}`);
}
