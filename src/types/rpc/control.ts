import { TResponse } from './response'

type TInfo = {
  testnet: boolean
  latestBlock: number
  connections: number
  version: number
  currencyName: 'LSP' | 'PSL'
  pslPrice: number
  disconnected: boolean
  verificationProgress: number
  solps: number
}

// getinfo
type TInfoResult = {
  version: number
  protocolversion: number
  walletversion: number
  balance: number
  blocks: number
  timeoffset: number
  connections: number
  proxy: string
  difficulty: number
  testnet: boolean
  keypoololdest: number
  keypoolsize: number
  paytxfee: number
  relayfee: number
  errors: string
}

type TInfoResponse = TResponse<TInfoResult>

export type { TInfo, TInfoResponse, TInfoResult }
