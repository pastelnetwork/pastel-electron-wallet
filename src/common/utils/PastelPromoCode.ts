import fs from 'fs'
import path from 'path'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import log from 'electron-log'
import { WalletRPC } from 'api/pastel-rpc'
import store from '../../redux/store'
import { useQuery, UseQueryResult } from 'react-query'

export type TPastelPromoCode = {
  label: string
  address: string
}

export const getFileName = async (): Promise<string | null> => {
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

export const writePastelPromoCode = async (
  pastelPromoCode?: TPastelPromoCode[],
): Promise<void> => {
  if (pastelPromoCode?.length) {
    const fileName = await getFileName()

    if (fileName) {
      await fs.promises.writeFile(fileName, JSON.stringify(pastelPromoCode))
    }
  }
}

export const readPastelPromoCode = async (): Promise<TPastelPromoCode[]> => {
  const fileName = await getFileName()

  try {
    if (fileName) {
      const data = await fs.promises.readFile(fileName)

      if (data.length) {
        return JSON.parse(data.toString())
      }
    }

    return []
  } catch (err) {
    log.error(
      `common/utils/PastelPromoCode readPastelPromoCode error: ${err}`,
      err,
    )
    return []
  }
}

export const useReadPastelPromoCode = (): UseQueryResult<
  TPastelPromoCode[]
> => {
  return useQuery('pastelPromoCode', () => readPastelPromoCode())
}

export const importPastelPromoCode = async (
  pastelPromoCode: string,
  isNotSave?: boolean,
): Promise<string | null> => {
  try {
    const walletRPC = new WalletRPC()
    const address = await walletRPC.importPrivKey(pastelPromoCode, true)
    if (!isNotSave) {
      const currentPromoCodeList = await readPastelPromoCode()
      const alreadySaved = currentPromoCodeList.some(
        pc => pc.address === address,
      )

      if (!alreadySaved) {
        const newDate: string = dayjs().format('MM/DD/YYYY-HH:mm') || ''
        const newPromoCode = currentPromoCodeList.concat({
          label: `Pastel Promo Code ${newDate}`,
          address,
        })
        await writePastelPromoCode(newPromoCode)
      }
    }
    return address
  } catch (err) {
    toast(err.message, { type: 'error' })
    log.error(
      `common/utils/PastelPromoCode importPastelPromoCode error: ${err.message}`,
      err,
    )
    return null
  }
}
