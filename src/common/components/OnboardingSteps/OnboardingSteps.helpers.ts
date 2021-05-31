import creditCardIco from '../../assets/icons/ico-credit-card.svg'
import creditCardIcoGray from '../../assets/icons/ico-credit-card-gray.svg'
import downloadIco from '../../assets/icons/ico-download.svg'
import downloadIcoGray from '../../assets/icons/ico-download-gray.svg'
import refreshIco from '../../assets/icons/ico-refresh.svg'
import refreshIcoGray from '../../assets/icons/ico-refresh-gray.svg'

export const STEPS = [
  {
    id: 1,
    iconActive: downloadIco,
    iconDefault: downloadIcoGray,
    label: 'Primary login',
    stepIconLabel: 'primary login step',
  },
  {
    id: 2,
    iconActive: downloadIco,
    iconDefault: downloadIcoGray,
    label: 'Backup access method',
    stepIconLabel: 'Backup access method step',
  },
  {
    id: 3,
    iconActive: creditCardIco,
    iconDefault: creditCardIcoGray,
    label: 'Payment method',
    stepIconLabel: 'Payment method step',
  },
  {
    id: 4,
    iconActive: refreshIco,
    iconDefault: refreshIcoGray,
    label: 'Registration fee',
    stepIconLabel: 'Registration fee step',
  },
]
