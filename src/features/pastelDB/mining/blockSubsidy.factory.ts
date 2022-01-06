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
    const now: number = Date.now()
    const vSequence: number = sequence
    return {
      id: sequence,
      miner: 0,
      masternode: 0,
      governance: 0,
      createdAt: now + vSequence,
    }
  },
)
