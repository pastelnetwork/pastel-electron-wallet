import { Factory } from 'fishery'
import { insertTotalbalanceQuery, TDbTotalBalance } from '../constants'
import PastelDB from '../database'

export const totalBalanceFactory = Factory.define<TDbTotalBalance>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      db.prepare(insertTotalbalanceQuery).run(params)
      return params
    })

    return {
      id: sequence,
      transparent: 'transparent',
      private: 'private',
      total: 'total',
      createdAt: Date.now() + sequence,
    }
  },
)
