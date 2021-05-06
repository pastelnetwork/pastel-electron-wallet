import { remote } from 'electron'
import fs from 'fs'
import os from 'os'
import path from 'path'

import {
  TDetailedTxns,
  TListTransactions,
  TSentTxStore,
  TVjoinsplit,
} from './network-stats/type'

const locateSentTxStore = (): string => {
  if (os.platform() === 'darwin') {
    return path.join(remote.app.getPath('appData'), 'Pastel', 'senttxstore.dat')
  }

  if (os.platform() === 'linux') {
    return path.join(
      remote.app.getPath('home'),
      '.local',
      'share',
      'psl-qt-wallet-org',
      'psl-qt-wallet',
      'senttxstore.dat',
    )
  }

  return path.join(remote.app.getPath('appData'), 'Pastel', 'senttxstore.dat')
}

export const loadSentTxns = async (): Promise<TListTransactions | []> => {
  try {
    const sentTx = JSON.parse(
      (await fs.promises.readFile(locateSentTxStore())).toString(),
    )
    return sentTx.map((s: TSentTxStore) => {
      const transction: TListTransactions = new Transaction()
      transction.type = s.type
      transction.amount = s.amount
      transction.address = s.from
      transction.txid = s.txid
      transction.time = s.datetime
      transction.detailedTxns = [new TxDetail()]
      transction.detailedTxns[0].address = s.address
      transction.detailedTxns[0].amount = s.amount
      transction.detailedTxns[0].memo = s.memo
      return transction
    })
  } catch (err) {
    // If error for whatever reason (most likely, file not found), just return an empty array
    return []
  }
}

export class TxDetail {
  address: string
  amount: number
  memo?: string | null

  constructor() {
    this.address = ''
    this.amount = 0
  }
}

export class Transaction {
  account: string
  address: string
  category: string
  amount: number
  vout: number
  confirmations: number
  blockhash: number
  blockindex: number
  blocktime: number
  expiryheight: number
  txid: string
  walletconflicts: string[]
  time: number
  timereceived: number
  vjoinsplit: TVjoinsplit[]
  size: number
  lastblock: string
  fee?: number
  type?: string
  detailedTxns?: TDetailedTxns[]
  inputAddresses?: string[]

  constructor() {
    this.account = ''
    this.address = ''
    this.category = ''
    this.amount = 0
    this.vout = 0
    this.confirmations = 0
    this.blockhash = 0
    this.blockindex = 0
    this.blocktime = 0
    this.expiryheight = 0
    this.txid = ''
    this.walletconflicts = []
    this.time = 0
    this.timereceived = 0
    this.vjoinsplit = []
    this.size = 0
    this.lastblock = ''
  }
}
