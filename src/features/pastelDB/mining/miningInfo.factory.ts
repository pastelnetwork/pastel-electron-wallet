import { Factory } from 'fishery'
import PastelDB from '../database'
import { insertMiningInfo, TDbMiningInfo } from './miningInfo.repo'

export const miningInfoFactory = Factory.define<TDbMiningInfo>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      insertMiningInfo(db, params)
      return params
    })

    return {
      id: sequence,
      blocks: 10,
      currentblocksize: 10,
      currentblocktx: 1,
      difficulty: 1,
      errors: '',
      genproclimit: 1,
      localsolps: 0,
      networksolps: 0,
      networkhashps: 0,
      pooledtx: 0,
      testnet: 0,
      chain: '',
      generate: 0,
      createdAt: Date.now() + sequence,
    }
  },
)
