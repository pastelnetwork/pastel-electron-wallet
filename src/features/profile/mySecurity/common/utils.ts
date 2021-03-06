import LZUTF8 from 'lzutf8'
import { toast } from 'react-toastify'
import log from 'electron-log'

import { rpc } from 'api/pastel-rpc/rpc'
import AddressbookImpl from 'common/utils/AddressbookImpl'
import { TUserInfo, writeUsersInfo, readUsersInfo } from 'common/utils/User'
import { readFileName, writeFileContent } from 'common/utils/file'
import store from '../../../../redux/store'

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

export type TPastelID = {
  PastelID: string
}

type TAddressBook = {
  label: string
  address: string
}

type TAllAddressesAndPastelID = {
  zPrivateKeys: TPrivateKey[]
  tPrivateKeys: TPrivateKey[]
  pastelIDs: TPastelWithContentID[]
  addressBook: TAddressBook[]
  profile: {
    userName: string
  }
  userInfo: TUserInfo[]
}

type TQRCode = {
  qrCode: string
  total: number
  index: number
}

export type TDataForPdf = {
  addressKeys: TPrivateKey[] | null
  pastelIDs: TPastelID[] | null
  addressBook: TAddressBook[] | null
}

export type TPrivateKey = {
  address: string
  privateKey: string
}

type TPastelWithContentID = {
  pastelId: string
  content: string
}

export const addLineBreakForContent = (str: string): string => {
  const breakChar = '\n'
  return str.replace(/(.{46})/g, `$1${breakChar}`)
}

export const addLineBreakFoFullrContent = (str: string): string => {
  const breakChar = '\n'
  return str.replace(/(.{74})/g, `$1${breakChar}`)
}

export const decompressPastelIDAndPrivateKeys = (
  str: string,
): TAllAddressesAndPastelID | null => {
  if (!str) {
    return null
  }

  return JSON.parse(
    LZUTF8.decompress(decodeURIComponent(str), {
      inputEncoding: 'Base64',
    }),
  )
}

export const parseQRCodeFromString = (str: string): TQRCode | null => {
  if (!str) {
    return null
  }

  const qr = str.split('::')
  if (qr.length) {
    return {
      index: parseInt(qr[0]),
      total: parseInt(qr[1]),
      qrCode: qr[2],
    }
  }

  return null
}

async function fetchAllAddress(): Promise<TAllAddresses | null> {
  try {
    const rpcTAddresses = rpc<TAddressesResponse>('z_listaddresses', [])
    const rpcZAddresses = rpc<TAddressesResponse>('getaddressesbyaccount', [''])

    const [zAddresses, tAddresses] = await Promise.all([
      rpcTAddresses,
      rpcZAddresses,
    ])

    return {
      zAddresses: zAddresses.result,
      tAddresses: tAddresses.result,
    }
  } catch (err) {
    const message: string = err.message || ''
    toast(message, { type: 'error' })
    log.log(
      `profile/mySecurity/common/utils fetchAllAddress error: ${message}`,
      err,
    )
    return null
  }
}

async function getPrivKeyAsString(
  address: string,
  method: string,
): Promise<string | null> {
  try {
    const res = await rpc<TPrivKeyResponse>(method, [address])
    return res.result
  } catch (err) {
    const message: string = err.message || ''
    toast(message, { type: 'error' })
    log.log(
      `profile/mySecurity/common/utils getPrivKeyAsString error: ${message}`,
      err,
    )
    return null
  }
}

async function getPastelIDs(): Promise<TPastelID[] | null> {
  try {
    const res = await rpc<TPastelIDResponse>('pastelid', ['list'])
    return res.result
  } catch (err) {
    const message: string = err.message || ''
    toast(message, { type: 'error' })
    log.log(
      `profile/mySecurity/common/utils getPastelIDs error: ${message}`,
      err,
    )
    return null
  }
}

async function getPastelIDsWithContent(): Promise<
  TPastelWithContentID[] | null
