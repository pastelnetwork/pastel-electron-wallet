import * as React from 'react'

import Typography from '../../../../common/components/Typography/Typography'
import Radio from '../../../../common/components/Radio/Radio'
import { colors } from '../../../../common/theme/colors'

import icoDownload from '../../../../common/assets/icons/ico-download-2.svg'
import icoCopy from '../../../../common/assets/icons/ico-copy.svg'

import * as Styles from './FeeSteps.styles'

const FeeSteps: React.FC = () => {
  const [selectedOption, setSelectedOption] = React.useState(1)

  return (
    <Styles.Container>
      <Typography variant='h3' weight={800}>
        Choose exchange
      </Typography>
      <Typography variant='body3' color={colors.text.secondary}>
        and copy address
      </Typography>
      <Styles.RadioContainer>
        <Radio
          isChecked={selectedOption === 1}
          clickHandler={() => setSelectedOption(1)}
        >
          Binance.com
        </Radio>
        <Radio
          isChecked={selectedOption === 2}
          clickHandler={() => setSelectedOption(2)}
        >
          Kucoin.com
        </Radio>
        <Radio
          isChecked={selectedOption === 3}
          clickHandler={() => setSelectedOption(3)}
        >
          Bircoin.com
        </Radio>
        <Radio
          isChecked={selectedOption === 4}
          clickHandler={() => setSelectedOption(4)}
        >
          Choose your own variant in web-browser
        </Radio>
      </Styles.RadioContainer>
      <Styles.DownloadContainer>
        <Styles.Container>
          <Typography variant='body2'>
            ps19jxlfdl8mhnsqlf7x0cwlh...eq0v34
          </Typography>
        </Styles.Container>
        <Styles.Image src={icoDownload} />
        <Styles.Image src={icoCopy} />
      </Styles.DownloadContainer>
      <Typography variant='body3' color={colors.text.secondary}>
        copy Pastel wallet address
      </Typography>
    </Styles.Container>
  )
}

export default FeeSteps
