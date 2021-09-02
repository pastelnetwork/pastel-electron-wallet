import { TResponse } from './response'

export type TMiningInfo = {
  blocks: number
  currentblocksize: number
  currentblocktx: number
  difficulty: number
  errors: string
  genproclimit: number
  localsolps: number
  networksolps: number
  networkhashps: number
  pooledtx?: number
  testnet: number
  chain: string
  generate: boolean
}

// getnetworksolps
type TNetworkSolpsResponse = TResponse<number>
type TMiningInfoResponse = TResponse<TMiningInfo>

export type { TNetworkSolpsResponse, TMiningInfoResponse }
