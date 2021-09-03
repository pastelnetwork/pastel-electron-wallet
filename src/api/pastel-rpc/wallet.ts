import log from 'electron-log'

import {
  TListAddressesResponse,
  TListUnspentResponse,
  TResponse,
  TTotalBalanceResponse,
  TTotalBalance,
  TZListUnspentResponse,
  TCreateAddressResponse,
  TPrivKeyResponse,
  TZPrivKeyResponse,
  TAddressBalancesResponse,
  TAddressList,
  TZListUnspent,
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

  async fetchTGetAddressesByAccount(): Promise<TListAddressesResponse> {
    return await rpc('getaddressesbyaccount', [''], { throw: true })
  }

  useTGetAddressesByAccount(): UseQueryResult<TListAddressesResponse> {
    return useQuery('getaddressesbyaccount', () =>
      this.fetchTGetAddressesByAccount(),
    )
  }

  useTAddresses(): UseQueryResult<TListAddressesResponse> {
    const addressesQuery = this.useTGetAddressesByAccount()
    const addressesBalancesQuery = this.useTAddressBalances() // balances may have additional addresses

    return useMemo(() => {
      const data = addressesQuery.data ? [...addressesQuery.data] : []
      const addressesBalances = addressesBalancesQuery.data
      const isLoading =
        addressesQuery.isLoading || addressesBalancesQuery.isLoading

      if (addressesBalances) {
        for (const address in addressesBalances) {
          if (!data.includes(address)) {
            data.push(address)
          }
        }
      }

      return {
        ...addressesQuery,
        isLoading,
        data: isLoading ? undefined : data,
      } as UseQueryResult<TListAddressesResponse>
    }, [addressesQuery, addressesBalancesQuery])
  }

  /**
   * Get list of T addresses.
   *
   * @returns IListAddressesResponse
   */
  async fetchZAddresses(): Promise<TListAddressesResponse> {
    return rpc<TListAddressesResponse>('z_listaddresses', [], { throw: true })
  }

  useZAddresses(): UseQueryResult<TListAddressesResponse> {
    return useQuery('z_listaddresses', () => this.fetchZAddresses())
  }

  /**
   * Get list of addresses by account.
   *
   * @returns IListAddressesResponse
   */
  async fetchAddressesByAccount(): Promise<TListAddressesResponse> {
    return rpc<TListAddressesResponse>('getaddressesbyaccount', [''], {
      throw: true,
    })
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

    const z = results[0]
    const t = results[1]

    return z.concat(t)
  }

  async fetchZListUnspent(): Promise<TZListUnspentResponse> {
    return rpc<TZListUnspentResponse>('z_listunspent', [0], { throw: true })
  }

  useZListUnspent(options?: {
    enabled?: boolean
  }): UseQueryResult<TZListUnspentResponse> {
    return useQuery('z_listunspent', () => this.fetchZListUnspent(), options)
  }

  useZAddressBalances(): UseQueryResult<TAddressBalancesResponse> {
    const query = this.useZListUnspent()
    const data = this.useMapListUnspentToAddressAmounts(query.data)

    return { ...query, data } as UseQueryResult<TAddressBalancesResponse>
  }

  async fetchTListUnspent(): Promise<TListUnspentResponse> {
    return rpc<TListUnspentResponse>('listunspent', [0], { throw: true })
  }

  useTListUnspent(options?: {
    enabled?: boolean
  }): UseQueryResult<TListUnspentResponse> {
    return useQuery('listunspent', () => this.fetchTListUnspent(), options)
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
      this.fetchTListUnspent(),
    ])

    const zResult: TAddressList[] = results[0].map((addr: TZListUnspent) => {
      return {
        txid: addr.txid,
        address: addr.address,
        amount: addr.amount,
        type: 'shielded',
      }
    })

    const tResult: TAddressList[] = results[0].map((addr: TZListUnspent) => {
      return {
        txid: addr.txid,
        address: addr.address,
        amount: addr.amount,
        type: 'transparent',
      }
    })

    return zResult.concat(tResult)
  }

  useTAddressBalances(): UseQueryResult<TAddressBalancesResponse> {
    const query = this.useTListUnspent()
    const data = this.useMapListUnspentToAddressAmounts(query.data)

    return { ...query, data } as UseQueryResult<TAddressBalancesResponse>
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

  private useMapListUnspentToAddressAmounts(
    data?: { address: string; amount: number }[],
  ) {
    return useMemo(() => {
      if (!data) {
        return
      }

      const balances: TAddressBalancesResponse = {}
      data.forEach(item => {
        balances[item.address] = (balances[item.address] || 0) + item.amount
      })
      return balances
    }, [data])
  }
}

export const walletRPC = new WalletRPC()
