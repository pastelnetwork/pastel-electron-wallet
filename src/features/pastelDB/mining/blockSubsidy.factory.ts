import { Factory } from 'fishery'
import { insertBlocksubsidyQuery, TDbBlockSubsidy } from '../constants'
import PastelDB from '../database'

export const blockSubsidyFactory = Factory.define<TDbBlockSubsidy>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      db.prepare(insertBlocksubsidyQuery).run(params)
      return params
    })

    return {
      id: sequence,
      miner: 0,
      masternode: 0,
      governance: 0,
      createdAt: Date.now() + sequence,
    }
  },
)
