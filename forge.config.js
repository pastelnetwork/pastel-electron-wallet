// const fs = require('fs')
// const path = require('path')
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

function getIcon() {
  const p = os.platform()
  switch (p) {
    case 'darwin':
      return './static/icons/icon.icns'
    case 'linux':
      return './static/icons/icon.png'
    case 'win32':
      return './static/icons/icon.ico'
    default:
      throw new Error(
        'forge.config.js error: your OS is not supported. Supported OS are: darwin, linux, win32',
      )
  }
}

// if (process.env['WINDOWS_CODESIGN_FILE']) {
//   const certPath = path.join(__dirname, 'win-certificate.pfx')
//   const certExists = fs.existsSync(certPath)

//   if (certExists) {
//     process.env['WINDOWS_CODESIGN_FILE'] = certPath
//   }
// }

module.exports = {
  packagerConfig: {
    name: package.productName,
    executableName: package.name,
    icon: getIcon(),
    asar: true,
    extraResource: getExtraResource(),
    // osxSign: {
    //   identity: 'Developer ID Application: Felix Rieseberg (LT94ZKYDCJ)',
    //   'hardened-runtime': true,
    //   entitlements: 'static/entitlements.plist',
    //   'entitlements-inherit': 'static/entitlements.plist',
    //   'signature-flags': 'library',
    // },
    // osxNotarize: {
    //   appleId: 'felix@felix.fun',
    //   appleIdPassword: 'my-apple-id-password',
    // },
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: arch => {
        // const certificateFile = process.env.CI
        //   ? path.join(__dirname, 'cert.p12')
        //   : process.env.WINDOWS_CERTIFICATE_FILE

        // if (!certificateFile || !fs.existsSync(certificateFile)) {
        //   console.warn(
        //     `Warning: Could not find certificate file at ${certificateFile}`,
        //   )
        // }

        return {
          exe: `${package.name}.exe`,
          setupIcon: './static/icons/icon.ico',
          loadingGif: './static/icons/icon.gif',
          iconUrl:
            'https://raw.githubusercontent.com/pastelnetwork/pastel-electron-wallet/master/static/icons/icon.ico',
          title: package.productName,
          setupExe: `${package.productName} Setup - v${package.version}.exe`,
          skipUpdateIcon: true,
          // certificateFile: process.env['WINDOWS_CODESIGN_FILE'],
          // certificatePassword: process.env['WINDOWS_CODESIGN_PASSWORD'],
        }
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
