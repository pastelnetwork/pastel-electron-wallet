const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main.ts',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'node_modules/pngquant-bin/vendor/pngquant',
          to: '../vendor',
        },
        {
          from: 'node_modules/guetzli/vendor/guetzli',
          to: '../vendor',
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
}
