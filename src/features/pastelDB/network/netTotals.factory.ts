import { Factory } from 'fishery'
import { insertNettotalsQuery, TDbNetTotals } from '../constants'
import PastelDB from '../database'

export const netTotalsFactory = Factory.define<TDbNetTotals>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      db.prepare(insertNettotalsQuery).run(params)

      return params
    })

    return {
      id: sequence,
      totalbytesrecv: 0,
      totalbytessent: 0,
      timemillis: 0,
      createdAt: Date.now() + sequence,
    }
  },
)
