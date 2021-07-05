import { ipcRenderer } from 'electron'
import fs from 'fs'
import { TSentTxStore, TTransaction } from 'types/rpc'

export const loadSentTxns = async (): Promise<TTransaction | []> => {
  try {
    let locateSetTxtStorePath = ''
    ipcRenderer.on(
      'app-info',
      (event, { locateSentTxStore }: { locateSentTxStore: string }) => {
        locateSetTxtStorePath = locateSentTxStore
      },
    )
    const sentTx = JSON.parse(
      (await fs.promises.readFile(locateSetTxtStorePath)).toString(),
    )
    return sentTx.map((s: TSentTxStore) => {
      const transction: TTransaction = {
        account: '',
        address: '',
        category: '',
        amount: 0,
        vout: 0,
        confirmations: 0,
        blockhash: 0,
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
