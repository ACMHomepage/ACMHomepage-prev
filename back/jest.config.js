export default {
  preset: 'ts-jest',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  transformIgnorePatterns: [
    "node_modules/(?!crypto-random-string)",
  ]
};
