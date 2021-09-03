import { Factory } from 'fishery'
import { insertTransactionTableQuery, TDbListUnspent } from '../constants'
import PastelDB from '../database'

export const listUnspentFactory = Factory.define<TDbListUnspent>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      db.prepare(insertTransactionTableQuery).run(params)
      return params
    })

    return {
      id: sequence,
      txid: 'txid',
      vout: 0,
      generated: 0,
      address: 'address',
      account: 'account',
      scriptPubKey: 'scriptPubKey',
      amount: 0,
      confirmations: 0,
      spendable: 0,
      createdAt: Date.now() + sequence,
    }
  },
)
