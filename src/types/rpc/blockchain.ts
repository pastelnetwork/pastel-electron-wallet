import { TResponse } from './response'
import { TSinceBlockTransaction } from './transaction'

type TBlock = {
  hash: string
  confirmations: number
  size: number
  height: number
  version: number
  merkleroot: string
  finalsaplingroot: string
  tx: string
  time: number
  nonce: string
  solution: string
  bits: string
  difficulty: number
  chainwork: string
  anchor: string
  valuePools: string
  previousblockhash: string
  nextblockhash: string
}

type TConsensus = {
  chaintip: string
  nextblock: string
}

type TValuePool = {
  chainValue?: number
  chainValueZat?: number
  id: string
  monitored: boolean
}

type TUpgrade = {
  [index: string]: {
    activationheight: number
    info: string
    name: string
    status: string
  }
}

type TEnforce = {
  found: number
  required: number
  status: boolean
  window: number
}

type TSoftFork = {
  enforce: TEnforce
  id: string
  reject: TEnforce
  version: number
}

type TBlockChainInfo = {
  bestblockhash: string
  blocks: number
  chain: string
  chainwork: string
  commitments: number
  consensus: TConsensus
  difficulty: number
  headers: number
  pruned: boolean
  softforks: TSoftFork[]
  upgrades: TUpgrade
  valuePools: TValuePool[]
  verificationprogress: number
}

type TChainTips = {
  height: number
  hash: string
  branchlen: number
  status: string
}

type TBlockSubsidy = {
  miner: number
  masternode: number
  governance: number
}

type TSinceBlock = {
  transactions: TSinceBlockTransaction[]
  lastblock: string
}

type TBlockResponse = TResponse<TBlock>
type TBlockHashResponse = TResponse<string>
type TBlockCountResponse = TResponse<number>
type TBestBlockHashResponse = TResponse<string>
type TChainTipsResponse = TResponse<TChainTips[]>
type TBlockSubsidyResponse = TResponse<TBlockSubsidy>
type TListSinceBlockResponse = TResponse<TSinceBlock>
type TBlockChainInfoResponse = TResponse<TBlockChainInfo>

export type {
  TBlock,
  TUpgrade,
  TEnforce,
  TSoftFork,
  TValuePool,
  TConsensus,
  TChainTips,
  TSinceBlock,
  TBlockSubsidy,
  TBlockResponse,
  TBlockChainInfo,
  TBlockHashResponse,
  TChainTipsResponse,
  TBlockCountResponse,
  TBlockSubsidyResponse,
  TBestBlockHashResponse,
  TBlockChainInfoResponse,
  TListSinceBlockResponse,
}
