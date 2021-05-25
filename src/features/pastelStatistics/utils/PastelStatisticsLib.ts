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
  difficulties: SqlValue[][],
  period: TPeriod,
): TLineChartData {
  const dataX: string[] = []
  const dataY: number[] = []

  const startDate = getStartPoint(period)

  for (let i = 0; i < difficulties.length; i++) {
    if (difficulties[i][3] !== null) {
      const createTime = Number(difficulties[i][3])
      if (createTime > startDate) {
        dataY.push(Number(difficulties[i][2]))
        dataX.push(new Date(createTime).toLocaleString())
      }
    }
  }

  return { dataX, dataY }
}

export function transformMempoolInfo(
  mempoolInfo: SqlValue[][],
  period: TPeriod,
): TLineChartData {
  const dataX: string[] = []
  const dataY: number[] = []

  const startDate = getStartPoint(period)

  for (let i = 0; i < mempoolInfo.length; i++) {
    if (mempoolInfo[i][4] !== null && mempoolInfo[i][3] !== 0) {
      const createTime = Number(mempoolInfo[i][4])
      if (createTime > startDate) {
        const bytes = Number(mempoolInfo[i][3]) / 1000
        dataY.push(bytes)
        dataX.push(new Date(createTime).toLocaleString())
      }
    }
  }

  return { dataX, dataY }
}
