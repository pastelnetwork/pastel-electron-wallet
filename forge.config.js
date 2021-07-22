const os = require('os')
const path = require('path')
const fs = require('fs')

const package = require('./package.json')

function getExtraResource() {
  const p = os.platform()
  switch (p) {
    case 'darwin':
      return ['./static/bin/pasteld-mac']
    case 'linux':
      if (process.argv[3] === 'win32') {
        return ['./static/bin/pasteld-win.exe']
      }
      return ['./static/bin/pasteld-linux']
    case 'win32':
      return ['./static/bin/pasteld-win.exe']
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

let certificateFile = ''
if (process.env['WINDOWS_CODESIGN_FILE']) {
  certificateFile = path.join(
    __dirname,
    'certificates',
    process.env['WINDOWS_CODESIGN_FILE'],
  )
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
      config: () => {
        const configs = {
          exe: `${package.name}.exe`,
          authors: package.author.name,
          setupIcon: './static/icons/icon.ico',
          loadingGif: './static/icons/icon.gif',
          iconUrl:
            'https://raw.githubusercontent.com/pastelnetwork/pastel-electron-wallet/master/static/icons/icon.ico',
          title: package.productName,
          setupExe: `${package.productName} Setup - v${package.version}.exe`,
          skipUpdateIcon: true,
        }

        if (certificateFile && fs.existsSync(certificateFile)) {
          configs.certificateFile = certificateFile
          configs.certificatePassword = process.env['WINDOWS_CODESIGN_PASSWORD']
        }

        return configs
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
