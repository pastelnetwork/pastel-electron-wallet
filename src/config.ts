import { remote } from 'electron'
import fs from 'fs-extra'
import path from 'path'

export const readSqliteDBFile = async (): Promise<Buffer> => {
  return await fs.promises.readFile(
    path.join(remote.app.getPath('appData'), 'Pastel', 'pasteldb.sqlite'),
  )
}

export const writeSqliteDBFile = async (buffer: Buffer): Promise<void> => {
  await fs.promises.writeFile(
    path.join(remote.app.getPath('appData'), 'Pastel', 'pasteldb.sqlite'),
    buffer,
    { flag: 'a+' },
  )
}
