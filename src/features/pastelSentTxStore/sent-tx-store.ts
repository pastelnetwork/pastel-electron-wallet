import { remote } from 'electron'
import fs from 'fs'
import os from 'os'
import path from 'path'

import {
  TDetailedTxns,
  TListTransactions,
  TSentTxStore,
  TVjoinsplit,
} from '../pastelDB/type'

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
      const transction: TListTransactions = {
        account: '',
        address: '',
        category: '',
        amount: 0,
        vout: 0,
        confirmations: 0,
        blockhash: 0,
        blockindex: 0,
        blocktime: 0,
        expiryheight: 0,
        txid: '',
        walletconflicts: [],
        time: 0,
        timereceived: 0,
        vjoinsplit: [],
        size: 0,
        lastblock: '',
      }
      transction.type = s.type
      transction.amount = s.amount
      transction.address = s.from
      transction.txid = s.txid
      transction.time = s.datetime
      const detailedTxns: TxDetail[] = [
        {
          address: '',
          amount: 0,
        },
      ]
      transction.detailedTxns = detailedTxns
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

export type TxDetail = {
  address: string
  amount: number
  memo?: string | null
}

export type Transaction = {
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
}
