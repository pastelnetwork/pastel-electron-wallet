/* eslint-disable */

import fs from 'fs'
import path from 'path'

import store from '../../redux/store'

export default class AddressbookImpl {
  static async getFileName() {
    const dir = store.getState().appInfo.locatePastelWalletDir

    if (!fs.existsSync(dir)) {
      await fs.promises.mkdir(dir)
    }

    const fileName = path.join(dir, 'AddressBook.json')
    return fileName
  } // Write the address book to disk

  static async writeAddressBook(ab: any) {
    const fileName = await this.getFileName()
    await fs.promises.writeFile(fileName, JSON.stringify(ab))
  } // Read the address book

  static async readAddressBook() {
    const fileName = await this.getFileName()

    try {
      if (!fs.existsSync(fileName)) {
        return ''
      }
      const content = await fs.promises.readFile(fileName)
      if (content.toString()) {
        return JSON.parse(content as any)
      }
      return ''
    } catch (err) {
      // File probably doesn't exist, so return nothing
      console.log(err)
      return []
    }
  }
}
