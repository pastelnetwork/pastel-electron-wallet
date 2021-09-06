import { Factory } from 'fishery'
import PastelDB from '../database'
import { insertRawTransaction, TDbRawTransaction } from './rawTransaction.repo'

export const rawTransactionFactory = Factory.define<TDbRawTransaction>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      insertRawTransaction(db, params)
      return params
    })

    return {
      id: sequence,
      hex: 'hex',
      txid: 'txid',
      overwintered: 0,
      version: 1,
      versiongroupid: '',
      locktime: 0,
      expiryheight: 0,
      vin: '',
      vout: '',
      vjoinsplit: '',
      blockhash: '',
      confirmations: 0,
      time: 0,
      blocktime: 0,
      createdAt: Date.now() + sequence,
    }
  },
)
