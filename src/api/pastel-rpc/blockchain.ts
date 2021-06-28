import { TBlockChainInfoResponse } from '../../types/rpc'
import { rpc, TRPCConfig } from './rpc'

export class BlockchainRPC {
  /**
   *
   * @param config RPC config
   */
  constructor(private readonly config: TRPCConfig) {}

  /**
   * Fetch block chain info.
   *
   * @returns IBlockchainInfoResponse
   */
  async fetchBlockchainInfo(): Promise<TBlockChainInfoResponse> {
    return rpc<TBlockChainInfoResponse>('getblockchaininfo', [], this.config)
  }
}
