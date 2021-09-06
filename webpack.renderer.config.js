const path = require('path')
const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins')

rules.push({
  test: /\.css$/,
  use: [
    { loader: 'style-loader' },
    { loader: 'css-loader' },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['tailwindcss', 'autoprefixer'],
        },
      },
    },
  ],
})

// TODO figure out how to load assets with file-loader. Currently, they are being resolved in a wrong folder, and this is why URL-loader whould be a quick and dirty solution.
rules.push({
  test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
  use: [
    {
      loader: 'url-loader',
      // options: {
      //   name: "[name].[ext]",
      //   outputPath: "fonts/",
      // },
    },
  ],
})

// TODO figure out how to load assets with file-loader. Currently, they are being resolved in a wrong folder, and this is why URL-loader whould be a quick and dirty solution.
rules.push({
  test: /\.(png|jpe?g|gif)$/i,
  use: [
    {
      loader: 'url-loader',
    },
  ],
})
rules.push({
  test: /\.bin$/i,
  use: [
    {
      loader: 'file-loader',
    },
  ],
})

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      bindings: path.resolve('__mocks__', 'bindings'),
    },
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
}
