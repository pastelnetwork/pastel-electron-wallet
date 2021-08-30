module.exports = {
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/tools/cssModuleMock.js',
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tools/fileMock.js',
  },
  moduleDirectories: ['node_modules', 'src'],
}
