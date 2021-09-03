import { Factory } from 'fishery'
import { insertStatisticinfoQuery, TDbStatisticInfo } from '../constants'
import PastelDB from '../database'

export const statisticInfoFactory = Factory.define<TDbStatisticInfo>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      db.prepare(insertStatisticinfoQuery).run(params)
      return params
    })

    return {
      id: sequence,
      solutions: 1,
      difficulty: 1.2345678,
      createdAt: Date.now() + sequence,
    }
  },
)