> {
  try {
    const { result } = await rpc<TPastelIDResponse>('pastelid', ['list'])
    if (result) {
      const pastels = []
      for (let i = 0; i < result.length; i++) {
        const pastelKeysPath = store.getState().appInfo.pastelKeysPath
        if (pastelKeysPath) {
          const content = await readFileName(pastelKeysPath, result[i].PastelID)
          pastels.push({
            pastelId: result[i].PastelID,
            content: encodeURIComponent(
              LZUTF8.compress(JSON.stringify(content), {
                outputEncoding: 'Base64',
              }),
            ),
          })
        }
      }
      return pastels
    }
    return []
  } catch (err) {
    const msg: string = err?.message || ''
    toast(msg, { type: 'error' })
    log.log(`profile/mySecurity/common/utils getPastelIDs error: ${msg}`, err)
    return null
  }
}

async function getAddressBook(): Promise<TAddressBook[] | null> {
  const addresses = await AddressbookImpl.readAddressBook()

  return addresses
}

export async function fetchPastelIDAndPrivateKeys(): Promise<string | null> {
  const addresses = await fetchAllAddress()
  const zPrivateKeys: TPrivateKey[] = []
  const tPrivateKeys: TPrivateKey[] = []

  if (addresses) {
    const zAddresses = addresses.zAddresses
    for (let i = 0; i < zAddresses.length; i++) {
      const address = zAddresses[i]

      const privKey = await getPrivKeyAsString(address, 'z_exportkey')
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

      const privKey = await getPrivKeyAsString(address, 'dumpprivkey')
      if (privKey) {
        tPrivateKeys.push({
          address,
          privateKey: privKey,
        })
      }
    }
  }

  const pastelIDs = await getPastelIDsWithContent()
  const addressBook = await getAddressBook()
  const info = await readUsersInfo()

  if (
    pastelIDs?.length ||
    zPrivateKeys.length ||
    tPrivateKeys.length ||
    addressBook?.length
  ) {
    const data = {
      zPrivateKeys,
      tPrivateKeys,
      pastelIDs,
      addressBook,
      userInfo: info,
    }

    return encodeURIComponent(
      LZUTF8.compress(JSON.stringify(data), {
        outputEncoding: 'Base64',
      }),
    )
  }

  return null
}

export async function fetchAllKeysForPdf(): Promise<TDataForPdf> {
  const addresses = await fetchAllAddress()
  const zPrivateKeys: TPrivateKey[] = []
  const tPrivateKeys: TPrivateKey[] = []
  if (addresses) {
    const zAddresses = addresses.zAddresses
    for (let i = 0; i < zAddresses.length; i++) {
      const address = zAddresses[i]

      const privKey = await getPrivKeyAsString(address, 'z_exportkey')
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

      const privKey = await getPrivKeyAsString(address, 'dumpprivkey')
      if (privKey) {
        tPrivateKeys.push({
          address,
          privateKey: privKey,
        })
      }
    }
  }

  const pastelIDs = await getPastelIDs()
  const addressBook = await getAddressBook()
  return {
    addressKeys: zPrivateKeys.concat(tPrivateKeys),
    pastelIDs,
    addressBook,
  }
}

async function importPrivKey(key: string, rescan: boolean) {
  if (key.startsWith('p-secret-extended-key')) {
    try {
      await rpc<TPrivKeyResponse>('z_importkey', [key, rescan ? 'yes' : 'no'])
    } catch (err) {
      const message: string = err.message || ''
      log.log(
        `profile/mySecurity/common importPrivKey z_importkey error: ${message}`,
        err,
      )
      toast(message, { type: 'error' })
    }
  } else if (key.startsWith('zxview')) {
    try {
      await rpc<TPrivKeyResponse>('z_importviewingkey', [
        key,
        rescan ? 'yes' : 'no',
      ])
    } catch (err) {
      const message: string = err.message || ''
      log.log(
        `profile/mySecurity/common importPrivKey z_importviewingkey error: ${message}`,
        err,
      )
      toast(message, { type: 'error' })
    }
  } else {
    try {
      await rpc<TPrivKeyResponse>('importprivkey', [key, 'imported', rescan])
    } catch (err) {
      const message: string = err.message || ''
      log.log(
        `profile/mySecurity/common importPrivKey importprivkey error: ${message}`,
        err,
      )
      toast(message, { type: 'error' })
    }
  }
}

