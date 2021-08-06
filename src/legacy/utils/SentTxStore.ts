/* eslint-disable */

import fs from 'fs'
import { Transaction, TxDetail } from '../components/AppState'
import { sentTxStorePath } from '../../common/utils/app'
export default class SentTxStore {
  static async loadSentTxns() {
    try {
      const sentTx = JSON.parse(
        (await fs.promises.readFile(sentTxStorePath)) as any,
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
