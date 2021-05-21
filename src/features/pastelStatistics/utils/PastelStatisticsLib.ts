import { SqlValue } from 'sql.js'
import { TLineChartData } from '../../pastelDB/type'

export type TPeriod = '2h' | '2d' | '4d' | '30d' | '60d' | '180d' | '1y' | 'all'

export function getStartPoint(period: TPeriod): number {
  let duration = 1
  switch (period) {
    case '2h':
      duration = 2
      break
    case '2d':
      duration = 2 * 24
      break
    case '4d':
      duration = 4 * 24
      break
    case '30d':
      duration = 30 * 24
      break
    case '60d':
      duration = 60 * 24
      break
    case '180d':
      duration = 180 * 24
      break
    case '1y':
      duration = 360 * 24
      break
    case 'all':
      return 0
  }
  return Date.now() - duration * 60 * 60 * 1000
}

export function transformDifficultyInfo(
  hashrates: SqlValue[][],
  period: TPeriod,
): TLineChartData {
  const dataX: string[] = []
  const dataY: number[] = []

  const startDate = getStartPoint(period)

  for (let i = 0; i < hashrates.length; i++) {
    if (hashrates[i][4] !== null) {
      const createTime = Number(hashrates[i][4])
      if (createTime > startDate) {
        dataY.push(Number(hashrates[i][3]))
        dataX.push(new Date(createTime).toLocaleString())
      }
    }
  }

  return { dataX, dataY }
}
