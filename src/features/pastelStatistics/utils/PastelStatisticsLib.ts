import { SqlValue } from 'sql.js'

import { TLineChartData, TMultiLineChartData } from '../../pastelDB/type'

export function getStartPoint(period: string): number {
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
  period: string,
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

export function transformPriceInfo(
  prices: SqlValue[][],
  period: string,
): TMultiLineChartData {
  const dataX: string[] = []
  const dataY1: number[] = []
  const dataY2: number[] = []

  const startDate = getStartPoint(period)

  for (let i = 0; i < prices.length; i++) {
    const createTime = Number(prices[i][2])
    if (createTime > startDate) {
      const usd = Number(prices[i][1])
      const btc = (usd * 167.98) / 8336807
      dataY1.push(usd)
      dataY2.push(btc)
      dataX.push(new Date(createTime).toLocaleString())
    }
  }
  return { dataX, dataY1, dataY2 }
}
