import { Factory } from 'fishery'
import PastelDB from '../database'
import { insertTotalBalance, TDbTotalBalance } from './totalBalance.repo'

export const totalBalanceFactory = Factory.define<TDbTotalBalance>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      insertTotalBalance(db, params)
      return params
    })
    const now: number = Date.now()
    const vSequence: number = sequence
    return {
      id: sequence,
      transparent: 'transparent',
      private: 'private',
      total: 'total',
      createdAt: now + vSequence,
    }
  },
)
