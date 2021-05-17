module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/tools/cssModuleMock.ts',
  },
}
