import { TResponse } from './response'

type TMempoolInfo = {
  size: number
  bytes: number
  usage: number
}

type TRawMempool = {
  transactionid: string
  size: number
  fee: number
  time: number
  height: number
  startingpriority: number
  currentpriority: number
  depends: TRawMempoolInfo[]
}

type TRawMempoolInfo = {
  [index: string]: {
    transactionid: string
    size: number
    fee: number
    time: number
    height: number
    startingpriority: number
    currentpriority: number
    depends: TRawMempoolInfo[]
  }
}

type TMempoolinfoResponse = TResponse<TMempoolInfo>
type TRawMempoolResponse = TResponse<TRawMempoolInfo>

export type {
  TRawMempool,
  TMempoolInfo,
  TRawMempoolInfo,
  TRawMempoolResponse,
  TMempoolinfoResponse,
}
