import { Factory } from 'fishery'
import PastelDB from '../database'
import { insertStatisticInfo, TDbStatisticInfo } from './statisticInfo.repo'

export const statisticInfoFactory = Factory.define<TDbStatisticInfo>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      insertStatisticInfo(db, params)
      return params
    })
    const now: number = Date.now()
    const vSequence: number = sequence
    return {
      id: sequence,
      solutions: 1,
      difficulty: 1.2345678,
      createdAt: now + vSequence,
    }
  },
)
