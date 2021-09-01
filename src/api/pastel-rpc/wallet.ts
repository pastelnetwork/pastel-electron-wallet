import { groupBy } from 'underscore'
import log from 'electron-log'

import {
  TAddressBalance,
  TAddressList,
  TListAddressesResponse,
  TListUnspent,
  TListUnspentResponse,
  TResponse,
  TTotalBalanceResponse,
  TTotalBalance,
  TZListUnspentResponse,
  TZListUnspent,
  TCreateAddressResponse,
  TPrivKeyResponse,
  TZPrivKeyResponse,
} from '../../types/rpc'
import { isTransparent, isZaddr } from '../helpers'
import { rpc } from './rpc'
import { useQuery, UseQueryResult } from 'react-query'
import { useMemo } from 'react'

export class WalletRPC {
  /**
   * Export private key.
   *
   * @param address
   * @returns IResponse<string>
   */
  async exportPrivKey(address: string): Promise<TResponse<string>> {
    return rpc<TResponse<string>>('z_exportkey', [address])
  }

  /**
   * Dump private key.
   *
   * @param address
   * @returns IResponse<string>
   */
  async dumpPrivKey(address: string): Promise<TResponse<string>> {
    return rpc<TResponse<string>>('dumpprivkey', [address])
  }

  /**
   * Export viewing key.
   *
   * @param address
   * @returns IResponse<string>
   */
  async exportViewingKey(address: string): Promise<TResponse<string>> {
    return rpc<TResponse<string>>('z_exportviewingkey', [address])
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
    const { result } = await rpc<TTotalBalanceResponse>('z_gettotalbalance', [
      0,
    ])
    return result
  }

  useTotalBalance(): UseQueryResult<TTotalBalance> {
    return useQuery('z_gettotalbalance', () => this.fetchTotalBalance())
  }

  /**
   * Get list of T addresses.
   *
   * @returns IListAddressesResponse
   */
  async fetchZAddresses(): Promise<TListAddressesResponse> {
    return rpc<TListAddressesResponse>('z_listaddresses', [])
  }

  useZListAddresses(options?: {
    enabled?: boolean
  }): UseQueryResult<TListAddressesResponse> {
    return useQuery('z_listaddresses', () => this.fetchZAddresses(), options)
  }

  /**
   * Get list of T addresses.
   *
   * @returns IListAddressesResponse
   */
  async fetchTAddresses(): Promise<TListAddressesResponse> {
    return rpc<TListAddressesResponse>('listaddresses', [])
  }

  /**
   * Get list of addresses by account.
   *
   * @returns IListAddressesResponse
   */
  async fetchAddressesByAccount(): Promise<TListAddressesResponse> {
    return rpc<TListAddressesResponse>('getaddressesbyaccount', [''])
  }

  useListAddressesByAccount(options?: {
    enabled?: boolean
  }): UseQueryResult<TListAddressesResponse> {
    return useQuery(
      'getaddressesbyaccount',
      () => this.fetchAddressesByAccount(),
      options,
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
    return rpc<TZListUnspentResponse>('z_listunspent', [0])
  }

  useZListUnspent(options?: {
    enabled?: boolean
  }): UseQueryResult<TZListUnspentResponse> {
    return useQuery('z_listunspent', () => this.fetchZListUnspent(), options)
  }

  /**
   * Get List unspent.
   *
   * @returns IListUnspentResponse
   */
  async fetchListUnspent(): Promise<TListUnspentResponse> {
    return rpc<TListUnspentResponse>('listunspent', [0])
  }

  useListUnspent(options?: {
    enabled?: boolean
  }): UseQueryResult<TListUnspentResponse> {
    return useQuery('listunspent', () => this.fetchListUnspent(), options)
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

    const tResult: TAddressList[] = results[1].result.map(
      (addr: TListUnspent) => {
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

  useZAddressesWithBalance(): UseQueryResult<TAddressBalance[]> {
    return this.useAddressesWithBalance(() => this.useZListUnspent())
  }

  useTAddressesWithBalance(): UseQueryResult<TAddressBalance[]> {
    return this.useAddressesWithBalance(() => this.useListUnspent())
  }

  useZAddresses(): UseQueryResult<string[]> {
    return this.useAddresses(() => this.useZListAddresses())
  }

  useAddressesByAccount(): UseQueryResult<string[]> {
    return this.useAddresses(() => this.useListAddressesByAccount())
  }

  private useAddressesWithBalance(
    load: () => UseQueryResult<TZListUnspentResponse | TListUnspentResponse>,
  ) {
    const { data, ...rest } = load()

    const mapped = useMemo<TAddressBalance[]>(() => {
      const result = data?.result
      if (!result) {
        return []
      }

      const groups = groupBy(result, 'address')

      return Object.keys(groups).map(address => {
        const balance = groups[address].reduce(
          (prev, obj) => prev + obj.amount,
          0,
        )
        return {
          address,
          balance: Number(balance.toFixed(5)),
        }
      })
    }, [data])

    return { data: mapped, ...rest } as UseQueryResult<TAddressBalance[]>
  }

  private useAddresses(load: () => UseQueryResult<TListAddressesResponse>) {
    const { data, ...rest } = load()
    const mapped = useMemo<string[]>(() => {
      const result = data?.result
      if (!result) {
        return []
      }

      return result
    }, [data])

    return { data: mapped, ...rest } as UseQueryResult<string[]>
  }

  async createNewAddress(zaddress: boolean): Promise<string | null> {
    if (zaddress) {
      try {
        const res: TCreateAddressResponse = await rpc<TCreateAddressResponse>(
          'z_getnewaddress',
          [],
        )
        return res.result
      } catch (err) {
        return null
      }
    } else {
      try {
        const res: TCreateAddressResponse = await rpc<TCreateAddressResponse>(
          'getnewaddress',
          [''],
        )
        return res.result
      } catch (err) {
        return null
      }
    }
  }

  async importPrivKey(key: string, rescan: boolean): Promise<string> {
    if (key.startsWith('p-secret-extended-key')) {
      try {
        const { result } = await rpc<TZPrivKeyResponse>('z_importkey', [
          key,
          rescan ? 'yes' : 'no',
        ])
        return result.address
      } catch (err) {
        log.error(
          `api/pastel-rpc/wallet importPrivKey error: ${err.message}`,
          err,
        )
        throw err
      }
    } else if (key.startsWith('zxview')) {
      try {
        const { result } = await rpc<TZPrivKeyResponse>('z_importviewingkey', [
          key,
          rescan ? 'yes' : 'no',
        ])
        return result.address
      } catch (err) {
        log.error(
          `api/pastel-rpc/wallet importPrivKey error: ${err.message}`,
          err,
        )
        throw err
      }
    } else {
      try {
        const { result } = await rpc<TPrivKeyResponse>('importprivkey', [
          key,
          'imported',
          rescan,
        ])
        return result
      } catch (err) {
        log.error(
          `api/pastel-rpc/wallet importPrivKey error: ${err.message}`,
          err,
        )
        throw err
      }
    }
  }
}

export const walletRPC = new WalletRPC()
