import fs from 'fs'
import { TSentTxStore, TTransaction } from 'types/rpc'
import store from '../../redux/store'

export const loadSentTxns = async (): Promise<TTransaction | []> => {
  const { sentTxStorePath } = store.getState().appInfo
  if (!sentTxStorePath) {
    throw new Error("Can't get path of sent tx store")
  }

  try {
    const sentTx = JSON.parse(
      (await fs.promises.readFile(sentTxStorePath)).toString(),
    )

    return sentTx.map((s: TSentTxStore) => {
      const transction: TTransaction = {
        account: '',
        address: '',
        category: '',
        amount: 0,
        vout: 0,
        confirmations: 0,
        blockhash: '',
        blockindex: 0,
        blocktime: 0,
        expiryheight: 0,
        txid: '',
        walletconflicts: [],
        time: 0,
        timereceived: 0,
        vjoinsplit: [],
        size: 0,
        lastblock: '',
      }
      transction.type = s.type
      transction.amount = s.amount
      transction.address = s.from
      transction.txid = s.txid
      transction.time = s.datetime
      transction.detailedTxns = [
        {
          address: '',
          amount: 0,
        },
      ]
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
