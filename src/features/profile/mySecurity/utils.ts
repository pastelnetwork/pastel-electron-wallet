import LZUTF8 from 'lzutf8'

import { rpc, TRPCConfig } from '../../../api/pastel-rpc/rpc'

type TAddressesResponse = {
  error: string | null
  id: string
  result: string[]
}

type TPrivKeyResponse = {
  error: string | null
  id: string
  result: string
}

type TPastelIDResponse = {
  error: string | null
  id: string
  result: TPastelID[]
}

type TAllAddresses = {
  zAddresses: string[]
  tAddresses: string[]
}

type TPastelID = {
  pastelid: string
}

export type TPrivateKey = {
  address: string
  privateKey: string
}

async function fetchAllAddress(
  config: TRPCConfig,
): Promise<TAllAddresses | null> {
  try {
    const zAddresses = await rpc<TAddressesResponse>(
      'z_listaddresses',
      [],
      config,
    )
    const tAddresses = await rpc<TAddressesResponse>(
      'getaddressesbyaccount',
      [''],
      config,
    )
    return {
      zAddresses: zAddresses?.result,
      tAddresses: tAddresses?.result,
    }
  } catch {
    return null
  }
}

async function getPrivKeyAsString(
  address: string,
  method: string,
  config: TRPCConfig,
): Promise<string | null> {
  try {
    const res = await rpc<TPrivKeyResponse>(method, [address], config)
    return res.result
  } catch {
    return null
  }
}

async function getPastelIDs(config: TRPCConfig): Promise<TPastelID[] | null> {
  try {
    const res = await rpc<TPastelIDResponse>('pastelid', ['list'], config)
    return res.result
  } catch {
    return null
  }
}

export async function fetchPastelIDAndPrivateKeys(
  config: TRPCConfig,
): Promise<string | null> {
  const addresses = await fetchAllAddress(config)
  const zPrivateKeys: string[] = []
  const tPrivateKeys: string[] = []

  if (addresses) {
    const zAddresses = addresses.zAddresses
    for (let i = 0; i < zAddresses.length; i++) {
      const address = zAddresses[i]

      const privKey = await getPrivKeyAsString(address, 'z_exportkey', config)
      if (privKey) {
        zPrivateKeys.push(privKey)
      }
    }

    const tAddresses = addresses.tAddresses
    for (let i = 0; i < tAddresses.length; i++) {
      const address = tAddresses[i]

      const privKey = await getPrivKeyAsString(address, 'dumpprivkey', config)
      if (privKey) {
        tPrivateKeys.push(privKey)
      }
    }
  }

  const pastelIDs = await getPastelIDs(config)

  if (pastelIDs?.length || zPrivateKeys.length || tPrivateKeys.length) {
    const data = {
      zPrivateKeys,
      tPrivateKeys,
      pastelIDs,
    }

    return LZUTF8.compress(JSON.stringify(data), {
      outputEncoding: 'Base64',
    })
  }

  return null
}

export async function fetcAllPrivateKeys(
  config: TRPCConfig,
): Promise<TPrivateKey[]> {
  const addresses = await fetchAllAddress(config)
  const zPrivateKeys: TPrivateKey[] = []
  const tPrivateKeys: TPrivateKey[] = []

  if (addresses) {
    const zAddresses = addresses.zAddresses
    for (let i = 0; i < zAddresses.length; i++) {
      const address = zAddresses[i]

      const privKey = await getPrivKeyAsString(address, 'z_exportkey', config)
      if (privKey) {
        zPrivateKeys.push({
          address,
          privateKey: privKey,
        })
      }
    }

    const tAddresses = addresses.tAddresses
    for (let i = 0; i < tAddresses.length; i++) {
      const address = tAddresses[i]

      const privKey = await getPrivKeyAsString(address, 'dumpprivkey', config)
      if (privKey) {
        tPrivateKeys.push({
          address,
          privateKey: privKey,
        })
      }
    }
  }

  return zPrivateKeys.concat(tPrivateKeys)
}

export const splitStringIntoChunks = (
  str: string,
  chunkQuantity: number,
): string[] => {
  const numChunks = Math.ceil(str.length / chunkQuantity)
  const chunks = new Array(numChunks)

  for (let i = 0, o = 0; i < numChunks; ++i, o += chunkQuantity) {
    chunks[i] = str.substr(o, chunkQuantity)
  }

  return chunks
}

export const addLineBreakForContent = (str: string): string => {
  const breakChar = '\u00ad'
  return str.replace(/(.{40})/g, `$1${breakChar}`)
}
