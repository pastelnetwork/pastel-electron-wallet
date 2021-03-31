import { TPastelID } from '../../features/pastelID'
import { rpc, TRPCConfig } from './rpc'

type TCreateNewPastelIDResponse = {
  result: {
    pastelid: string
  }
}

export async function createNewPastelID(
  passphrase: string,
  config: TRPCConfig,
): Promise<TPastelID> {
  const resp = await rpc<TCreateNewPastelIDResponse>(
    'pastelid',
    ['newkey', passphrase],
    config,
  )
  const res: TPastelID = { pastelid: resp.result.pastelid }
  return res
}

type TGetPastelIDsResponse = {
  result: Array<{
    PastelID: string
  }>
}

export async function getPastelIDs(config: TRPCConfig): Promise<TPastelID[]> {
  let resp: TGetPastelIDsResponse

  try {
    resp = await rpc<TGetPastelIDsResponse>('pastelid', ['list'], config)
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

  if (resp.result === null || resp.result.length === 0) {
    return []
  }

  return resp.result.map(id => {
    return { pastelid: id.PastelID }
  })
}
