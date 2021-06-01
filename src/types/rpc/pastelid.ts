import { IResponse } from '../rpc'

type ITGetPastelIdsResult = {
  PastelID: string
}

type ITTicketsRegisterIdResult = {
  txid: string
}

type ITCreateNewPastelIdResult = {
  pastelid: string
}

type ITGetPastelIdsResponse = IResponse<ITGetPastelIdsResult[]>
type ITCreateNewPastelIdResponse = IResponse<ITCreateNewPastelIdResult>
type ITTicketsRegisterIdResponse = IResponse<ITTicketsRegisterIdResult>

export type {
  ITCreateNewPastelIdResponse,
  ITCreateNewPastelIdResult,
  ITGetPastelIdsResponse,
  ITGetPastelIdsResult,
  ITTicketsRegisterIdResponse,
  ITTicketsRegisterIdResult,
}
