import { Factory } from 'fishery'
import PastelDB from '../database'
import { insertBlockSubsidy, TDbBlockSubsidy } from './blockSubsidy.repo'

export const blockSubsidyFactory = Factory.define<TDbBlockSubsidy>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      insertBlockSubsidy(db, params)
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
