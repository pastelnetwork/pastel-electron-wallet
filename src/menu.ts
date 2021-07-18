/* eslint-disable */

import { app, Menu, shell, BrowserWindow } from 'electron'
export default class MenuBuilder {
  constructor(public mainWindow: any) {}

  buildMenu() {
    // if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    //   // this.setupDevelopmentEnvironment();
    // }
    const template: any =
      process.platform === 'darwin'
        ? this.buildDarwinTemplate()
        : this.buildDefaultTemplate()
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
    const selectionMenu = Menu.buildFromTemplate([
      {
        role: 'copy',
      },
      {
        type: 'separator',
      },
      {
        role: 'selectall' as any,
      },
    ])
    const inputMenu = Menu.buildFromTemplate([
      {
        role: 'undo',
      },
      {
        role: 'redo',
      },
      {
        type: 'separator',
      },
      {
        role: 'cut',
      },
      {
        role: 'copy',
      },
      {
        role: 'paste',
      },
      {
        type: 'separator',
      },
      {
        role: 'selectall' as any,
      },
    ])
    this.mainWindow.webContents.on('context-menu', (e: any, props: any) => {
      const { selectionText, isEditable } = props

      if (isEditable) {
        inputMenu.popup(this.mainWindow)
      } else if (selectionText && selectionText.trim() !== '') {
        selectionMenu.popup(this.mainWindow)
      } else if (
        process.env.NODE_ENV === 'development' ||
        process.env.DEBUG_PROD === 'true'
      ) {
        const { x, y } = props
        Menu.buildFromTemplate([
          {
            label: 'Inspect element',
            click: () => {
              this.mainWindow.inspectElement(x, y)
            },
          },
        ]).popup(this.mainWindow)
      }
    })
    return menu
  }

