import fs from 'fs'
import path from 'path'
import log from 'electron-log'
import store from '../../redux/store'

type TAddressBook = {
  label: string
  address: string
}

export default class AddressbookImpl {
  static async getFileName(): Promise<string | null> {
    const dir = store.getState().appInfo.pastelWalletDirPath
    if (!dir) {
      throw new Error("Can't get path of address store")
    }

    if (!fs.existsSync(dir)) {
      await fs.promises.mkdir(dir)
    }

    const fileName = path.join(dir, 'AddressBook.json')
    if (!fs.existsSync(fileName)) {
      fs.createWriteStream(fileName)
    }

    return fileName
  }

  static async writeAddressBook(ab?: TAddressBook[]): Promise<void> {
    if (ab?.length) {
      const fileName = await this.getFileName()

      if (fileName) {
        await fs.promises.writeFile(fileName, JSON.stringify(ab))
      }
    }
  }

  static async readAddressBook(): Promise<TAddressBook[]> {
    const fileName = await this.getFileName()

    try {
      if (fileName) {
        const data = await fs.promises.readFile(fileName)

        if (data.length) {
          return JSON.parse(data.toString())
        }
      }

      return []
    } catch (err) {
      const message: string = err.message || ''
      log.log(
        `common/utils/AddressbookImpl readAddressBook error: ${message}`,
        err,
      )
      return []
    }
  }
}
