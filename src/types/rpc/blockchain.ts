import { IResponse } from './response'

// getblockchaininfo
type IBlockchainInfoResult = {
  chain: string
  blocks: number
  headers: number
  bestblockhash: string
  difficulty: number
  verificationprogress: number
  chainwork: string
  pruned: boolean
  commitments: number
  valuePools: {
    id: string
    monitored: boolean
    chainValue: number
    chainValueZat: number
  }[]
  softforks: {
    id: string
    version: number
    enforce: {
      status: boolean
      found: number
      required: number
      window: number
    }
    reject: {
      status: boolean
      found: number
      required: number
      window: number
    }
  }[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  upgrades: { [x: string]: any }
  consensus: {
    chaintip: string
    nextblock: string
  }
}

type IBlockchainInfoResponse = IResponse<IBlockchainInfoResult>

export type { IBlockchainInfoResponse, IBlockchainInfoResult }
