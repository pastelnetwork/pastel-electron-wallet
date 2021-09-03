import { Factory } from 'fishery'
import { insertPastelPriceInfoQuery, TDbPriceInfo } from '../constants'
import PastelDB from '../database'

export const priceInfoFactory = Factory.define<TDbPriceInfo>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      db.prepare(insertPastelPriceInfoQuery).run(params)
      return params
    })

    return {
      id: sequence,
      priceUsd: 0,
      createdAt: Date.now() + sequence,
    }
  },
)
