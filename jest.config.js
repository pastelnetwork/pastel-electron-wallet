module.exports = {
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/tools/cssModuleMock.js',
    "^.+\\.svg$": "jest-svg-transformer",
  },
}
