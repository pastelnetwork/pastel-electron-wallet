import { Factory } from 'fishery'
import PastelDB from '../database'
import { insertTxOutSentInfo, TDbTxOutSetInfo } from './txOutSetInfo.repo'

export const txOutSetInfoFactory = Factory.define<TDbTxOutSetInfo>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      insertTxOutSentInfo(db, params)
      return params
    })

    return {
      id: sequence,
      height: 1,
      bestblock: '',
      transactions: 0,
      txouts: 0,
      bytes_serialized: 0,
      hash_serialized: '',
      total_amount: 10,
      createdAt: Date.now() + sequence,
    }
  },
)
