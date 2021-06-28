import { TResonseError } from '../../types/rpc'

export type TTxoutsetInfo = {
  height: number
  bestblock: string
  transactions: number
  txouts: number
  bytes_serialized: number
  hash_serialized: string
  total_amount: number
}

export type TGetdifficulty = {
  result: number
  error: TResonseError
  id: string
}

export type TGettxoutsetinfo = {
  result: TTxoutsetInfo
  error: TResonseError
  id: string
}

export type TValidateFields = {
  bestBlockHash?: string
  hash?: string
  price?: number
  time?: number
  transactionid?: string
}
