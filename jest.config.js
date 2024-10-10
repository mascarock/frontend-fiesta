module.exports = {
    testEnvironment: 'jsdom', // Required for React component tests
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Optional: specify your setupTests file for additional setup
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest', // Use babel-jest to transform JavaScript files
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios)/' // By default, Jest ignores node_modules, but we need to include axios
    ],
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // Mock CSS imports
    },
  };
  