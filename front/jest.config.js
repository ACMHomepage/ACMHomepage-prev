/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    '/node_modules/(?!@mdx-js)',
  ],
  transform: {
    '^.+\\.[tj]s$': 'ts-jest'
  },
};
