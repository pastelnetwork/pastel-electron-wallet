import { Factory } from 'fishery'
import PastelDB from '../database'
import { insertRawMemPoolInfo, TDbRawMemPoolInfo } from './rawMemPoolInfo.repo'

export const rawMemPoolFactory = Factory.define<TDbRawMemPoolInfo>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      insertRawMemPoolInfo(db, params)
      return params
    })

    return {
      id: sequence,
      transactionid: 'transactionid',
      size: 1,
      fee: 1,
      time: 0,
      height: 1000,
      startingpriority: 1,
      currentpriority: 1,
      depends: '',
      createdAt: Date.now() + sequence,
    }
  },
)
