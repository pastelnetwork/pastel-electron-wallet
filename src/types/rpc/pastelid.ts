import { TResponse } from '../rpc'

type TGetPastelIdsResult = {
  PastelID: string
}

type TTicketsRegisterIdResult = {
  txid: string
}

type TCreateNewPastelIdResult = {
  pastelid: string
}

type TGetPastelIdsResponse = TResponse<TGetPastelIdsResult[]>
type TCreateNewPastelIdResponse = TResponse<TCreateNewPastelIdResult>
type TTicketsRegisterIdResponse = TResponse<TTicketsRegisterIdResult>

export type {
  TCreateNewPastelIdResponse,
  TCreateNewPastelIdResult,
  TGetPastelIdsResponse,
  TGetPastelIdsResult,
  TTicketsRegisterIdResponse,
  TTicketsRegisterIdResult,
}
