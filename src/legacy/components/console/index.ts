import './styles.css'
import terminal from './terminal'

interface IContact {
  email: string;
  twitter: string;
  github: string;
}

type ContactKey = 'email' | 'twitter' | 'github'

// Banner text
// Note: \u2800 is the invisible character to keep the padding correct
const banner = `
...........................................................................

██████╗  █████╗ ███████╗████████╗███████╗██╗     \u2800
██╔══██╗██╔══██╗██╔════╝╚══██╔══╝██╔════╝██║     \u2800
██████╔╝███████║███████╗   ██║   █████╗  ██║     \u2800
██╔═══╝ ██╔══██║╚════██║   ██║   ██╔══╝  ██║     \u2800
██║     ██║  ██║███████║   ██║   ███████╗███████╗\u2800
╚═╝     ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝╚══════╝\u2800

...........................................................................

-----------------------------------------------------------------------------
Type 'help' for a list of available commands.

`

// Help text
const helpText = `
Available commands:

help - This output
clear - To clear the console
getBalance - Prints Total Balance
getAddressWithBal - Prints Address With Balance
getTxDetail - Prints Txt Details
getInfo - Prints all Information
getTransaction - Prints Transactions
getConnectedCompanionApp - Prints Connected Companion App
getPastelId - Prints PastelId
`

// Contact texts
const contactInfo: any = {
  email: 'andersevenrud@gmail.com',
  twitter: 'https://twitter.com/andersevenrud',
  github: 'https://github.com/andersevenrud',
}

const contactList = Object.keys(contactInfo)
  .reduce((result: any, key: any) => result.concat([`${key} - ${contactInfo[key]}`]), [])
  .join('\n')

const contactText = `
Created by Anders Evenrud

${contactList}

Use ex. 'contact twitter' to open the links.
`

const openContact = (key: ContactKey) =>
  window.open(key === 'email' ? `mailto:${contactInfo[key]}` : contactInfo[key])

// File browser
const browser = (() => {
  let current = '/'

  const tree = [
    {
      location: '/',
      filename: 'documents',
      type: 'directory',
    },
    {
      location: '/',
      filename: 'AUTHOR',
      type: 'file',
      content: 'Anders Evenrud <andersevenrud@gmail.com>',
    },
  ]

  const fix = (str: string) => str.trim().replace(/\/+/g, '/') || '/'

  const setCurrent = (dir?: string) => {
    if (typeof dir !== 'undefined') {
      if (dir === '..') {
        const parts = current.split('/')
        parts.pop()
        current = fix(parts.join('/'))
      } else {
        const found = tree
          .filter(iter => iter.location === current)
          .find(iter => iter.filename === fix(dir))

        if (found) {
          current = fix(`${current}/${dir}`)
        } else {
          return `Directory '${dir}' not found in '${current}'`
        }
      }

      return `Entered '${current}'`
    }

    return current
  }

  const ls = () => {
    const found = tree.filter(iter => iter.location === current)
    const fileCount = found.filter(iter => iter.type === 'file').length
    const directoryCount = found.filter(iter => iter.type === 'directory')
      .length
    const status = `${fileCount} file(s), ${directoryCount} dir(s)`
    const maxlen = Math.max(
      ...found.map(iter => iter.filename).map(n => n.length),
    )

    const list = found
      .map(iter => {
        return `${iter.filename.padEnd(maxlen + 1, ' ')} <${iter.type}>`
      })
      .join('\n')

    return `${list}\n\n${status} in ${current}`
  }

  const cat = (filename: string) => {
    const found = tree.filter(iter => iter.location === current)
    const foundFile = found.find(iter => iter.filename === filename)

    if (foundFile) {
      return foundFile.content
    }

    return `File '${filename}' not found in '${current}'`
  }

  // getbalance
  const getBalance = (rpcCmd: any) => {
    return rpcCmd().getBalance()
  }
  // getAddressWithBalance
  const getAddressesWithBalance = (rpcCmd: any) => {
    const addressVal = rpcCmd().getAddressesWithBalance()
    return `ADDRESS: ${addressVal.address}\nBALANCE: ${addressVal.bal}`
  }
  // getTxDetail
  const getTxDetail = (rpcCmd: any) => {
    return rpcCmd().getTxDetail()
  }
  // Get Info
  const getInfo = (rpcCmd: any) => {
    const infoVal = rpcCmd().getInfo()
    return `
      CURRENCY NAME: ${infoVal.currencyName}
      LATEST BLOCK: ${infoVal.latestBlock}
      CONNECTIONS: ${infoVal.connections}
      VERSION: ${infoVal.version}
      VERIFICATION PROCESS: ${infoVal.verificationProgress}
      SOLPS: ${infoVal.solps}
      PSL PRICE: ${infoVal.pslPrice}
      DISCONNECTED: ${infoVal.disconnected}
    `
  }
  // Get Transaction
  const getTransaction = (rpcCmd: any) => {
    const transactionVal = rpcCmd().getTransaction()
    console.log(transactionVal)
    return `
      TRANSACTION ID : ${transactionVal.txid}
      ADDRESS : ${transactionVal.address}
      TYPE : ${transactionVal.type}
      AMOUNT : ${transactionVal.amount}
      CONFIRMATIONS : ${transactionVal.confirmations}
      FEE : ${transactionVal.fee}
      TIME : ${transactionVal.time}
    `
  }
  // Get Connected Companion APP
  const getConnectedCompanionApp = (rpcCmd: any) => {
    return rpcCmd().getConnectedCompanionApp()
  }
  // Get Pastel Id
  const getPastelId = (rpcCmd: any) => {
    return rpcCmd().getPastelId()
  }

  return {
    cwd: () => setCurrent(),
    cd: (dir: string) => setCurrent(fix(dir)),
    cat,
    ls,
    getBalance,
    getAddressesWithBalance,
    getTxDetail,
    getInfo,
    getTransaction,
    getConnectedCompanionApp,
    getPastelId,
  }
})()

/// ////////////////////////////////////////////////////////////////////////////
// MAIN
/// ////////////////////////////////////////////////////////////////////////////

const load = (rpcCmd: any) => {
  const t = terminal({
    prompt: () => `$ ${browser.cwd()} > `,
    banner,
    commands: {
      help: () => helpText,
      cwd: () => browser.cwd(),
      cd: (dir: string) => browser.cd(dir),
      ls: () => browser.ls(),
      cat: (file: string) => browser.cat(file),
      clear: () => t.clear(),
      getBalance: () => browser.getBalance(rpcCmd),
      getAddressWithBal: () => browser.getAddressesWithBalance(rpcCmd),
      getTxDetail: () => browser.getTxDetail(rpcCmd),
      getInfo: () => browser.getInfo(rpcCmd),
      getTransaction: () => browser.getTransaction(rpcCmd),
      getConnectedCompanionApp: () => browser.getConnectedCompanionApp(rpcCmd),
      getPastelId: () => browser.getPastelId(rpcCmd),
      contact: (key: ContactKey) => {
        if (key in contactInfo) {
          openContact(key)
          return `Opening ${key} - ${contactInfo[key]}`
        }

        return contactText
      },
    },
  })
}

export default load
