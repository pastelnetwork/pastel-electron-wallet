import { Factory } from 'fishery'
import PastelDB from '../database'
import { insertBlockInfo, TDbBlockInfo } from './blockInfo.repo'

export const blockInfoFactory = Factory.define<TDbBlockInfo>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      insertBlockInfo(db, params)
      return params
    })

    return {
      id: sequence,
      hash: '',
      confirmations: 0,
      size: 1,
      height: 1,
      version: 1,
      merkleroot: '',
      finalsaplingroot: '',
      tx: '[]',
      time: 0,
      nonce: '',
      solution: '',
      bits: '0.0',
      difficulty: 0,
      chainwork: '',
      anchor: '',
      valuePools: '',
      previousblockhash: '',
      nextblockhash: '',
      createdAt: Date.now() + sequence,
    }
  },
)
