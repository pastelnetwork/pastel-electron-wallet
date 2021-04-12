const { result } = require('underscore')
const os = require('os')
const package = require('./package.json')

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
      config: {
        // TODO for some reason, shortcut name and icon doesn't change no matter what settings we use here.
        // It might be a bug of squirrel.windows, because the creation of the shortcut is done through  it, and that's C# code.
        // We need to figure out how to add the proper icon to the shortcut and how to change shortcuts title.
        setupIcon: './static/icons/icon.ico',
        loadingGif: './static/icons/icon.gif',
        iconUrl:
          'https://raw.githubusercontent.com/pastelnetwork/pastel-electron-wallet/master/static/icons/icon.ico',
        title: 'Pastel Wallet Fullnode',
        setupExe: `Pastel Wallet Fullnode Setup - v${package.version}.exe`,
        skipUpdateIcon: true,
      },
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        icon: './static/icons/icon.icns',
        name: 'Pastel Wallet Fullnode',
      },
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: './static/icons/icon.png',
          genericName: 'Wallet',
          productName: 'Pastel Wallet Fullnode',
        },
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
