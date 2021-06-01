import { remote } from 'electron'
import fs from 'fs'
import os from 'os'
import path from 'path'

import {
  IBaseTransaction,
  IJsonRPCParam,
  ITDetailedTxns,
  ITRawTransactionResponse,
  ITSentTxStore,
  ITTransactionDetail,
  ITTransactionInfoResponse,
  ITTransactionResponse,
  ITTransactionResult,
  ITVin,
  ITZListReceivedByAddressResponse,
  ITZListReceivedByAddressResult,
} from '../../types/rpc'
import { mapTxnsResult, parseMemo, sortTxnsResult } from '../helpers'
import { rpc, TRPCConfig } from './rpc'
import { WalletRPC } from './wallet'

export class TransactionRPC {
  private readonly walletRPC: WalletRPC

  constructor(private readonly config: TRPCConfig) {
    this.walletRPC = new WalletRPC(this.config)
  }

  locateSentTxStore(): string {
    if (os.platform() === 'darwin') {
      return path.join(
        remote.app.getPath('appData'),
        'Pastel',
        'senttxstore.dat',
      )
    }

    if (os.platform() === 'linux') {
      return path.join(
        remote.app.getPath('home'),
        '.local',
        'share',
        'psl-qt-wallet-org',
        'psl-qt-wallet',
        'senttxstore.dat',
      )
    }

    return path.join(remote.app.getPath('appData'), 'Pastel', 'senttxstore.dat')
  }

