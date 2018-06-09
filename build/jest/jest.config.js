const config = {
  testMatch: [`${process.cwd()}/**/__tests__/**/*.js`],
  testPathIgnorePatterns: [
    // ignore files that are under a directory starting with "_" at the root of __tests__
    '/__tests__\\/_.*?',
    // ignore files under __tests__ that start with an "_"
    '/__tests__\\/.*?\\/_.*?',
  ],
  modulePathIgnorePatterns: ['./node_modules'],
  transformIgnorePatterns: ['\\/node_modules\\/(?!@space-miner)'],
  resolver: require.resolve('./src/resolver.js'),
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleFileExtensions: ['js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/build/jest-config/src/fileMock.js',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFiles: ['./build/jest-config/src/setupFile.js'],
};

module.exports = config;
