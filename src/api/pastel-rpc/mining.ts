import { TNetworkSolpsResponse } from '../../types/rpc'
import { rpc } from './rpc'

export class MiningRPC {
  /**
   * Fetch block chain info.
   *
   * @returns INetworkSolpsResponse
   */
  async fetchNetworkSolps(): Promise<TNetworkSolpsResponse> {
    return rpc<TNetworkSolpsResponse>('getnetworksolps', [])
  }
}
