import { Factory } from 'fishery'
import PastelDB from '../database'
import { insertChainTips, TDbChainTips } from './chainTips.repo'

export const chainTipsFactory = Factory.define<TDbChainTips>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      insertChainTips(db, params)
      return params
    })
    const now: number = Date.now()
    const vSequence: number = sequence
    return {
      id: sequence,
      height: 1,
      hash: '',
      branchlen: 0,
      status: '',
      createdAt: now + vSequence,
    }
  },
)
