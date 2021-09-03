import { Factory } from 'fishery'
import { insertTransactionTableQuery } from '../constants'
import PastelDB from '../database'
import { TDbListTransaction } from './listTransaction.repo'

export const listTransactionFactory = Factory.define<TDbListTransaction>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      db.prepare(insertTransactionTableQuery).run(params)
      return params
    })

    return {
      id: sequence,
      account: '',
      address: '',
      category: '',
      amount: 0,
      vout: 0,
      confirmations: 0,
      blockhash: '',
      blockindex: 0,
      blocktime: 0,
      expiryheight: 0,
      txid: '',
      walletconflicts: '',
      time: 0,
      timereceived: 0,
      vjoinsplit: '',
      size: 0,
      createdAt: Date.now() + sequence,
    }
  },
)
