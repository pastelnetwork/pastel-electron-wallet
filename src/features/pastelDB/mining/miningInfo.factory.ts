import { Factory } from 'fishery'
import { insertMininginfoQuery, TDbMiningInfo } from '../constants'
import PastelDB from '../database'

export const miningInfoFactory = Factory.define<TDbMiningInfo>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      db.prepare(insertMininginfoQuery).run(params)
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
      createdAt: Date.now() + sequence,
    }
  },
)
