const os = require('os')

const package = require('./package.json')

function getExtraResource() {
  const platform = process.argv[3] === 'win32' ? 'win32' : os.platform()

  switch (platform) {
    case 'darwin':
      return [
        './static/bin/pastel-utility-darwin-amd64',
        './static/bin/pngquant-mac',
        './static/bin/mozjpeg-mac',
      ]
    case 'linux':
      return [
        './static/bin/pastel-utility-linux-amd64',
        './static/bin/pngquant-linux',
        './static/bin/mozjpeg-linux',
      ]
    case 'win32':
      return [
        './static/bin/pastel-utility-windows-amd64.exe',
        './static/bin/pngquant-win.exe',
        './static/bin/mozjpeg-win.exe',
      ]
    default:
      throw new Error(
        'forge.config.js error: your OS is not supported. Supported OS are: darwin, linux, win32',
      )
  }
}

function getIcon() {
  const p = os.platform()
  switch (p) {
    case 'darwin':
      return './static/icons/icon.icns'
    case 'linux':
      if (process.argv[3] === 'win32') {
        return './static/icons/icon.ico'
      }
      return './static/icons/icon.png'
    case 'win32':
      return './static/icons/icon.ico'
    default:
      throw new Error(
        'forge.config.js error: your OS is not supported. Supported OS are: darwin, linux, win32',
      )
  }
}

module.exports = {
  packagerConfig: {
    name: package.productName,
    executableName: package.name,
    icon: getIcon(),
    asar: true,
    extraResource: getExtraResource(),
    protocols: [
      {
        protocol: package.name,
        name: package.name,
        schemes: [package.protocolSchemes.native],
      },
    ],
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        exe: `${package.name}.exe`,
        authors: package.author.name,
        setupIcon: './static/icons/icon.ico',
        loadingGif: './static/icons/icon.gif',
        iconUrl:
          'https://raw.githubusercontent.com/pastelnetwork/pastel-electron-wallet/master/static/icons/icon.ico',
        title: package.productName,
        setupExe: `${package.productName} Setup - v${package.version}.exe`,
        skipUpdateIcon: true,
      },
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        icon: './static/icons/icon.icns',
        name: package.productName,
      },
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: './static/icons/icon.png',
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
              js: './src/renderer.tsx',
              name: 'main_window',
            },
          ],
        },
      },
    ],
  ],
}
