import { Database } from 'better-sqlite3'

export type TDbLastBlock = {
  lastBlock: string
}

export const getLastBlock = (db: Database): string | null => {
  return db.prepare('SELECT lastBlock FROM lastBlock LIMIT 1').get().lastBlock
}

export const updateLastBlock = (db: Database, lastBlock: string): void => {
  db.prepare('UPDATE lastBlock SET lastBlock = $lastBlock').run({ lastBlock })
}
