import { Factory } from 'fishery'
import PastelDB from '../database'
import { insertNetTotals, TDbNetTotals } from './netTotals.repo'

export const netTotalsFactory = Factory.define<TDbNetTotals>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      insertNetTotals(db, params)
      return params
    })
    const now: number = Date.now()
    const vSequence: number = sequence
    return {
      id: sequence,
      totalbytesrecv: 0,
      totalbytessent: 0,
      timemillis: 0,
      createdAt: now + vSequence,
    }
  },
)
