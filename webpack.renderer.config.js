const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins')

rules.push({
  test: /\.css$/,
  exclude: /\.module\.css$/,
  use: [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
      options: {
        import: true,
      },
    },
  ],
})

rules.push({
  test: /\.module\.css$/,
  use: [
    {
      loader: 'style-loader',
      options: {
        esModule: false,
      },
    },
    {
      loader: 'css-loader',
      options: {
        esModule: false,
        modules: {},
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

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  target: 'electron-renderer',
}
