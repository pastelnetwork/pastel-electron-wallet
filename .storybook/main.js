const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-css-modules-preset',
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
    return config
  },
  typescript: {
    // docgen is incompatible with TS 4.3.x: https://github.com/styleguidist/react-docgen-typescript/issues/356
    reactDocgen: 'none',
  },
  babel: async options => ({
    ...options,

    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-optional-chaining',
    ],
  }),
}
