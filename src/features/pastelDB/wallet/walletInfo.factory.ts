import { Factory } from 'fishery'
import { insertWalletinfoQuery, TDbWalletInfo } from '../constants'
import PastelDB from '../database'

export const walletInfoFactory = Factory.define<TDbWalletInfo>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      db.prepare(insertWalletinfoQuery).run(params)
      return params
    })

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
      createdAt: Date.now() + sequence,
    }
  },
)
