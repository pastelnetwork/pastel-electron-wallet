import fs from 'fs'
import path from 'path'
import dayjs from 'dayjs'
import { WalletRPC } from 'api/pastel-rpc'
import store from '../../redux/store'

export type TPastelPromoCode = {
  label: string
  address: string
  privateKey: string
}

export default class PastelPromoCode {
  static async getFileName(): Promise<string | null> {
    const dir = store.getState().appInfo.pastelWalletDirPath
    if (!dir) {
      throw new Error("Can't get path of pastel promo code store")
    }

    if (!fs.existsSync(dir)) {
      await fs.promises.mkdir(dir)
    }

    const fileName = path.join(dir, 'PastelPromoCode.json')
    if (!fs.existsSync(fileName)) {
      fs.createWriteStream(fileName)
    }

    return fileName
  }

  static async writePastelPromoCode(
    pastelPromoCode?: TPastelPromoCode[],
  ): Promise<void> {
    if (pastelPromoCode?.length) {
      const fileName = await this.getFileName()

      if (fileName) {
        await fs.promises.writeFile(fileName, JSON.stringify(pastelPromoCode))
      }
    }
  }

  static async readPastelPromoCode(): Promise<TPastelPromoCode[]> {
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
      console.log(
        `common/utils/PastelPromoCode readPastelPromoCode error: ${err}`,
        err,
      )
      return []
    }
  }

  static async importPastelPromoCode(
    pastelPromoCode: string,
  ): Promise<boolean> {
    try {
      const walletRPC = new WalletRPC()
      const currentPromoCode = await PastelPromoCode.readPastelPromoCode()
      const promoCode = currentPromoCode.filter(
        pc => pc.privateKey === pastelPromoCode,
      )
      if (promoCode.length < 1) {
        const address = await walletRPC.importPrivKey(pastelPromoCode, true)
        if (address) {
          const newPromoCode = currentPromoCode.concat({
            label: `Pastel Promo Code ${dayjs().format('MM/DD/YYYY-HH:mm')}`,
            address,
            privateKey: pastelPromoCode,
          })
          PastelPromoCode.writePastelPromoCode(newPromoCode)
        }
      }
      return true
    } catch {
      return false
    }
  }
}
