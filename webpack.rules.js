const isDevelopment = process.env.NODE_ENV !== 'production'
module.exports = [
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /(<extensions>\.jsx?|\.tsx?)$/,
    exclude: /(<exclude>node_modules|\.webpack)/,
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
