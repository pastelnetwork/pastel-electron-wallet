import Difficulty from '../assets/images/difficulty.jpg'
import PSLPrice from '../assets/images/pslprice.jpg'
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
]

export const themes = [
  {
    name: 'theme1',
    backgroundColor: '#100c2a',
    splitLineColor: '#202021',
    color: '#abaac1',
  },
  {
    name: 'theme2',
    backgroundColor: '#FFF7C6',
    stack: 'confidence-band',
    splitLineColor: '#C7C4CC',
    smooth: true,
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
