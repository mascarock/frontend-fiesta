// jest.config.js
module.exports = {
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!(axios)/)'],
  moduleNameMapper: {'^axios$': 'axios/dist/browser/axios.cjs'},
};
