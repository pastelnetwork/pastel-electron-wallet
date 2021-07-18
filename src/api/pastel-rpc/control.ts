import { TInfo, TInfoResponse } from '../../types/rpc'
import { BlockchainRPC, MiningRPC } from '.'
import { rpc, TRPCConfig } from './rpc'

export class ControlRPC {
  private readonly blockchainRPC: BlockchainRPC
  private readonly miningRPC: MiningRPC
  /**
   *
   * @param config RPC config
   */
  constructor(private readonly config: TRPCConfig) {
    this.blockchainRPC = new BlockchainRPC(this.config)
    this.miningRPC = new MiningRPC(this.config)
  }

  /**
   * Get info.
   *
   * @returns InfoResponse
   */
  async getInfo(): Promise<TInfoResponse> {
    return rpc<TInfoResponse>('getinfo', [], this.config)
  }

  /**
   * This method will get the total balances.
   * Please note it's not same the old version that include to call <fnSetInfo>.
   *
   * @returns Info
   */
  async fetchInfo(): Promise<TInfo> {
    const results = await Promise.all([
      this.getInfo(),
      this.blockchainRPC.fetchBlockchainInfo(),
      this.miningRPC.fetchNetworkSolps(),
    ])

    const { result: infoResult } = results[0]
    const { result: blkInfoResult } = results[1]
    const solps = results[2]

    const { testnet, blocks: latestBlock, connections, version } = infoResult
    const { verificationprogress: verificationProgress } = blkInfoResult

    return {
      testnet,
      latestBlock,
      connections,
      version,
      currencyName: testnet ? 'LSP' : 'PSL',
      // Setting this to null will copy over the existing price
      pslPrice: 0,
      disconnected: false,
      verificationProgress,
      solps: solps.result,
    }
  }
}
