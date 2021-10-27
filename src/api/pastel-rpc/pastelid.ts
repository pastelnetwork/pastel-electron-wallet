import { TPastelID, TRegisterPastelID } from '../../features/pastelID'
import {
  TCreateNewPastelIdResponse,
  TGetPastelIdsResponse,
  TTicketsRegisterIdResponse,
} from '../../types/rpc'
import { rpc } from './rpc'
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from 'react-query'
import { UseQueryOptions } from 'react-query/types/react/types'
import { transactionRPC } from './transaction'

export const PASTELID_MIN_CONFIRMATIONS = 1

export async function createNewPastelID(
  passphrase: string,
  address: string,
): Promise<TRegisterPastelID> {
  const resp = await rpc<TCreateNewPastelIdResponse>('pastelid', [
    'newkey',
    passphrase,
  ])
  const resRP = await rpc<TTicketsRegisterIdResponse>('tickets', [
    'register',
    'id',
    resp.result.pastelid,
    passphrase,
    address,
  ])
  const res: TRegisterPastelID = {
    pastelid: resp.result.pastelid,
    txid: resRP.result.txid,
  }
  return res
}

export async function getPastelIDs(): Promise<TPastelID[]> {
  try {
    const ids = await rpc<TGetPastelIdsResponse>('pastelid', ['list', 'id'], {
      throw: true,
    })
    return ids.map(id => ({ pastelid: id.PastelID }))
  } catch (error) {
    if (
      // this happens when there is no PastelIDs created yet, therefore this is a valid state.
      String(error).includes(
        'boost::filesystem::directory_iterator::construct: The system cannot find the path specified',
      )
    ) {
      return []
    }
    throw error
  }
}

export type TTicket = {
  height: number
  txid: string
  ticket: {
    address: string
    id_type: string
    pastelID: string
    pg_key: string
    signature: string
    timeStamp: string
    type: string
    version: number
  }
}

export async function getPastelIdTickets(): Promise<TTicket[]> {
  return await rpc('tickets', ['list', 'id'], { throw: true })
}

export type TPastelIdWithTxIdAndConfirmed = {
  pastelid: string
  txid: string
  isConfirmed: boolean
}

export const useFirstPastelIdWithTxIdAndConfirmed = (
  options?: UseQueryOptions<TPastelIdWithTxIdAndConfirmed | undefined, Error>,
): UseQueryResult<TPastelIdWithTxIdAndConfirmed | undefined, Error> => {
  return useQuery(
    'firstPastelIdWithTicketAndConfirmed',
    async () => {
      const [pastelIds, pastelIdsTickets] = await Promise.all([
        getPastelIDs(),
        getPastelIdTickets(),
      ])
      const item = pastelIds
        .map(id => ({
          pastelId: id.pastelid,
          ticket: pastelIdsTickets.find(
            item => item.ticket.pastelID === id.pastelid,
          ) as TTicket,
        }))
        .find(item => item.ticket)

      const tx = item && (await transactionRPC.getTransaction(item.ticket.txid))
      if (!item || !tx) {
        return
      }

      return {
        pastelid: item.pastelId,
        txid: item.ticket.txid,
        isConfirmed: tx.confirmations >= PASTELID_MIN_CONFIRMATIONS,
      }
    },
    options,
  )
}

type TVerifyPastelIdPasswordParams = {
  pastelId: string
  password: string
}

type TVerifyPastelIdPasswordResponse = {
  signature: string
}

export async function verifyPastelIdPassword({
  pastelId,
  password,
}: TVerifyPastelIdPasswordParams): Promise<TVerifyPastelIdPasswordResponse> {
  return await rpc('pastelid', ['sign', 'login', pastelId, password], {
    throw: true,
  })
}

export function useVerifyPastelIdPassword(
  options?: UseMutationOptions<unknown, Error, TVerifyPastelIdPasswordParams>,
): UseMutationResult<unknown, Error, TVerifyPastelIdPasswordParams> {
  return useMutation(params => verifyPastelIdPassword(params), options)
}
