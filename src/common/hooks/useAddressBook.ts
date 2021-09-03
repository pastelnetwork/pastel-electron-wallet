import { useState, useEffect, useMemo } from 'react'
import AddressbookImpl from '../utils/AddressbookImpl'
import { TAddressBook } from 'types/rpc'

export type TUseAddressBookResult = {
  addressBook: TAddressBook[]
  addressBookMap: Record<string, string>
  updateAddressBook: ({ address, label }: TAddressBook) => void
  isAddressBookLoaded: boolean
}

export const useAddressBook = (): TUseAddressBookResult => {
  const [addressBook, setAddressBook] = useState<TAddressBook[]>([])
  const addressBookMap = useMemo(
    () =>
      Object.fromEntries(addressBook.map(item => [item.address, item.label])),
    [addressBook],
  )
  const [isAddressBookLoaded, setIsAddressBookLoaded] = useState<boolean>(false)

  useEffect(() => {
    const getAddressBook = async function () {
      setIsAddressBookLoaded(false)
      const addrBook: TAddressBook[] = await AddressbookImpl.readAddressBook()
      setAddressBook(addrBook)
      setIsAddressBookLoaded(true)
    }
    getAddressBook()
  }, [])

  const updateAddressBook = async ({ address, label }: TAddressBook) => {
    const [book] = addressBook.filter(b => b.address === address) || []
    let newAddressBook = addressBook
    if (book) {
      newAddressBook = addressBook.map(b => {
        return {
          ...b,
          label: b.address === address ? label : b.label,
        }
      })
    } else {
      newAddressBook = addressBook.concat([
        {
          address,
          label,
        },
      ])
    }

    setAddressBook(newAddressBook)
    await AddressbookImpl.writeAddressBook(newAddressBook)
  }

  return { addressBook, addressBookMap, updateAddressBook, isAddressBookLoaded }
}
