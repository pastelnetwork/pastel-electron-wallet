import { rpc, TRPCConfig } from './rpc'

interface StatisticType {
  hashrate: string
  difficulty: string
  block: string
}

interface StatisticResponseType {
  result: string
}

export async function getStatisticInfos(
  config: TRPCConfig,
): Promise<StatisticType> {
  try {
    const hashrate: StatisticResponseType = await rpc(
      'getnetworkhashps',
      [],
      config,
    )
    const difficulty: StatisticResponseType = await rpc(
      'getdifficulty',
      [],
      config,
    )
    await rpc('getblocksubsidy', [], config)
    await rpc('listsinceblock', [], config)
    return {
      hashrate: hashrate.result,
      difficulty: difficulty.result,
      block: '',
    }
  } catch (error) {
    return {
      hashrate: '',
      difficulty: '',
      block: '',
    }
  }
}
