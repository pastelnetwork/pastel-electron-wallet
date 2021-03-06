const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-css-modules-preset',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  webpackFinal: config => {
    config.module.rules.push({
      test: /\.css&/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [require('tailwindcss'), require('autoprefixer')],
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    })
    config.resolve.modules.push(path.join(process.cwd(), 'node_modules'))
    config.resolve.modules.push(path.join(process.cwd(), 'src'))
    config.resolve.alias.electron = require.resolve('./mocks/electron')
    config.resolve.alias['electron-log'] = require.resolve(
      './mocks/electron-log',
    )
    return config
  },
  typescript: {
    // docgen is incompatible with TS 4.3.x: https://github.com/styleguidist/react-docgen-typescript/issues/356
    reactDocgen: 'none',
  },
}
