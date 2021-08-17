module.exports = {
  presets: [
    'react-app',
    [
      '@babel/preset-env',
      {
        loose: true,
        shippedProposals: true,
      },
    ],
  ],
  plugins: [
    'react-hot-loader/babel',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-optional-chaining', { loose: true }],
  ],
}
