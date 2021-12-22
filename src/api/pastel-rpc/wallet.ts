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
  TListUnspent,
  TListAddressAmountsResponse,
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
    return await rpc<TTotalBalanceResponse>('z_gettotalbalance', [0], {
      throw: true,
    })
  }

  async fetchTGetAddressesByAccount(): Promise<TListAddressesResponse> {
    return await rpc('getaddressesbyaccount', [''], { throw: true })
  }

  /**
   * Get list of T addresses.
   *
   * @returns IListAddressesResponse
   */
  async fetchZAddresses(): Promise<TListAddressesResponse> {
    return rpc<TListAddressesResponse>('z_listaddresses', [], { throw: true })
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

  async fetchTListUnspent(): Promise<TListUnspentResponse> {
    return rpc<TListUnspentResponse>('listunspent', [0], { throw: true })
  }

  /**
   * Fetch all T and Z addresses with balance.
   * Please note it's not same the old version that include to call <fnSetAddressesWithBalance>.
   *
   * @returns IAddressBalance[]
   */
  async fetchTandZAddresses(): Promise<TAddressList[]> {
    const [TUnspent, ZUnspent] = await Promise.all([
      this.fetchTListUnspent(),
      this.fetchZListUnspent(),
    ])

    const tResult: TAddressList[] = TUnspent.map((addr: TListUnspent) => {
      return {
        txid: addr.txid,
        address: addr.address,
        amount: addr.amount,
        type: 'transparent',
      }
    })

    const zResult: TAddressList[] = ZUnspent.map((addr: TZListUnspent) => {
      return {
        txid: addr.txid,
        address: addr.address,
        amount: addr.amount,
        type: 'shielded',
      }
    })

    return tResult.concat(zResult)
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
        const message: string = err.message || ''
        log.error(`api/pastel-rpc/wallet importPrivKey error: ${message}`, err)
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
        const message: string = err.message || ''
        log.error(`api/pastel-rpc/wallet importPrivKey error: ${message}`, err)
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
        const message: string = err.message || ''
        log.error(`api/pastel-rpc/wallet importPrivKey error: ${message}`, err)
        throw err
      }
    }
  }

  async doImportANIPrivKey(key: string): Promise<string> {
    if (key.startsWith('P') && key.length === 52) {
      try {
        const { result } = await rpc<TPrivKeyResponse>(
          'ingest',
          ['ani2psl_secret', key],
          { throw: true },
        )
        return result
      } catch (err) {
        const message: string = err.message || ''
        log.error(
          `api/pastel-rpc/wallet doImportANIPrivKey error: ${message}`,
          err,
        )
        throw err
      }
    } else {
      throw new Error(
        'Error: The entered ANI private key was the wrong length or did not start with the character "p"!',
      )
    }
  }

  async getListAddressAmounts(): Promise<string> {
    try {
      const res = await rpc<TListAddressAmountsResponse>(
        'listaddressamounts',
        [false, 'spendableOnly'],
        { throw: true },
      )
      const result = Object.keys(res)
      return result[0]
    } catch (err) {
      const message: string = err.message || ''
      log.error(
        `api/pastel-rpc/wallet getListAddressAmounts error: ${message}`,
        err,
      )
      throw err
    }
  }
}

export const walletRPC = new WalletRPC()

const useMapListUnspentToAddressAmounts = (
  data?: { address: string; amount: number }[],
) => {
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

export const useTotalBalance = (): UseQueryResult<TTotalBalance> => {
  return useQuery(['z_gettotalbalance', 0], () => walletRPC.fetchTotalBalance())
}

export const useTGetAddressesByAccount = (): UseQueryResult<TListAddressesResponse> => {
  return useQuery('getaddressesbyaccount', () =>
    walletRPC.fetchTGetAddressesByAccount(),
  )
}

export const useTListUnspent = (options?: {
  enabled?: boolean
}): UseQueryResult<TListUnspentResponse> => {
  return useQuery('listunspent', () => walletRPC.fetchTListUnspent(), options)
}

export const useTAddressBalances = (): UseQueryResult<TAddressBalancesResponse> => {
  const query = useTListUnspent()
  const data = useMapListUnspentToAddressAmounts(query.data)

  return { ...query, data } as UseQueryResult<TAddressBalancesResponse>
}

export const useTAddresses = (): UseQueryResult<TListAddressesResponse> => {
  const addressesQuery = useTGetAddressesByAccount()
  const addressesBalancesQuery = useTAddressBalances() // balances may have additional addresses

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

export const useZAddresses = (): UseQueryResult<TListAddressesResponse> => {
  return useQuery('z_listaddresses', () => walletRPC.fetchZAddresses())
}

export const useListAddressesByAccount = (options?: {
  enabled?: boolean
}): UseQueryResult<TListAddressesResponse> => {
  return useQuery(
    'getaddressesbyaccount',
    () => walletRPC.fetchAddressesByAccount(),
    options,
  )
}

export const useZListUnspent = (options?: {
  enabled?: boolean
}): UseQueryResult<TZListUnspentResponse> => {
  return useQuery('z_listunspent', () => walletRPC.fetchZListUnspent(), options)
}

export const useZAddressBalances = (): UseQueryResult<TAddressBalancesResponse> => {
  const query = useZListUnspent()
  const data = useMapListUnspentToAddressAmounts(query.data)

  return { ...query, data } as UseQueryResult<TAddressBalancesResponse>
}
