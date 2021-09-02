import { TAddress, TAddressBalancesResponse } from '../../types/rpc'
import { UseQueryResult } from 'react-query'
import { useMemo } from 'react'
import { useWalletScreenContext } from './walletScreen.context'
import { walletRPC } from '../../api/pastel-rpc'

export const useFilterAddresses = (
  addressesQuery: UseQueryResult<TAddress[]>,
  amountsQuery: UseQueryResult<TAddressBalancesResponse>,
  hide: boolean,
): UseQueryResult<TAddress[]> => {
  return useMemo(() => {
    const amounts = amountsQuery.data
    const addresses = addressesQuery.data

    if (hide && amounts && addresses) {
      return {
        ...addressesQuery,
        data: addresses.filter(address => amounts[address] > 0),
      } as UseQueryResult<TAddress[]>
    } else {
      return addressesQuery
    }
  }, [addressesQuery, amountsQuery, hide])
}

export const useSelectedAmount = ({
  addresses,
  amounts,
  selectedAddresses,
  paymentSources,
}: {
  addresses?: string[]
  amounts?: Record<string, number>
  selectedAddresses: string[]
  paymentSources: Record<string, number>
}): number => {
  return useMemo(() => {
    let result = 0
    if (!addresses || !amounts) {
      return result
    }

    selectedAddresses.forEach(address => {
      result += Math.min(paymentSources[address] || 0, amounts[address] || 0)
    })

    return result
  }, [addresses, amounts, selectedAddresses, paymentSources])
}

export const useToggleSelectAddress = (): ((
  address: string,
) => void) => address => {
  const { setSelectedAddresses } = useWalletScreenContext()

  setSelectedAddresses(addresses => {
    if (addresses.includes(address)) {
      return addresses.filter(item => item !== address)
    } else {
      return [...addresses, address]
    }
  })
}

export const useCreateNewAddress = (): (() => Promise<void>) => async () => {
  const { activeTab, tAddresses, zAddresses } = useWalletScreenContext()
  const isZAddress = activeTab === 2
  const result = await walletRPC.createNewAddress(isZAddress)
  if (result) {
    if (isZAddress) {
      zAddresses.refetch()
    } else {
      tAddresses.refetch()
    }
  }
}

export const useSetPaymentSource = (): ((
  address: string,
  amount: number,
) => void) => {
  const { setPaymentSources } = useWalletScreenContext()

  return (address: string, amount: number) =>
    setPaymentSources(sources => ({ ...sources, [address]: amount }))
}
