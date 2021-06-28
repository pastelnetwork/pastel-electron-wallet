import fs from 'fs'
import path from 'path'
import { app, remote } from 'electron'
import { TAddressBook } from 'types/rpc'

const isSapling = (addr: string): boolean => {
  if (!addr) {
    return false
  }
  return (
    new RegExp('^ps[a-z0-9]{76}$').test(addr) ||
    new RegExp('^ptestsapling[a-z0-9]{76}$').test(addr)
  )
}

const isSprout = (addr: string): boolean => {
  if (!addr) {
    return false
  }
  return new RegExp('^P[a-zA-Z0-9]{94}$').test(addr)
}

const isZaddr = (addr: string): boolean => {
  if (!addr) {
    return false
  }
  return isSapling(addr) || isSprout(addr)
}

const isTransparent = (addr: string): boolean => {
  if (!addr) {
    return false
  }
  return new RegExp('^[tP][a-zA-Z0-9]{34}$').test(addr)
}

const getAddressBoolFileName = async (): Promise<string> => {
  const dir = path.join((app || remote.app).getPath('appData'), 'pastelwallet')

  if (!fs.existsSync(dir)) {
    await fs.promises.mkdir(dir)
  }

  const fileName = path.join(dir, 'AddressBook.json')

  return fileName
} // Write the address book to disk

const writeAddressBook = async (
  addressBooks: TAddressBook[],
): Promise<void> => {
  const fileName = await getAddressBoolFileName()
  await fs.promises.writeFile(fileName, JSON.stringify(addressBooks))
} // Read the address book

const readAddressBook = async (): Promise<Promise<TAddressBook[]>> => {
  const fileName = await getAddressBoolFileName()

  try {
    const buffer = await fs.promises.readFile(fileName)
    return JSON.parse(buffer.toString())
  } catch (err) {
    // File probably doesn't exist, so return nothing
    console.log(err)
    return []
  }
}

export {
  isSapling,
  isSprout,
  isTransparent,
  isZaddr,
  writeAddressBook,
  readAddressBook,
}
