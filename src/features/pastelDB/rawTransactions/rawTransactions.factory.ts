import { Factory } from 'fishery'
import { insertRawtransactionQuery, TDbRawTransaction } from '../constants'
import PastelDB from '../database'

export const rawTransactionsFactory = Factory.define<TDbRawTransaction>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      db.prepare(insertRawtransactionQuery).run(params)
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
