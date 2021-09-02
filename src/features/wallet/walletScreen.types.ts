import { TAddress } from '../../types/rpc'

export type TAddressRow = {
  address: string
  time?: number
  qrCode?: string
  amount: number
  type: 'shielded' | 'transparent'
}

export type TPaymentSources = Record<TAddress, number>
