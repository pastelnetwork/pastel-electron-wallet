import { Factory } from 'fishery'
import { insertBlockChainInfoQuery, TDbBlockChainInfo } from '../constants'
import PastelDB from '../database'

export const blockChainInfoFactory = Factory.define<TDbBlockChainInfo>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      db.prepare(insertBlockChainInfoQuery).run(params)
      return params
    })

    return {
      id: sequence,
      bestblockhash: '',
      blocks: 0,
      chain: '',
      chainwork: '',
      commitments: 0,
      consensus: '',
      difficulty: 0,
      headers: 0,
      pruned: 0,
      softforks: '',
      upgrades: '',
      valuePools: '',
      verificationprogress: 0,
      createdAt: Date.now() + sequence,
    }
  },
)
