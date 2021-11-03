import fs from 'fs'
import path from 'path'
import log from 'electron-log'

import store from '../../redux/store'

export type TUserInfo = {
  username: string
  password: string
  newPassword: string
  pastelId: string
  addresses?: string[]
  pastelIds?: string[]
}

export const getFileName = async (): Promise<string | null> => {
  const dir = store.getState().appInfo.pastelWalletDirPath
  if (!dir) {
    throw new Error("Can't get path of User store")
  }

  if (!fs.existsSync(dir)) {
    await fs.promises.mkdir(dir)
  }

  const fileName = path.join(dir, 'User.json')
  if (!fs.existsSync(fileName)) {
    fs.createWriteStream(fileName)
  }

  return fileName
}

export const readUsersInfo = async (): Promise<TUserInfo[]> => {
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

export const writeUsersInfo = async (
  users: TUserInfo[],
  isNews?: boolean,
): Promise<void> => {
  if (users.length) {
    const fileName = await getFileName()

    if (fileName) {
      let currentUsers: TUserInfo[] = []
      if (!isNews) {
        currentUsers = await readUsersInfo()
      }
      await fs.promises.writeFile(
        fileName,
        JSON.stringify(currentUsers.concat(users)),
      )
    }
  }
}

export const setAutoSignIn = (): void => {
  localStorage.setItem('pastelAutoSignIn', 'true')
}

export const getAutoSignIn = (): boolean => {
  return localStorage.getItem('pastelAutoSignIn') === 'true'
}