  buildDarwinTemplate() {
    const { mainWindow } = this
    const subMenuAbout = {
      label: 'Pastelwallet Fullnode',
      submenu: [
        {
          label: 'About Pastelwallet Fullnode',
          selector: 'orderFrontStandardAboutPanel:',
          click: () => {
            mainWindow.webContents.send('about')
          },
        },
        {
          type: 'separator',
        },
        {
          label: 'Services',
          submenu: [] as any,
        },
        {
          type: 'separator',
        },
        {
          label: 'Hide Pastelwallet Fullnode',
          accelerator: 'Command+H',
          selector: 'hide:',
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:',
        },
        {
          label: 'Show All',
          selector: 'unhideAllApplications:',
        },
        {
          type: 'separator',
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => {
            app.quit()
          },
        },
      ],
    }
    const subMenuFile = {
      label: 'File',
      submenu: [
        {
          label: '&Pay URI',
          accelerator: 'Ctrl+P',
          click: () => {
            mainWindow.webContents.send('payuri')
          },
        },
        {
          label: '&Import Private Keys',
          click: () => {
            mainWindow.webContents.send('import')
          },
        },
        {
          label: '&Import ANI Private Keys',
          click: () => {
            mainWindow.webContents.send('importani')
          },
        },
        {
          label: '&Export All Private Keys',
          click: () => {
            mainWindow.webContents.send('exportall')
          },
        },
        {
          type: 'separator',
        },
        {
          label: 'Export All &Transactions',
          click: () => {
            mainWindow.webContents.send('exportalltx')
          },
        },
      ],
    }
    const subMenuEdit = {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'Command+Z',
          selector: 'undo:',
        },
        {
          label: 'Redo',
          accelerator: 'Shift+Command+Z',
          selector: 'redo:',
        },
        {
          type: 'separator',
        },
        {
          label: 'Cut',
          accelerator: 'Command+X',
          selector: 'cut:',
        },
        {
          label: 'Copy',
          accelerator: 'Command+C',
          selector: 'copy:',
        },
        {
          label: 'Paste',
          accelerator: 'Command+V',
          selector: 'paste:',
        },
        {
          label: 'Select All',
          accelerator: 'Command+A',
          selector: 'selectAll:',
        },
      ],
    }
    const subMenuViewDev = {
      label: 'View',
      submenu: [
        {
          label: 'pasteld info',
          click: () => {
            this.mainWindow.webContents.send('pasteld')
          },
        },
        {
          type: 'separator',
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'Alt+Command+I',
          click: () => {
            this.mainWindow.toggleDevTools()
          },
        },
      ],
    }
    const subMenuViewProd = {
      label: 'View',
      submenu: [
        {
          label: 'pasteld info',
          click: () => {
            this.mainWindow.webContents.send('pasteld')
          },
        },
      ],
    }
    const subMenuWindow = {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:',
        },
        {
          label: 'Close',
          accelerator: 'Command+W',
          selector: 'performClose:',
        },
        {
          type: 'separator',
        },
        {
          label: 'Bring All to Front',
          selector: 'arrangeInFront:',
        },
      ],
    }
    const subMenuHelp = {
      label: 'Help',
      submenu: [
        {
          label: 'Pastel Wiki',
          click: () => {
            shell.openExternal('http://pastel.wiki/')
          },
        },
        {
          label: 'Pastel Explorer',
          click: () => {
            shell.openExternal('https://explorer.pastel.network')
          },
        },
        {
          label: 'Pastel Frequently Asked Questions',
          click: () => {
            shell.openExternal(
              'https://github.com/pastelnetwork/community/blob/main/Pastel_Frequently_Asked_Questions.md',
            )
          },
        },
        {
          label: 'Report GitHub Issue',
          click: () => {
            shell.openExternal(
              'https://github.com/pastelnetwork/pastel-electron-wallet/issues',
            )
          },
        },
        {
          type: 'separator',
        },
        {
          label: 'Original 2018 Whitepaper',
          click: () => {
            shell.openExternal('http://bit.ly/Pastel_Original_Whitepaper')
          },
        },
        {
          label: 'Pastel Coingecko Page',
          click: () => {
            shell.openExternal('https://www.coingecko.com/en/coins/pastel')
          },
        },
        {
          type: 'separator',
        },
        {
          label: 'Telegram Group',
          click: () => {
            shell.openExternal('https://t.me/PastelNetwork')
          },
        },
        {
          label: 'Instagram Account',
          click: () => {
            shell.openExternal('https://instagram.com/pastelnetworkofficial')
          },
        },
        {
          label: 'Twitter Account',
          click: () => {
            shell.openExternal('https://twitter.com/PastelNetwork')
          },
        },
        {
          type: 'separator',
        },
        {
          label: 'About Pastelwallet Fullnode',
          click: () => {
            mainWindow.webContents.send('about')
          },
        },
      ],
    }
    const subMenuMiscTools = {
      label: 'Misc Tools',
      submenu: [
        {
          label: 'Spritemate',
          click: () => {
            this.mainWindow.webContents.send('pastelSpriteEditorTool')
          },
        },
        {
          label: 'Photopea',
          click: () => {
            this.mainWindow.webContents.send('pastelPhotopea')
          },
        },
        {
          label: 'Squoosh',
          click: () => {
            this.mainWindow.webContents.send('squooshTool')
          },
        },
        {
          label: 'Glitch Transform Image',
          click: () => {
            this.mainWindow.webContents.send('glitchImage')
          },
        },
      ],
    }
    const subMenuView =
      process.env.NODE_ENV === 'development' ? subMenuViewDev : subMenuViewProd
    return [
      subMenuAbout,
      subMenuFile,
      subMenuEdit,
      subMenuView,
      subMenuMiscTools,
      subMenuWindow,
      subMenuHelp,
    ]
  }

  buildDefaultTemplate() {
    const { mainWindow } = this
    const templateDefault = [
      {
        label: '&File',
        submenu: [
          {
            label: '&Pay URI',
            accelerator: 'Ctrl+P',
            click: () => {
              mainWindow.webContents.send('payuri')
            },
          },
          {
            label: '&Import Private Keys...',
            click: () => {
              mainWindow.webContents.send('import')
            },
          },
          {
            label: '&Import ANI Private Keys...',
            click: () => {
              mainWindow.webContents.send('importani')
            },
          },
          {
            label: '&Export All Private Keys',
            click: () => {
              mainWindow.webContents.send('exportall')
            },
          },
          {
            type: 'separator',
          },
          {
            label: 'Export All &Transactions',
            click: () => {
              mainWindow.webContents.send('exportalltx')
            },
          },
          {
            label: '&Close',
            accelerator: 'Ctrl+W',
            click: () => {
              this.mainWindow.close()
            },
          },
        ],
      },
      {
        label: '&View',
        submenu: [
          // {
          //   label: 'Toggle &Developer Tools',
          //   accelerator: 'Alt+Ctrl+I',
          //   click: () => {
          //     this.mainWindow.toggleDevTools();
          //   }
          // },
          {
            label: 'pasteld info',
            click: () => {
              this.mainWindow.webContents.send('pasteld')
            },
          },
        ],
      },
      {
        label: 'Misc Tools',
        submenu: [
          {
            label: 'Spritemate',
            click: () => {
              this.mainWindow.webContents.send('pastelSpriteEditorTool')
            },
          },
          {
            label: 'Photopea',
            click: () => {
              this.mainWindow.webContents.send('pastelPhotopea')
            },
          },
          {
            label: 'Squoosh',
            click: () => {
              this.mainWindow.webContents.send('squooshTool')
            },
          },
          {
            label: 'Glitch Transform Image',
            click: () => {
              this.mainWindow.webContents.send('glitchImage')
            },
          },
        ],
      },
      {
        label: 'Help',
        submenu: [
          {
            label: 'Pastel Wiki',
            click: () => {
              shell.openExternal('http://pastel.wiki/')
            },
          },
          {
            label: 'Pastel Explorer',
            click: () => {
              shell.openExternal('https://explorer.pastel.network')
            },
          },
          {
            label: 'Pastel Frequently Asked Questions',
            click: () => {
              shell.openExternal(
                'https://github.com/pastelnetwork/community/blob/main/Pastel_Frequently_Asked_Questions.md',
              )
            },
          },
          {
            label: 'Report GitHub Issue',
            click: () => {
              shell.openExternal(
                'https://github.com/pastelnetwork/pastel-electron-wallet/issues',
              )
            },
          },
          {
            type: 'separator',
          },
          {
            label: 'Original 2018 Whitepaper',
            click: () => {
              shell.openExternal('http://bit.ly/Pastel_Original_Whitepaper')
            },
          },
          {
            label: 'Pastel Coingecko Page',
            click: () => {
              shell.openExternal('https://www.coingecko.com/en/coins/pastel')
            },
          },
          {
            type: 'separator',
          },
          {
            label: 'Telegram Group',
            click: () => {
              shell.openExternal('https://t.me/PastelNetwork')
            },
          },
          {
            label: 'Instagram Account',
            click: () => {
              shell.openExternal('https://instagram.com/pastelnetworkofficial')
            },
          },
          {
            label: 'Twitter Account',
            click: () => {
              shell.openExternal('https://twitter.com/PastelNetwork')
            },
          },
          {
            type: 'separator',
          },
          {
            label: 'About Pastelwallet Fullnode',
            click: () => {
              mainWindow.webContents.send('about')
            },
          },
        ],
      },
    ]
    return templateDefault
  }
}
