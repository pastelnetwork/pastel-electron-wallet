import { IBlockchainInfoResponse } from '../../types/rpc'
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
  async fetchBlockchainInfo(): Promise<IBlockchainInfoResponse> {
    return rpc<IBlockchainInfoResponse>('getblockchaininfo', [], this.config)
  }
}
