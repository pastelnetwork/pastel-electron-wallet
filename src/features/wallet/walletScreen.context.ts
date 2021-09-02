import { createContext, Dispatch, SetStateAction, useContext } from 'react'
import { UseQueryResult } from 'react-query'
import { TAddress, TBalance, TTotalBalance } from '../../types/rpc'
import { TUseAddressBookResult } from '../../common/hooks/useAddressBook'
import { TPaymentSources } from './walletScreen.types'
import { TPastelPromoCode } from '../../common/utils/PastelPromoCode'

export type TWalletScreenContextValues = {
  tAddresses: UseQueryResult<TAddress[]>
  tAddressAmounts: UseQueryResult<Record<TAddress, TBalance>>
  zAddresses: UseQueryResult<TAddress[]>
  zAddressAmounts: UseQueryResult<Record<TAddress, TBalance>>
  allAddresses: UseQueryResult<TAddress[]>
  allAddressAmounts: UseQueryResult<Record<TAddress, TBalance>>
  totalBalances: UseQueryResult<TTotalBalance>
  addressBook: TUseAddressBookResult
  lastActivityTimes: UseQueryResult<Record<TAddress, number>>
  hideEmptyAddresses: boolean
  toggleHideEmptyAddresses(hide: boolean): void
  selectedAddresses: TAddress[]
  setSelectedAddresses: Dispatch<SetStateAction<TAddress[]>>
  paymentSources: TPaymentSources
  setPaymentSources: Dispatch<SetStateAction<TPaymentSources>>
  activeTab: number
  setActiveTab: Dispatch<SetStateAction<number>>
  activePeriod: number
  setActivePeriod: Dispatch<SetStateAction<number>>
  isPaymentModalOpen: boolean
  setPaymentModalOpen: Dispatch<SetStateAction<boolean>>
  isTransactionHistoryModalOpen: boolean
  setTransactionHistoryModalOpen: Dispatch<SetStateAction<boolean>>
  isExportKeysModalOpen: boolean
  setExportKeysModalOpen: Dispatch<SetStateAction<boolean>>
  isQRCodeModalOpen: boolean
  setIsQRCodeModalOpen: Dispatch<SetStateAction<boolean>>
  isAddPastelPromoCodeModalOpen: boolean
  setAddPastelPromoCodeModalOpen: Dispatch<SetStateAction<boolean>>
  currentAddress?: string
  setCurrentAddress(address?: string): void
  selectedAmount: number
  pastelPromoCode: UseQueryResult<TPastelPromoCode[]>
}

export const WalletScreenContext = createContext(
  {} as TWalletScreenContextValues,
)

export const useWalletScreenContext = (): TWalletScreenContextValues =>
  useContext(WalletScreenContext)
