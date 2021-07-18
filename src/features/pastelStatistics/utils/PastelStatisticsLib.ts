import { SqlValue } from 'sql.js'

import {
  TLineChartData,
  TMultiLineChartData,
  TScatterChartData,
} from '../../pastelDB/type'

export type TPeriod = '2h' | '2d' | '4d' | '30d' | '60d' | '180d' | '1y' | 'all'

export type TGranularity = '1d' | '30d' | '1y' | 'all'

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

export function transformPriceInfo(
  prices: SqlValue[][],
  period: TPeriod,
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

export const makeDownloadFileName = (
  currencyName: string | number,
  title: string,
): string => {
  let imageTitle = ''
  const date = new Date()

  imageTitle = title
  if (title === 'mempoolsize') {
    imageTitle = 'mempool_size'
  } else if (title === 'transactionfee') {
    imageTitle = 'transaction_fee'
  } else if (title === 'averageblocksize') {
    imageTitle = 'average_block_size'
  } else if (title === 'networktotals') {
    imageTitle = 'network_total'
  } else if (title === 'transactionsinblock') {
    imageTitle = 'transactions_in_block'
  } else if (title === 'transactionspersecond') {
    imageTitle = 'transactions_per_second'
  }

  const dateTime = `${
    date.getMonth() + 1
  }_${date.getDate()}_${date.getFullYear()}__${date.getHours()}_${date.getMinutes()}`

  return `${currencyName}_${imageTitle}_${dateTime}`
}

export function transformHashrateInfo(
  hashrateInfo: SqlValue[][],
  period: TPeriod,
): TLineChartData {
  const dataX: string[] = []
  const dataY: number[] = []

  const startDate = getStartPoint(period)

  for (let i = 0; i < hashrateInfo.length; i++) {
    if (hashrateInfo[i][13] !== null) {
      const createTime = Number(hashrateInfo[i][13])
      if (createTime > startDate) {
        dataY.push(Number(hashrateInfo[i][8]) / 1000000)
        dataX.push(new Date(createTime).toLocaleString())
      }
    }
  }

  return { dataX, dataY }
}

export function transformNetTotals(
  nettotals: SqlValue[][],
  period: TPeriod,
): TMultiLineChartData {
  const dataX: string[] = []
  const dataY1: number[] = []
  const dataY2: number[] = []

  const startDate = getStartPoint(period)

  for (let i = 0; i < nettotals.length; i++) {
    if (nettotals[i][3] !== null) {
      const createTime = Number(nettotals[i][3])
      if (createTime > startDate) {
        const recv = Number(nettotals[i][1])
        const sent = Number(nettotals[i][2])
        dataY1.push(recv)
        dataY2.push(sent)
        dataX.push(new Date(createTime).toLocaleString())
      }
    }
  }

  return { dataX, dataY1, dataY2 }
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

export function transformBlockSizeInfo(
  blocksizes: SqlValue[][],
): TLineChartData {
  const dataX: string[] = []
  const dataY: number[] = []

  for (let i = 0; i < blocksizes.length; i++) {
    dataY.push(Number(blocksizes[i][1]) / 1000)
    dataX.push(String(blocksizes[i][0]))
  }

  return { dataX, dataY }
}

export function transformTransactionFee(
  transactionFees: SqlValue[][],
  period: TPeriod,
): TLineChartData {
  const dataX: string[] = []
  const dataY: number[] = []

  const startDate = getStartPoint(period)

  for (let i = 0; i < transactionFees.length; i++) {
    if (transactionFees[i][9] !== null && transactionFees[i][3] !== 0) {
      const createTime = Number(transactionFees[i][9])
      if (createTime > startDate) {
        dataY.push(Number(transactionFees[i][3]))
        dataX.push(new Date(createTime).toLocaleString())
      }
    }
  }
  return { dataX, dataY }
}

export function transformTransactionPerSecond(
  blockinfos: SqlValue[][],
): TLineChartData {
  const dataY: number[] = []
  const dataX: string[] = []

  for (let i = 0; i < blockinfos.length; i++) {
    if (blockinfos[i][1]) {
      dataY.push(Number(blockinfos[i][1]) / (24 * 3600))
      dataX.push(String(blockinfos[i][0]))
    }
  }
  return { dataY, dataX }
}

export function transformTransactionInBlock(
  blockinfos: SqlValue[][],
  period: TPeriod,
): TScatterChartData {
  const data: number[][] = []
  const dataX: string[] = []

  const startDate = getStartPoint(period)

  for (let i = 0; i < blockinfos.length; i++) {
    if (blockinfos[i][8]) {
      const createTime = Number(blockinfos[i][19])
      if (createTime > startDate) {
        const txs = JSON.parse(String(blockinfos[i][8]))
        const xAxisValue = Number(blockinfos[i][4])
        const yAxisValue = txs.length
        data.push([xAxisValue, yAxisValue])
        dataX.push(new Date(createTime).toLocaleString())
      }
    }
  }
  return { data, dataX }
}
