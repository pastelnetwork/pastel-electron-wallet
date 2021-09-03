import { Factory } from 'fishery'
import { insertMempoolinfoQuery, TDbMemPoolInfo } from '../constants'
import PastelDB from '../database'

export const memPoolInfoFactory = Factory.define<TDbMemPoolInfo>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      db.prepare(insertMempoolinfoQuery).run(params)
      return params
    })

    return {
      id: sequence,
      size: 0,
      bytes: 0,
      usage: 0,
      createdAt: Date.now() + sequence,
    }
  },
)
