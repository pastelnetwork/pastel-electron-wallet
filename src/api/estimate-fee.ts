import log from 'electron-log'

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
type TGetNftTicketFee = {
  id: string
  result: {
    nftticketfee: number
  }
}

export type TGetStorageFee = {
  networkFee: number
  nftTicketFee: number
}

export async function getEstimateFee(blocks: number): Promise<number> {
  try {
    const resp = await rpc<TEstimateFee>('estimatefee', [blocks])
    return resp.result
  } catch (error) {
    return -1
  }
}

export async function getStorageFee(): Promise<TGetStorageFee> {
  try {
    const {
      result: { networkfee },
    } = await rpc<TGetNetworkFee>('storagefee', ['getnetworkfee'])
    const {
      result: { nftticketfee },
    } = await rpc<TGetNftTicketFee>('storagefee', ['getnftticketfee'])
    return {
      networkFee: networkfee,
      nftTicketFee: nftticketfee,
    }
  } catch (error) {
    const message: string = error.message || ''
    log.error(
      `api/pastel-rpc/estimate-fee getStoragefee error: ${message}`,
      error,
    )
    throw new Error(message)
  }
}
