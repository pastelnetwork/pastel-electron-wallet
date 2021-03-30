const { result } = require('underscore')
const os = require('os')

function getExtraResource() {
  const p = os.platform()
  switch (p) {
    case 'darwin':
      return ['./static/bin/pasteld-mac']
    case 'linux':
      return ['./static/bin/pasteld-linux']
    case 'win32':
      return ['./static/bin/pasteld-win.exe']
    default:
      throw new Error(
        'forge.config.js error: your OS is not supported. Supported OS are: darwin, linux, win32',
      )
  }
}

module.exports = {
  packagerConfig: {
    name: 'pastelwallet',
    asar: true,
    extraResource: getExtraResource(),
  },
  makers: [
    {
      name: '@electron-forge/maker-zip',
    },
    {
      name: '@electron-forge/maker-squirrel',
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        'icon:': './static/icons/icon.icns',
      },
    },
    {
      name: '@electron-forge/maker-deb',
      options: {
        icon: './static/icons/icon.png',
      },
    },
  ],
  plugins: [
    [
      '@electron-forge/plugin-webpack',
      {
        mainConfig: './webpack.main.config.js',
        renderer: {
          config: './webpack.renderer.config.js',
          entryPoints: [
            {
              html: './src/index.html',
              js: './src/renderer.ts',
              name: 'main_window',
            },
          ],
        },
      },
    ],
  ],
}
