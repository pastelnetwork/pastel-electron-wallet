import { Factory } from 'fishery'
import PastelDB from '../database'
import { insertMemPoolInfo, TDbMemPoolInfo } from './memPoolInfo.repo'

export const memPoolInfoFactory = Factory.define<TDbMemPoolInfo>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      insertMemPoolInfo(db, params)
      return params
    })

    return {
      id: sequence,
      size: 0,
      bytes: 0,
      usage: 0,
      createdAt: Date.now() + sequence,
    }
  },
)
