import { rpc, TRPCConfig } from '../api/pastel-rpc/rpc'

type TEstimateFee = {
  result: number
}

export async function getEstimateFee(
  blocks: number,
  config: TRPCConfig,
): Promise<number> {
  try {
    const resp = await rpc<TEstimateFee>('estimatefee', [blocks], config)
    return resp.result
  } catch (error) {
    return -1
  }
}
