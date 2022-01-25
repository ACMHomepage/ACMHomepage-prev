// Example: extending a pre-built Jest configuration file
module.exports = {
  ...require('@snowpack/app-scripts-react/jest.config.js')(),
  setupFilesAfterEnv: [],
};
