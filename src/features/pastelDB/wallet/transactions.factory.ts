import { Factory } from 'fishery'
import PastelDB from '../database'
import { insertTransaction, TDbTransaction } from './transactions.repo'

export const transactionsFactory = Factory.define<TDbTransaction>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      insertTransaction(db, {
        ...params,
        walletconflicts: params.walletconflicts
          ? JSON.parse(params.walletconflicts)
          : [],
        vjoinsplit: params.vjoinsplit ? JSON.parse(params.vjoinsplit) : [],
      })
      return params
    })
    const now: number = Date.now()
    const vSequence: number = sequence
    return {
      id: sequence,
      account: '',
      address: '',
      category: '',
      amount: 0,
      vout: 0,
      fee: 0,
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
      createdAt: now + vSequence,
    }
  },
)
