import { Database } from 'better-sqlite3'

export type TDbStatisticInfo = {
  id: number
  solutions: number
  difficulty: number
  createdAt: number
}

export const insertStatisticInfo = (
  db: Database,
  values: Omit<TDbStatisticInfo, 'id' | 'createdAt'>,
): void => {
  db.prepare(
    `INSERT INTO statisticInfo(
    solutions,
    difficulty,
    createdAt
  ) VALUES (
    $solutions,
    $difficulty,
    $createdAt
  )`,
  ).run({
    createdAt: Date.now(),
    ...values,
  })
}
