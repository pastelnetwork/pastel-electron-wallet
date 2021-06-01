import { IResponse } from './response'

type Info = {
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
type InfoResult = {
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

type InfoResponse = IResponse<InfoResult>

export type { Info, InfoResponse, InfoResult }
