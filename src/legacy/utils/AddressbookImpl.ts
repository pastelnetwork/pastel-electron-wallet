/* eslint-disable */

import fs from 'fs'
import path from 'path'
import { remote } from 'electron'
import { AddressBookEntry } from '../components/AppState' // Utility class to save / read the address book.

export default class AddressbookImpl {
  static async getFileName() {
    const dir = path.join(remote.app.getPath('appData'), 'pastelwallet')

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
      return JSON.parse((await fs.promises.readFile(fileName)) as any)
    } catch (err) {
      // File probably doesn't exist, so return nothing
      console.log(err)
      return []
    }
  }
}
