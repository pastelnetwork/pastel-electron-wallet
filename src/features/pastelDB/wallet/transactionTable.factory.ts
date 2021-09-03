import { Factory } from 'fishery'
import { insertTransactionTableQuery, TDbTransactionTbl } from '../constants'
import PastelDB from '../database'

export const transactionTableFactory = Factory.define<TDbTransactionTbl>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      db.prepare(insertTransactionTableQuery).run(params)
      return params
    })

    return {
      id: sequence,
      amount: 1,
      blockhash: '',
      blockindex: 1,
      blocktime: 0,
      confirmations: 0,
      details: '',
      expiryheight: 1,
      hex: 'hex',
      time: 0,
      timereceived: 0,
      txid: 'txid',
      vjoinsplit: '',
      walletconflicts: '',
      createdAt: Date.now() + sequence,
    }
  },
)
