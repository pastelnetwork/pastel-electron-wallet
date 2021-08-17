import { TBlockChainInfoResponse } from '../../types/rpc'
import { rpc } from './rpc'

export class BlockchainRPC {
  /**
   * Fetch block chain info.
   *
   * @returns IBlockchainInfoResponse
   */
  async fetchBlockchainInfo(): Promise<TBlockChainInfoResponse> {
    return rpc<TBlockChainInfoResponse>('getblockchaininfo', [])
  }
}
