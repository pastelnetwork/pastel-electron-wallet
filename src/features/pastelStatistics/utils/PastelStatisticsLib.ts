import {
  TLineChartData,
  TMultiLineChartData,
  TScatterChartData,
} from '../../pastelDB/type'
import { TDbStatisticInfo } from '../../pastelDB/statistic/statisticInfo.repo'
import { TDbPriceInfo } from '../../pastelDB/price/priceInfo.repo'
import { TDbMiningInfo } from '../../pastelDB/mining/miningInfo.repo'
import { TDbNetTotals } from '../../pastelDB/network/netTotals.repo'
import { TDbMemPoolInfo } from '../../pastelDB/blockchain/memPoolInfo.repo'
import { TDbRawMemPoolInfo } from '../../pastelDB/blockchain/rawMemPoolInfo.repo'
import { TDbBlockInfo } from '../../pastelDB/blockchain/blockInfo.repo'

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
  difficulties: TDbStatisticInfo[],
  period: TPeriod,
): TLineChartData {
  const dataX: string[] = []
  const dataY: number[] = []

  const startDate = getStartPoint(period)

  for (let i = 0; i < difficulties.length; i++) {
    if (difficulties[i].createdAt !== null) {
      const createTime = Number(difficulties[i].createdAt)
      if (createTime > startDate) {
        dataY.push(Number(difficulties[i].difficulty))
        dataX.push(new Date(createTime).toLocaleString())
      }
    }
  }

  return { dataX, dataY }
}

export function transformPriceInfo(
  prices: TDbPriceInfo[],
  period: TPeriod,
): TMultiLineChartData {
  const dataX: string[] = []
  const dataY1: number[] = []
  const dataY2: number[] = []

  const startDate = getStartPoint(period)

  for (let i = 0; i < prices.length; i++) {
    const createTime = Number(prices[i].createdAt)
    if (createTime > startDate) {
      const usd = Number(prices[i].priceUsd)
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
  hashrateInfo: TDbMiningInfo[],
  period: TPeriod,
): TLineChartData {
  const dataX: string[] = []
  const dataY: number[] = []

  const startDate = getStartPoint(period)

  for (let i = 0; i < hashrateInfo.length; i++) {
    if (hashrateInfo[i].createdAt !== null) {
      const createTime = Number(hashrateInfo[i].createdAt)
      if (createTime > startDate) {
        dataY.push(Number(hashrateInfo[i].networkhashps) / 1000000)
        dataX.push(new Date(createTime).toLocaleString())
      }
    }
  }

  return { dataX, dataY }
}

export function transformNetTotals(
  nettotals: TDbNetTotals[],
  period: TPeriod,
): TMultiLineChartData {
  const dataX: string[] = []
  const dataY1: number[] = []
  const dataY2: number[] = []

  const startDate = getStartPoint(period)

  for (let i = 0; i < nettotals.length; i++) {
    if (nettotals[i].timemillis !== null) {
      const createTime = Number(nettotals[i].timemillis)
      if (createTime > startDate) {
        const recv = Number(nettotals[i].totalbytesrecv)
        const sent = Number(nettotals[i].totalbytessent)
        dataY1.push(recv)
        dataY2.push(sent)
        dataX.push(new Date(createTime).toLocaleString())
      }
    }
  }

  return { dataX, dataY1, dataY2 }
}

export function transformMempoolInfo(
  mempoolInfo: TDbMemPoolInfo[],
  period: TPeriod,
): TLineChartData {
  const dataX: string[] = []
  const dataY: number[] = []

  const startDate = getStartPoint(period)

  for (let i = 0; i < mempoolInfo.length; i++) {
    if (mempoolInfo[i].createdAt !== null && mempoolInfo[i].usage !== 0) {
      const createTime = Number(mempoolInfo[i].createdAt)
      if (createTime > startDate) {
        const bytes = Number(mempoolInfo[i].usage) / 1000
        dataY.push(bytes)
        dataX.push(new Date(createTime).toLocaleString())
      }
    }
  }

  return { dataX, dataY }
}

export function transformBlockSizeInfo(
  blocksizes: { date: string; averageSize: number }[],
): TLineChartData {
  const dataX: string[] = []
  const dataY: number[] = []

  for (let i = 0; i < blocksizes.length; i++) {
    dataY.push(Number(blocksizes[i].averageSize) / 1000)
    dataX.push(String(blocksizes[i].date))
  }

  return { dataX, dataY }
}

export function transformTransactionFee(
  transactionFees: TDbRawMemPoolInfo[],
  period: TPeriod,
): TLineChartData {
  const dataX: string[] = []
  const dataY: number[] = []

  const startDate = getStartPoint(period)

  for (let i = 0; i < transactionFees.length; i++) {
    if (transactionFees[i].createdAt !== null && transactionFees[i].fee !== 0) {
      const createTime = Number(transactionFees[i].createdAt)
      if (createTime > startDate) {
        dataY.push(Number(transactionFees[i].fee))
        dataX.push(new Date(createTime).toLocaleString())
      }
    }
  }
  return { dataX, dataY }
}

export function transformTransactionPerSecond(
  blockinfos: { date: string; count: number }[],
): TLineChartData {
  const dataY: number[] = []
  const dataX: string[] = []

  for (let i = 0; i < blockinfos.length; i++) {
    if (blockinfos[i].count) {
      dataY.push(Number(blockinfos[i].count) / (24 * 3600))
      dataX.push(String(blockinfos[i].date))
    }
  }
  return { dataY, dataX }
}

export function transformTransactionInBlock(
  blockinfos: TDbBlockInfo[],
  period: TPeriod,
): TScatterChartData {
  const data: number[][] = []
  const dataX: string[] = []

  const startDate = getStartPoint(period)

  for (let i = 0; i < blockinfos.length; i++) {
    if (blockinfos[i].tx) {
      const createTime = Number(blockinfos[i].createdAt)
      if (createTime > startDate) {
        const txs = JSON.parse(String(blockinfos[i].tx))
        const xAxisValue = Number(blockinfos[i].height)
        const yAxisValue = txs.length
        data.push([xAxisValue, yAxisValue])
        dataX.push(new Date(createTime).toLocaleString())
      }
    }
  }
  return { data, dataX }
}
