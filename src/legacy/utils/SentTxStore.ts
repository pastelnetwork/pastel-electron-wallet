/* eslint-disable */

import fs from 'fs'
import { Transaction, TxDetail } from '../components/AppState'
import store from '../../redux/store'

export default class SentTxStore {
  static locateSentTxStore() {
    const path = store.getState().appInfo.sentTxStorePath
    if (!path) {
      throw new Error(`Can't get file path of sent tx store`)
    }
    return path
  }

  static async loadSentTxns() {
    try {
      const sentTx = JSON.parse(
        (await fs.promises.readFile(SentTxStore.locateSentTxStore())) as any,
      )
      return sentTx.map((s: any) => {
        const transction: any = new Transaction()
        transction.type = s.type
        transction.amount = s.amount
        transction.address = s.from
        transction.txid = s.txid
        transction.time = s.datetime
        transction.detailedTxns = [new TxDetail()]
        transction.detailedTxns[0].address = s.address
        transction.detailedTxns[0].amount = s.amount
        transction.detailedTxns[0].memo = s.memo
        return transction
      })
    } catch (err) {
      // If error for whatever reason (most likely, file not found), just return an empty array
      return []
    }
  }
}
