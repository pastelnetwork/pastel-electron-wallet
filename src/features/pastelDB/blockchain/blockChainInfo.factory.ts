import { Factory } from 'fishery'
import PastelDB from '../database'
import { insertBlockChainInfo, TDbBlockChainInfo } from './blockChainInfo.repo'

export const blockChainInfoFactory = Factory.define<TDbBlockChainInfo>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      insertBlockChainInfo(db, params)
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
