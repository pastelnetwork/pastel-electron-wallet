import { rpc } from '../api/pastel-rpc/rpc'

type TEstimateFee = {
  result: number
}

export async function getEstimateFee(blocks: number): Promise<number> {
  try {
    const resp = await rpc<TEstimateFee>('estimatefee', [blocks])
    return resp.result
  } catch (error) {
    return -1
  }
}
