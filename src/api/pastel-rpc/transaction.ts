import { loadSentTxns } from '../../features/pastelSentTxStore/sentTxStore'

import {
  TBaseTransaction,
  TResponse,
  TRpcParam,
  TRawTransactionResponse,
  TTransactionDetail,
  TTransactionInfoResponse,
  TTransactionResponse,
  TTransaction,
  TVin,
  TZListReceivedByAddressResponse,
  TZListReceivedByAddress,
} from '../../types/rpc'
import { mapTxnsResult, parseMemo, sortTxnsResult } from '../helpers'
import { rpc } from './rpc'
import { WalletRPC } from './wallet'
import { useQuery, UseQueryResult } from 'react-query'

export class TransactionRPC {
  private readonly walletRPC: WalletRPC

  constructor() {
    this.walletRPC = new WalletRPC()
  }

  /**
   * Get raw transaction by id.
   *
   * @param txid Raw transaction Id
   * @returns
   */
  async getRawTxn(txid: string): Promise<TRawTransactionResponse> {
    return rpc<TRawTransactionResponse>('getrawtransaction', [txid, 1])
  }

  /**
   * Get transaction by id.
   *
   * @param txid Transaction Id
   * @returns
   */
  async getTxn(txid: string): Promise<TTransactionInfoResponse> {
    return rpc<TTransactionInfoResponse>('gettransaction', [txid])
  }

  /**
   * Get input addresses by transaction Id
   *
   * @param txid Transaction ID
   * @returns string[]
   */
  async getInputAddresses(txid: string): Promise<string[]> {
    try {
      const { result } = await this.getRawTxn(txid)

      const inputAddresses: string[] = []
      await result.vin.map(async (v: TVin) => {
        try {
          const { result } = await this.getTxn(v.txid)

          result.details.map((d: TTransactionDetail) => {
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

  async listTransactions({
    count,
    from,
  }: {
    count: number
    from: number
  }): Promise<TTransactionResponse> {
    return rpc<TTransactionResponse>('listtransactions', ['', count, from], {
      throw: true,
    })
  }

  /**
   * Flat list of transactions
   *
   * @param txtListResult Transaction results from RPC
   * @returns
   */
  async flatTxns(txtListResult: TTransaction[]): Promise<TTransaction[]> {
    const existAddresses: string[] = []
    const ttxlistPromise = txtListResult
      .sort((tx1: TTransaction, tx2: TTransaction) => tx2.time - tx1.time)
      .map(async (tx: TTransaction) => {
        const transaction: TTransaction = {
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

    const ttxlist: TTransaction[] = await Promise.all(ttxlistPromise)

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
  ): Promise<TZListReceivedByAddressResponse> {
    return rpc<TZListReceivedByAddressResponse>('z_listreceivedbyaddress', [
      zaddr,
      0,
    ])
  }

  /**
   * Fetch T, Z transactions.
   * Please note it's not same the old version that include to call <fnSetTransactionsList>.
   *
   * @returns ITTransaction[]
   */
  async fetchTAndZTransactions(): Promise<TTransaction[]> {
    const senttxstore = await loadSentTxns()
    const txtListResult = await this.listTransactions({ count: 10, from: 0 })

    // Flat list of transactions
    const ttxlist: TTransaction[] = await this.flatTxns(txtListResult)

    const zaddressesResult = await this.walletRPC.fetchZAddresses()
    const alltxnsPromise = zaddressesResult.map(async (address: string) => {
      // For each zaddr, get the list of incoming transactions.
      const {
        result: incomingTxnsResult,
      } = await this.fetchZListReceivedByAddress(address)

      const txns: TBaseTransaction[] = incomingTxnsResult
        .filter((itx: TZListReceivedByAddress) => !itx.change)
        .map((incomingTx: TZListReceivedByAddress) => {
          const memo = parseMemo(incomingTx.memo) || ''
          const { txid, amount, outindex: index } = incomingTx
          return { address, txid, memo, amount, index }
        })

      return txns
    })

    // Now, for each tx in the array, call gettransaction.
    const alltxns: TBaseTransaction[] = (
      await Promise.all(alltxnsPromise)
    ).flat()

    // Get transactions from the sent tx store.
    const ztxlist = await Promise.all(
      alltxns.map(
        async (tx): Promise<TTransaction> => {
          const { result: txInfoResult } = await this.getTxn(tx.txid)
          return mapTxnsResult(tx, txInfoResult)
        },
      ),
    )

    const transactions = ttxlist.concat(ztxlist).concat(senttxstore)

    return sortTxnsResult(transactions)
  }

  useTAndZTransactions(): UseQueryResult<TTransaction[]> {
    return useQuery('TAndZTransactions', () => this.fetchTAndZTransactions())
  }

  /**
   * Send to make a transaction.
   * Please note it's not same the old version that include to call <fnOpenSendErrorModal>.
   *
   * @param data JSON data
   * @returns
   */
  async sendTransaction(data: TRpcParam[]): Promise<TResponse<string>> {
    return rpc<TResponse<string>>('z_sendmany', data)
  }
}

export const transactionRPC = new TransactionRPC()
