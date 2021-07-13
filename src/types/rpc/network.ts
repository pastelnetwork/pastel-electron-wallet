import { TResponse } from './response'

type TNetwork = {
  name: string
  limited: boolean
  reachable: boolean
  proxy: string
}

type TLocalAddress = {
  address: string
  port: number
  score: number
}

type TNetworkInfo = {
  version: number
  subversion: string
  protocolversion: number
  localservices: string
  timeoffset: number
  connections: number
  networks: TNetwork[]
  relayfee: number
  localaddresses: TLocalAddress[]
  warnings: string
  create_timestamp: string
}

type TNetTotal = {
  totalbytesrecv: number
  totalbytessent: number
  timemillis: number
}

type TNetworkHashPsResponse = TResponse<number>
type TNetTotalResponse = TResponse<TNetTotal>
type TNetworkInfoResponse = TResponse<TNetworkInfo>

export type {
  TNetwork,
  TNetTotal,
  TNetworkInfo,
  TLocalAddress,
  TNetTotalResponse,
  TNetworkInfoResponse,
  TNetworkHashPsResponse,
}
