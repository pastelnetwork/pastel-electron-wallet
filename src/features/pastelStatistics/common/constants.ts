import Difficulty from '../assets/images/difficulty.jpg'
import PSLPrice from '../assets/images/pslprice.jpg'
import Hashrate from '../assets/images/hashrate.jpg'
import { TPeriod } from '../utils/PastelStatisticsLib'

export const pastelChartFields = [
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
  ['30d', '60d', '180d', '1y', 'all'],
]

export const csvHeaders = [
  { label: 'Value', key: 'value' },
  { label: 'Created time', key: 'time' },
]

export const pricesCSVHeaders = [
  { label: 'USD Price', key: 'usd' },
  { label: 'BTC Price', key: 'btc' },
  { label: 'Created time', key: 'time' },
]

export const CHART_THEME_BACKGROUND_DEFAULT_COLOR = '#0d0d0d'
export const CHART_DEFAULT_PERIOD = '2h'
