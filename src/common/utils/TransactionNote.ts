import fs from 'fs'
import path from 'path'
import log from 'electron-log'
import store from '../../redux/store'

export type TTransactionNote = {
  txnId: string
  privateNote: string
}

export const getFileName = async (): Promise<string | null> => {
  const dir = store.getState().appInfo.pastelWalletDirPath
  if (!dir) {
    throw new Error("Can't get path of transaction store")
  }

  if (!fs.existsSync(dir)) {
    await fs.promises.mkdir(dir)
  }

  const fileName = path.join(dir, 'TransactionNote.json')
  if (!fs.existsSync(fileName)) {
    fs.createWriteStream(fileName)
  }

  return fileName
}

export const writeTransaction = async (
  transaction?: TTransactionNote[],
): Promise<void> => {
  if (transaction?.length) {
    const fileName = await getFileName()

    if (fileName) {
      await fs.promises.writeFile(fileName, JSON.stringify(transaction))
    }
  }
}

export const readTransaction = async (): Promise<TTransactionNote[]> => {
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
    const message: string = err.message || ''
    log.error(`common/utils/transaction readTransaction error: ${message}`, err)
    return []
  }
}

export const saveTransactionNote = async (
  transaction: TTransactionNote,
): Promise<TTransactionNote[] | null> => {
  try {
    const currentTransactionList = await readTransaction()
    const newTransactionList = currentTransactionList.concat(transaction)
    await writeTransaction(newTransactionList)
    return newTransactionList
  } catch (err) {
    const message: string = err.message || ''
    log.error(
      `common/utils/transaction importTransaction error: ${message}`,
      err,
    )
    throw err
  }
}
