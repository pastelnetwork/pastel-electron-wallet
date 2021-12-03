import { Factory } from 'fishery'
import PastelDB from '../database'
import { insertPriceInfo, TDbPriceInfo } from './priceInfo.repo'

export const priceInfoFactory = Factory.define<TDbPriceInfo>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      insertPriceInfo(db, params)
      return params
    })
    const now: number = Date.now()
    const vSequence: number = sequence
    return {
      id: sequence,
      priceUsd: 0,
      createdAt: now + vSequence,
    }
  },
)
