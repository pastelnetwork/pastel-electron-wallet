import { groupBy } from 'underscore'

import {
  TAddressBalance,
  TAddressList,
  TListAddressesResponse,
  TListUnspentResponse,
  TResponse,
  TTotalBalanceResponse,
  TTotalBalance,
  TZListUnspentResponse,
  TZListUnspent,
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
  async exportPrivKey(address: string): Promise<TResponse<string>> {
    return rpc<TResponse<string>>('z_exportkey', [address], this.config)
  }

  /**
   * Dump private key.
   *
   * @param address
   * @returns IResponse<string>
   */
  async dumpPrivKey(address: string): Promise<TResponse<string>> {
    return rpc<TResponse<string>>('dumpprivkey', [address], this.config)
  }

  /**
   * Export viewing key.
   *
   * @param address
   * @returns IResponse<string>
   */
  async exportViewingKey(address: string): Promise<TResponse<string>> {
    return rpc<TResponse<string>>('z_exportviewingkey', [address], this.config)
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
  async fetchTotalBalance(): Promise<TTotalBalance> {
    const { result } = await rpc<TTotalBalanceResponse>(
      'z_gettotalbalance',
      [0],
      this.config,
    )
    return result
  }

  /**
   * Get list of T addresses.
   *
   * @returns IListAddressesResponse
   */
  async fetchZAddresses(): Promise<TListAddressesResponse> {
    return rpc<TListAddressesResponse>('z_listaddresses', [], this.config)
  }

  /**
   * Get list of T addresses.
   *
   * @returns IListAddressesResponse
   */
  async fetchTAddresses(): Promise<TListAddressesResponse> {
    return rpc<TListAddressesResponse>('listaddresses', [], this.config)
  }

  /**
   * Get list of addresses by account.
   *
   * @returns IListAddressesResponse
   */
  async fetchAddressesByAccount(): Promise<TListAddressesResponse> {
    return rpc<TListAddressesResponse>(
      'getaddressesbyaccount',
      [''],
      this.config,
    )
  }

  /**
   * Send a transaction using the already constructed sendJson structure.
   * Please note it's not same the old version that include to call <fnSetAllAddresses>.
   *
   * @returns string[]
   */
  async fetchAllAddresses(): Promise<string[]> {
    const results = await Promise.all([
      this.fetchZAddresses(),
      this.fetchAddressesByAccount(),
    ])

    const { result: z } = results[0]
    const { result: t } = results[1]

    return z.concat(t)
  }

  /**
   * Get Z List unspent.
   *
   * @returns IZListUnspentResponse
   */
  async fetchZListUnspent(): Promise<TZListUnspentResponse> {
    return rpc<TZListUnspentResponse>('z_listunspent', [0], this.config)
  }

  /**
   * Get List unspent.
   *
   * @returns IListUnspentResponse
   */
  async fetchListUnspent(): Promise<TListUnspentResponse> {
    return rpc<TListUnspentResponse>('listunspent', [0], this.config)
  }

  /**
   * Fetch all T and Z addresses with balance.
   * Please note it's not same the old version that include to call <fnSetAddressesWithBalance>.
   *
   * @returns IAddressBalance[]
   */
  async fetchTandZAddresses(): Promise<TAddressList[]> {
    const results = await Promise.all([
      this.fetchZListUnspent(),
      this.fetchListUnspent(),
    ])

    const zResult: TAddressList[] = results[0].result.map(
      (addr: TZListUnspent) => {
        return {
          txid: addr.txid,
          address: addr.address,
          amount: addr.amount,
          type: 'shielded',
        }
      },
    )

    const tResult: TAddressList[] = results[0].result.map(
      (addr: TZListUnspent) => {
        return {
          txid: addr.txid,
          address: addr.address,
          amount: addr.amount,
          type: 'transparent',
        }
      },
    )

    return zResult.concat(tResult)
  }

  /**
   * Fetch all T and Z addresses with balance.
   * Please note it's not same the old version that include to call <fnSetAddressesWithBalance>.
   *
   * @returns IAddressBalance[]
   */
  async fetchTandZAddressesWithBalance(): Promise<TAddressBalance[]> {
    const results = await Promise.all([
      this.fetchZListUnspent(),
      this.fetchListUnspent(),
    ])

    // response.result has all the unspent notes.
    const { result: zResult } = results[0]
    const zGroups = groupBy(zResult, 'address')

    // Map Z addresses balance
    const zAddresses: TAddressBalance[] = Object.keys(zGroups).map(address => {
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
  } // Fetch all T and Z addresses
}