  /**
   * @returns ITTransactionResult[]
   */
  async loadSentTxns(): Promise<ITTransactionResult[]> {
    try {
      const jsonString = await fs.promises.readFile(this.locateSentTxStore())
      const sentTx = JSON.parse(jsonString.toString())
      return sentTx.map((s: ITSentTxStore) => {
        const transction: ITTransactionResult = {
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
        const detailedTxns: ITDetailedTxns[] = [
          {
            address: '',
            amount: 0,
          },
        ]
        transction.detailedTxns = detailedTxns
        transction.detailedTxns[0].address = s.address
        transction.detailedTxns[0].amount = s.amount
        transction.detailedTxns[0].memo = s.memo

        return transction
      })
    } catch (err) {
      // If error for whatever reason (most likely, file not found), just return an empty array.
      return []
    }
  }

  /**
   * Get raw transaction by id.
   *
   * @param txid Raw transaction Id
   * @returns
   */
  async fetchRawTxn(txid: string): Promise<ITRawTransactionResponse> {
    return rpc<ITRawTransactionResponse>(
      'getrawtransaction',
      [txid, 1],
      this.config,
    )
  }

  /**
   * Get transaction by id.
   *
   * @param txid Transaction Id
   * @returns
   */
  async fetchTxn(txid: string): Promise<ITTransactionInfoResponse> {
    return rpc<ITTransactionInfoResponse>('gettransaction', [txid], this.config)
  }

  /**
   * Get input addresses by transaction Id
   *
   * @param txid Transaction ID
   * @returns string[]
   */
  async getInputAddresses(txid: string): Promise<string[]> {
    try {
      const { result } = await this.fetchRawTxn(txid)

      const inputAddresses: string[] = []
      await result.vin.map(async (v: ITVin) => {
        try {
          const { result } = await this.fetchTxn(v.txid)

          result.details.map((d: ITTransactionDetail) => {
            if (d && inputAddresses.indexOf(d.address) === -1) {
              inputAddresses.push(d.address)
            }
          })
        } catch (err) {
          inputAddresses.push('')
        }
      })
      return inputAddresses
    } catch (err) {
      return []
    }
  }

  /**
   * Get list of transactions
   *
   * @returns ITTransactionResponse
   */
  async fetchTxns(): Promise<ITTransactionResponse> {
    return rpc<ITTransactionResponse>('listtransactions', [], this.config)
  }

  /**
   * Flat list of transactions
   *
   * @param txtListResult Transaction results from RPC
   * @returns
   */
  async flatTxns(
    txtListResult: ITTransactionResult[],
  ): Promise<ITTransactionResult[]> {
    const existAddresses: string[] = []
    const ttxlistPromise = txtListResult
      .sort(
        (tx1: ITTransactionResult, tx2: ITTransactionResult) =>
          tx2.time - tx1.time,
      )
      .map(async (tx: ITTransactionResult) => {
        const transaction: ITTransactionResult = {
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
        transaction.address = tx.address
        transaction.type = tx.category
        transaction.amount = tx.amount
        transaction.fee = Math.abs(tx.fee || 0)
        transaction.confirmations = tx.confirmations
        transaction.txid = tx.txid
        transaction.time = tx.time
        transaction.detailedTxns = [
          {
            address: '',
            amount: 0,
          },
        ]
        transaction.detailedTxns[0].address = tx.address
        transaction.detailedTxns[0].amount = tx.amount
        if (
          tx.category === 'send' &&
          tx.address &&
          existAddresses.indexOf(tx.address) === -1
        ) {
          existAddresses.push(tx.address)
          // Get input addresses.
          transaction.inputAddresses = await this.getInputAddresses(tx.txid)
        } else {
          transaction.inputAddresses = []
        }
        return transaction
      }) // Now get Z txns

    const ttxlist: ITTransactionResult[] = await Promise.all(ttxlistPromise)

    return ttxlist.flat()
  }

  /**
   * Fetch Z list of received transactions.
   *
   * @param zaddr Address
   * @returns
   */
  async fetchZListReceivedByAddress(
    zaddr: string,
  ): Promise<ITZListReceivedByAddressResponse> {
    return rpc<ITZListReceivedByAddressResponse>(
      'z_listreceivedbyaddress',
      [zaddr, 0],
      this.config,
    )
  }

  /**
   * Fetch T, Z transactions.
   * Please note it's not same the old version that include to call <fnSetTransactionsList>.
   *
   * @returns ITTransactionResult[]
   */
  async fetchTandZTransactions(): Promise<ITTransactionResult[]> {
    const senttxstorePromise = await this.loadSentTxns()
    const { result: txtListResult } = await this.fetchTxns()

    // Flat list of transactions
    const ttxlist: ITTransactionResult[] = await this.flatTxns(txtListResult)

    const { result: zaddressesResult } = await this.walletRPC.fetchZAddresses()
    const alltxnsPromise = zaddressesResult.map(async (address: string) => {
      // For each zaddr, get the list of incoming transactions.
      const {
        result: incomingTxnsResult,
      } = await this.fetchZListReceivedByAddress(address)
      const txns: IBaseTransaction[] = incomingTxnsResult
        .filter((itx: ITZListReceivedByAddressResult) => !itx.change)
        .map((incomingTx: ITZListReceivedByAddressResult) => {
          const memo = parseMemo(incomingTx.memo) || ''
          const { txid, amount, outindex: index } = incomingTx
          return { address, txid, memo, amount, index }
        })
      return txns
    })

    // Now, for each tx in the array, call gettransaction.
    const alltxns = (await Promise.all(alltxnsPromise)).flat()

    // Get transactions from the sent tx store.
    const ztxlist = await Promise.all(
      alltxns.map(
        async (tx): Promise<ITTransactionResult> => {
          const { result: txInfoResult } = await this.fetchTxn(tx.txid)
          return mapTxnsResult(tx, txInfoResult)
        },
      ),
    )

    const transactions = ttxlist.concat(ztxlist).concat(senttxstorePromise)

    return sortTxnsResult(transactions)
  }

  /**
   * Send to make a transaction.
   * Please note it's not same the old version that include to call <fnOpenSendErrorModal>.
   *
   * @param data JSON data
   * @returns
   */
  async sendTransaction(data: IJsonRPCParam[]): Promise<string> {
    return rpc<string>('z_sendmany', data, this.config)
  }
}
