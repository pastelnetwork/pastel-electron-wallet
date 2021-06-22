import * as React from 'react'

import Typography from '../../../../common/components/Typography/Typography'
import Radio from '../../../../common/components/Radio/Radio'
import { colors } from '../../../../common/theme/colors'

import * as Styles from './PaymentSteps.styles'

const BackupSteps = (): JSX.Element => {
  const [selectedOption, setSelectedOption] = React.useState(1)

  return (
    <Styles.Container>
      <Typography variant='h3' weight={800}>
        Choose payment method
      </Typography>
      <Typography variant='body3' color={colors.text.secondary}>
        1,000 PSL fee
      </Typography>
      <Styles.RadioContainer>
        <Radio
          checked={selectedOption === 1}
          onChange={() => setSelectedOption(1)}
        >
          Centralized exchange (Coinbase, Binance etc.)
        </Radio>
        <Radio
          checked={selectedOption === 2}
          onChange={() => setSelectedOption(2)}
        >
          Decentralized exchange (Uniwap etc.)
        </Radio>
        <Radio
          checked={selectedOption === 3}
          onChange={() => setSelectedOption(3)}
        >
          PSL Address Private Key Import
        </Radio>
        <Radio
          checked={selectedOption === 4}
          onChange={() => setSelectedOption(4)}
        >
          Airdrop promotion code
        </Radio>
      </Styles.RadioContainer>
    </Styles.Container>
  )
}

export default BackupSteps
