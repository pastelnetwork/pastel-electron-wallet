const isDevelopment = process.env.NODE_ENV !== 'production'
module.exports = [
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /(<id>\.jsx?|\.tsx?)$/,
    exclude: /(<id>node_modules|\.webpack)/,
    use: {
      loader: 'babel-loader',
      options: {
        plugins: [
          isDevelopment && require.resolve('react-refresh/babel'),
        ].filter(Boolean),
      },
    },
  },
]
