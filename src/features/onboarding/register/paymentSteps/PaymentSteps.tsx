import * as React from 'react'

import Typography from '../../../../common/components/Typography/Typography'
import Radio from '../../../../common/components/Radio/Radio'
import { colors } from '../../../../common/theme/colors'

import * as Styles from './PaymentSteps.styles'

const BackupSteps: React.FC = () => {
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
          isChecked={selectedOption === 1}
          clickHandler={() => setSelectedOption(1)}
        >
          Centralized exchange (Coinbase, Binance etc.)
        </Radio>
        <Radio
          isChecked={selectedOption === 2}
          clickHandler={() => setSelectedOption(2)}
        >
          Decentralized exchange (Uniwap etc.)
        </Radio>
        <Radio
          isChecked={selectedOption === 3}
          clickHandler={() => setSelectedOption(3)}
        >
          PSL Address Private Key Import
        </Radio>
        <Radio
          isChecked={selectedOption === 4}
          clickHandler={() => setSelectedOption(4)}
        >
          Airdrop promotion code
        </Radio>
      </Styles.RadioContainer>
    </Styles.Container>
  )
}

export default BackupSteps
