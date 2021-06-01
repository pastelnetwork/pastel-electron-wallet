import { groupBy } from 'underscore'

import {
  IAddressBalance,
  IListAddressesResponse,
  IListUnspentResponse,
  IResponse,
  ITotalBalanceResponse,
  ITotalBalanceResult,
  IZListUnspentResponse,
} from '../../types/rpc'
import { isTransparent, isZaddr } from '../helpers'
import { rpc, TRPCConfig } from './rpc'

export class WalletRPC {
  /**
   *
   * @param config RPC config
   */
  constructor(private readonly config: TRPCConfig) {}

  /**
   * Export private key.
   *
   * @param address
   * @returns IResponse<string>
   */
  async exportPrivKey(address: string): Promise<IResponse<string>> {
    return rpc<IResponse<string>>('z_exportkey', [address], this.config)
  }

  /**
   * Dump private key.
   *
   * @param address
   * @returns IResponse<string>
   */
  async dumpPrivKey(address: string): Promise<IResponse<string>> {
    return rpc<IResponse<string>>('dumpprivkey', [address], this.config)
  }

  /**
   * Export viewing key.
   *
   * @param address
   * @returns IResponse<string>
   */
  async exportViewingKey(address: string): Promise<IResponse<string>> {
    return rpc<IResponse<string>>('z_exportviewingkey', [address], this.config)
  }

  /**
   * Get private key
   *
   * @param address
   * @returns string
   */
  async getPrivKeyAsString(address: string): Promise<string> {
    if (isZaddr(address)) {
      const { result } = await this.exportPrivKey(address)
      return result
    } else if (isTransparent(address)) {
      const { result } = await this.dumpPrivKey(address)
      return result
    }
    return ''
  }

  /**
   * Fetch all addresses and their associated balances.
   *
   * @param address
   * @returns string
   */
  async getViewKeyAsString(address: string): Promise<string> {
    if (isZaddr(address)) {
      const { result } = await this.exportViewingKey(address)
      return result
    } else {
      return ''
    }
  }

  /**
   * Get total balance.
   * Please note it's not same the old version that include to call <fnSetTotalBalance>.
   *
   * @returns ITotalBalanceResponse
   */
  async fetchTotalBalance(): Promise<ITotalBalanceResult> {
    const { result } = await rpc<ITotalBalanceResponse>(
      'z_gettotalbalance',
      [0],
      this.config,
    )
    return result
  }

  /**
   * Get list of addresses.
   *
   * @returns IListAddressesResponse
   */
  async fetchZAddresses(): Promise<IListAddressesResponse> {
    return rpc<IListAddressesResponse>('z_listaddresses', [], this.config)
  }

  /**
   * Get list of addresses by account.
   *
   * @returns IListAddressesResponse
   */
  async fetchAddressesByAccount(): Promise<IListAddressesResponse> {
    return rpc<IListAddressesResponse>(
      'getaddressesbyaccount',
      [''],
      this.config,
    )
  }

  /**
   * Send a transaction using the already constructed sendJson structure.
   * Please note it's not same the old version that include to call <fnSetAllAddresses>.
   *
   * @returns Record<'t' | 'z', string[]>
   */
  async fetchAllAddresses(): Promise<Record<'t' | 'z', string[]>> {
    const results = await Promise.all([
      this.fetchZAddresses(),
      this.fetchAddressesByAccount(),
    ])

    const { result: z } = results[0]
    const { result: t } = results[1]

    return { z, t }
  }

  /**
   * Get Z List unspent.
   *
   * @returns IZListUnspentResponse
   */
  async fetchZListUnspent(): Promise<IZListUnspentResponse> {
    return rpc<IZListUnspentResponse>('z_listunspent', [0], this.config)
  }

  /**
   * Get List unspent.
   *
   * @returns IListUnspentResponse
   */
  async fetchListUnspent(): Promise<IListUnspentResponse> {
    return rpc<IListUnspentResponse>('listunspent', [0], this.config)
  }

  /**
   * Fetch all T and Z transactions.
   * Please note it's not same the old version that include to call <fnSetAddressesWithBalance>.
   *
   * @returns IAddressBalance[]
   */
  async fetchTandZAddressesWithBalances(): Promise<IAddressBalance[]> {
    const results = await Promise.all([
      this.fetchZListUnspent(),
      this.fetchListUnspent(),
    ])

    // response.result has all the unspent notes.
    const { result: zResult } = results[0]
    const zGroups = groupBy(zResult, 'address')
    // Map Z addresses balance
    const zAddresses: IAddressBalance[] = Object.keys(zGroups).map(address => {
      const balance = zGroups[address].reduce(
        (prev, obj) => prev + obj.amount,
        0,
      )
      return {
        address,
        balance: Number(balance.toFixed(5)),
      }
    }) // Do the T addresses

    // T addresses
    const { result: tResult } = results[1]

    const tGroups = groupBy(tResult, 'address')

    const tAddresses = Object.keys(tGroups).map(address => {
      const balance = tGroups[address].reduce(
        (prev, obj) => prev + obj.amount,
        0,
      )
      return {
        address,
        balance: Number(balance.toFixed(5)),
      }
    })

    return zAddresses.concat(tAddresses)
  } // Fetch all T and Z transactions
}
