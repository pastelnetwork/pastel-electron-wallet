import fs from 'fs'
import { TAddressBook } from 'types/rpc'
import store from '../../redux/store'

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

// Write the address book to disk

const writeAddressBook = async (
  addressBooks: TAddressBook[],
): Promise<void> => {
  const { addressBookFileName } = store.getState().appInfo
  await fs.promises.writeFile(addressBookFileName, JSON.stringify(addressBooks))
} // Read the address book

const readAddressBook = async (): Promise<Promise<TAddressBook[]>> => {
  const { addressBookFileName } = store.getState().appInfo
  try {
    const buffer = await fs.promises.readFile(addressBookFileName)
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
