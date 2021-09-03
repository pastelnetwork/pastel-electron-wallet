import { Factory } from 'fishery'
import { insertTxoutsetinfoQuery, TDbChainTips } from '../constants'
import PastelDB from '../database'

export const chainTipsFactory = Factory.define<TDbChainTips>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      db.prepare(insertTxoutsetinfoQuery).run(params)
      return params
    })

    return {
      id: sequence,
      height: 1,
      hash: '',
      branchlen: 0,
      status: '',
      createdAt: Date.now() + sequence,
    }
  },
)
