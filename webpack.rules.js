module.exports = [
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /(\.jsx?|\.tsx?)$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'babel-loader',
    },
  },
]