async function importAddressBook(addresses: TAddressBook[]) {
  const addressBook = await getAddressBook()
  const newAddressBook: TAddressBook[] = []

  for (let i = 0; i < addresses.length; i++) {
    const addressExists = addressBook?.some(
      address =>
        address.address === addresses[i].address &&
        address.label === addresses[i].label,
    )
    if (!addressExists) {
      newAddressBook.push(addresses[i])
    }
  }

  let addressBooks = newAddressBook
  if (addressBook?.length) {
    addressBooks = newAddressBook?.concat(addressBook)
  }

  if (addressBooks?.length) {
    await AddressbookImpl.writeAddressBook(addressBook?.concat(newAddressBook))
  }
}

async function importPastelId(pastelIds: TPastelWithContentID[]) {
  const pastelKeysPath = store.getState().appInfo.pastelKeysPath
  const pastelKeysWithoutAppDataPath = store.getState().appInfo
    .pastelKeysWithoutAppDataPath
  if (pastelKeysPath) {
    for (let i = 0; i < pastelIds.length; i++) {
      const pastelId = pastelIds[i]
      const content = JSON.parse(
        LZUTF8.decompress(decodeURIComponent(pastelId.content), {
          inputEncoding: 'Base64',
        }),
      )
      await writeFileContent(content, pastelKeysPath, pastelId.pastelId)
      if (pastelKeysWithoutAppDataPath) {
        await writeFileContent(
          content,
          pastelKeysWithoutAppDataPath,
          pastelId.pastelId,
        )
      }
    }
  }
}

export async function doImportPrivKeys(
  privateKeys: string,
  setPastelId?: (pastelId: string) => void,
): Promise<boolean> {
  if (privateKeys) {
    const keys = decompressPastelIDAndPrivateKeys(privateKeys)
    if (keys) {
      const addresses = await fetchAllAddress()
      const zPrivateKeys = keys.zPrivateKeys
      if (zPrivateKeys?.length) {
        for (let i = 0; i < zPrivateKeys.length; i++) {
          let isExist = false
          if (addresses) {
            const zAddresses = addresses.zAddresses
            isExist =
              zAddresses.find(
                address => address === zPrivateKeys[i].address,
              ) !== undefined
          }
          if (!isExist) {
            importPrivKey(
              zPrivateKeys[i].privateKey,
              i === zPrivateKeys.length - 1,
            )
              .then(() => {
                // noop
              })
              .catch(() => {
                // noop
              })
              .finally(() => {
                // noop
              })
          }
        }
      }

      const tPrivateKeys = keys.tPrivateKeys
      if (tPrivateKeys?.length) {
        for (let i = 0; i < tPrivateKeys.length; i++) {
          let isExist = false
          if (addresses) {
            const zAddresses = addresses.zAddresses
            isExist =
              zAddresses.find(
                address => address === zPrivateKeys[i].address,
              ) !== undefined
          }
          if (!isExist) {
            importPrivKey(
              tPrivateKeys[i].privateKey,
              i === tPrivateKeys.length - 1,
            )
              .then(() => {
                // noop
              })
              .catch(() => {
                // noop
              })
              .finally(() => {
                // noop
              })
          }
        }
      }

      const addressBook = keys.addressBook
      if (addressBook.length) {
        await importAddressBook(addressBook)
      }

      const userInfo = keys.userInfo
      if (userInfo.length) {
        const currentUsers = await readUsersInfo()
        const ids = new Set(currentUsers.map(u => u.username))
        const newUsers = [
          ...currentUsers,
          ...userInfo.filter(u => !ids.has(u.username)),
        ]
        await writeUsersInfo(newUsers, false)
        if (setPastelId) {
          setPastelId(userInfo[0].pastelId)
        }
      }

      const pastelIds = keys.pastelIDs
      if (pastelIds.length) {
        await importPastelId(pastelIds)
      }

      return true
    }
  }

  return false
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
