import { Factory } from 'fishery'
import { insertRawmempoolinfoQuery, TDbRawMemPoolInfo } from '../constants'
import PastelDB from '../database'

export const rawMemPoolFactory = Factory.define<TDbRawMemPoolInfo>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      db.prepare(insertRawmempoolinfoQuery).run(params)
      return params
    })

    return {
      id: sequence,
      transactionid: 'transactionid',
      size: 1,
      fee: 1,
      time: 0,
      height: 1000,
      startingpriority: 1,
      currentpriority: 1,
      depends: '',
      createdAt: Date.now() + sequence,
    }
  },
)
