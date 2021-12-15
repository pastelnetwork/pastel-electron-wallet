import { rpc } from '../api/pastel-rpc/rpc'

type TEstimateFee = {
  result: number
}

type TGetNetworkFee = {
  id: string
  result: {
    networkfee: number
  }
}

type TGetArtTicketFee = {
  id: string
  result: {
    artticketfee: number
  }
}

type TgGetLocalFee = {
  id: string
  result: {
    localfee: number
  }
}

export async function getEstimateFee(blocks: number): Promise<number> {
  try {
    const resp = await rpc<TEstimateFee>('estimatefee', [blocks])
    return resp.result
  } catch (error) {
    return -1
  }
}

export async function calculateFee(fileSize: number): Promise<number> {
  try {
    const {
      result: { networkfee },
    } = await rpc<TGetNetworkFee>('storagefee', ['getnetworkfee'])
    const {
      result: { artticketfee },
    } = await rpc<TGetArtTicketFee>('storagefee', ['getartticketfee'])
    const {
      result: { localfee },
    } = await rpc<TgGetLocalFee>('storagefee', ['getlocalfee'])

    return fileSize * networkfee + artticketfee * 2 * localfee
  } catch (error) {
    return -1
  }
}
