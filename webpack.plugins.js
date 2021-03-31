const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const webpack = require('webpack')

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new webpack.EnvironmentPlugin({
    NODE_ENV: 'production',
    DEBUG_PROD: false,
    START_MINIMIZED: false,
  }),
]
