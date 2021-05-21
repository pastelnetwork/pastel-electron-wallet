import bg1 from '../assets/images/bg1.png'
import bg2 from '../assets/images/bg2.png'
import bg3 from '../assets/images/bg3.png'
import bg4 from '../assets/images/bg4.png'
import bg5 from '../assets/images/bg5.png'
import bg6 from '../assets/images/bg6.png'
import bg7 from '../assets/images/bg7.png'
import bg8 from '../assets/images/bg8.png'
import bg9 from '../assets/images/bg9.png'

export const pastelChartFields = [
  {
    name: 'Difficulty',
    routeName: '/difficultyovertime',
    backgroundImage: bg1,
  },
  { name: 'Hashrate', routeName: '/hashrateovertime', backgroundImage: bg2 },
  { name: 'PSL Price', routeName: '/priceovertime', backgroundImage: bg3 },
  {
    name: 'Rawtransaction',
    routeName: '/rawtransaction',
    backgroundImage: bg4,
  },
  { name: 'Txoutsetinfo', routeName: '/txoutsetinfo', backgroundImage: bg5 },
  { name: 'Walletinfo', routeName: '/walletinfo', backgroundImage: bg6 },
  {
    name: 'RawMempool',
    routeName: '/rawmempoolovertime',
    backgroundImage: bg7,
  },
  {
    name: 'MempoolSize',
    routeName: '/mempoolsizeovertime',
    backgroundImage: bg8,
  },
  { name: 'Miners Revenue', routeName: '/minersrevenue', backgroundImage: bg9 },
]
