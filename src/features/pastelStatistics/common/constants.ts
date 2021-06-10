import Difficulty from '../assets/images/difficulty.jpg'
import AverageBlockSize from '../assets/images/averageblocksize.jpg'
import PSLPrice from '../assets/images/pslprice.jpg'
import Hashrate from '../assets/images/hashrate.jpg'
import Nettotals from '../assets/images/nettotals.jpg'
import Mempoolsize from '../assets/images/mempoolsize.jpg'
import TransactionsPerSecond from '../assets/images/transactionspersecond.jpg'
import TransactionsInBlock from '../assets/images/transactionsinblock.jpg'
import { TGranularity, TPeriod } from '../utils/PastelStatisticsLib'
import { TCsvHeaderType } from './types'

export const pastelChartFields = [
  {
    name: 'Average Block Size',
    routeName: '/statistics/averageblocksizeovertime',
    backgroundImage: AverageBlockSize,
  },
  {
    name: 'Difficulty',
    routeName: '/statistics/difficultyovertime',
    backgroundImage: Difficulty,
  },
  {
    name: 'Price',
    routeName: '/statistics/priceovertime',
    backgroundImage: PSLPrice,
  },
  {
    name: 'Hashrate',
    routeName: '/statistics/hashrateovertime',
    backgroundImage: Hashrate,
  },
  {
    name: 'Network Total',
    routeName: '/statistics/networktotalsovertime',
    backgroundImage: Nettotals,
  },
  {
    name: 'Mempool Size',
    routeName: '/statistics/mempoolsizeovertime',
    backgroundImage: Mempoolsize,
  },
  {
    name: 'Transactions Per Second',
    routeName: '/statistics/transactionpersecondovertime',
    backgroundImage: TransactionsPerSecond,
  },
  {
    name: 'Transactions In Block',
    routeName: '/statistics/transactionsinblockovertime',
    backgroundImage: TransactionsInBlock,
  },
]

export const themes = [
  {
    name: 'theme1',
    backgroundColor: '#0d0d0d',
    splitLineColor: '#202021',
    color: '#abaac1',
  },
  {
    name: 'theme2',
    backgroundColor: '#AFDBF5',
    stack: 'confidence-band',
    splitLineColor: '#C7C4CC',
    color: '#100c2a',
  },
  {
    name: 'theme3',
    backgroundColor: '#FFF',
    splitLineColor: '#EEE',
    color: '#202021',
  },
]

export const periods: TPeriod[][] = [
  ['2h', '2d', '4d', 'all'],
  ['30d', '180d', '1y', 'all'],
]

export const granularities: TGranularity[][] = [['1d', '30d', '1y']]

const commonCsvFields = [
  { label: 'Value', key: 'value' },
  { label: 'Created time', key: 'time' },
]

export const csvHeaders: TCsvHeaderType = {
  averageblocksize: commonCsvFields,
  difficulty: commonCsvFields,
  hashrate: commonCsvFields,
  mempoolsize: commonCsvFields,
  networktotals: [
    { label: 'Receive, Sent', key: 'value' },
    { label: 'Created time', key: 'time' },
  ],
  transactionsinblock: [
    { label: 'Block Height', key: 'height' },
    { label: 'Transactions', key: 'transactions' },
    { label: 'Created time', key: 'time' },
  ],
  transactionspersecond: [
    { label: 'Transactions', key: 'value' },
    { label: 'Created time', key: 'time' },
  ],
}

export const pricesCSVHeaders = [
  { label: 'USD Price', key: 'usd' },
  { label: 'BTC Price', key: 'btc' },
  { label: 'Created time', key: 'time' },
]

export const CHART_THEME_BACKGROUND_DEFAULT_COLOR = '#0d0d0d'
export const CHART_DEFAULT_PERIOD = 'all'
export const BLOCK_CHART_DEFAULT_GRANULARITY = '1d'
export const BLOCK_CHART_DEFAULT_PERIOD = '30d'
