import { TNetworkSolpsResponse } from '../../types/rpc'
import { rpc, TRPCConfig } from './rpc'

export class MiningRPC {
  /**
   *
   * @param config RPC config
   */
  constructor(private readonly config: TRPCConfig) {}

  /**
   * Fetch block chain info.
   *
   * @returns INetworkSolpsResponse
   */
  async fetchNetworkSolps(): Promise<TNetworkSolpsResponse> {
    return rpc<TNetworkSolpsResponse>('getnetworksolps', [], this.config)
  }
}
