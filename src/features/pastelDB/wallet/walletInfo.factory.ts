import { Factory } from 'fishery'
import PastelDB from '../database'
import { insertWalletInfo, TDbWalletInfo } from './walletInfo.repo'

export const walletInfoFactory = Factory.define<TDbWalletInfo>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      insertWalletInfo(db, params)
      return params
    })
    const now: number = Date.now()
    const vSequence: number = sequence
    return {
      id: sequence,
      walletversion: 1,
      balance: 0,
      unconfirmed_balance: 0,
      immature_balance: 0,
      txcount: 0,
      keypoololdest: 0,
      keypoolsize: 0,
      paytxfee: 0,
      seedfp: '',
      createdAt: now + vSequence,
    }
  },
)
