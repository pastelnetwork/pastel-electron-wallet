const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new webpack.EnvironmentPlugin({
    NODE_ENV: 'production',
    DEBUG_PROD: false,
    START_MINIMIZED: false,
  }),
  new CopyPlugin({
    patterns: [
      { from: 'node_modules/sql.js/dist/sql-wasm.wasm', to: 'static/bin' },
      {
        from: 'node_modules/squoosh/production',
        to: 'static/squoosh',
      },
      {
        from: 'node_modules/jpg-glitch/production',
        to: 'static/glitch',
      },
      {
        from: 'node_modules/ffmpegwasm-create-video/production',
        to: 'static/ffmpeg',
      },
      {
        from: 'src/_locales',
        to: 'static/locales',
      },
    ],
  }),
  new Dotenv({
    path: './.env', // Path to .env file (this is the default)
  }),
]
