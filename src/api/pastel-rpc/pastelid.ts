import { TPastelID, TRegisterPastelID } from '../../features/pastelID'
import {
  ITCreateNewPastelIdResponse,
  ITGetPastelIdsResponse,
  ITTicketsRegisterIdResponse,
} from '../../types/rpc'
import { rpc, TRPCConfig } from './rpc'

export async function createNewPastelID(
  passphrase: string,
  address: string,
  config: TRPCConfig,
): Promise<TRegisterPastelID> {
  const resp = await rpc<ITCreateNewPastelIdResponse>(
    'pastelid',
    ['newkey', passphrase],
    config,
  )
  const resRP = await rpc<ITTicketsRegisterIdResponse>(
    'tickets',
    ['register', 'id', resp.result.pastelid, passphrase, address],
    config,
  )
  const res: TRegisterPastelID = {
    pastelid: resp.result.pastelid,
    txid: resRP.result.txid,
  }
  return res
}

export async function getPastelIDs(config: TRPCConfig): Promise<TPastelID[]> {
  let resp: ITGetPastelIdsResponse | null = null

  try {
    resp = await rpc<ITGetPastelIdsResponse>('pastelid', ['list'], config)
  } catch (error) {
    if (
      // this happens when there is no PastelIDs created yet, therefore this is a valid state.
      String(error).indexOf(
        'boost::filesystem::directory_iterator::construct: The system cannot find the path specified',
      ) !== -1
    ) {
      return []
    }
  }
  // TODO RPC calls "pastel list" and "pastel newkey <pass>" return inconsistent results:
  // one returns [{ PastelID: string }] and the other { pastelid: string }. This difference in keys must be fixed on RPC side.
  // The loop below is a workaroud to translate the [{ PastelID: string }] of "pastel list" into [{ pastelid: string }].
  if (!resp) {
    return []
  }

  if (resp.result === null || resp.result.length === 0) {
    return []
  }

  return resp.result.map(id => {
    return { pastelid: id.PastelID }
  })
}
