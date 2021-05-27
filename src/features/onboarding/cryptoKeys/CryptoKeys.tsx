import * as React from 'react'
import { Link, useHistory } from 'react-router-dom'

import Typography from '../../../common/components/Typography/Typography'
import Tooltip from '../../../common/components/Tooltip/Tooltip'
import Button from '../../../common/components/Button/Button'
import { colors } from '../../../common/theme/colors'
import * as ROUTES from '../../../common/utils/constants/routes'
import infoIco from '../../../common/assets/icons/ico-info.svg'

import * as Styles from './CryptoKeys.styles'

const CryptoKeys: React.FC = () => {
  const history = useHistory()

  return (
    <Styles.Container>
      <Typography variant='h1' weight={800}>
        Crypto-keys access method
      </Typography>
      <Typography variant='body1' color={colors.text.secondary}>
        Copy-paste your keys to recover account
      </Typography>
      <Styles.KeyContainer>
        <Styles.KeyHeader>
          <Typography variant='body1' color={colors.text.gray600}>
            Public key
          </Typography>
          <Styles.InfoContainer>
            <Tooltip content='Public-key cryptography, or asymmetric cryptography, is a cryptographic system which uses pairs of keys'>
              <Styles.InfoIcon src={infoIco} alt='info' />
            </Tooltip>
          </Styles.InfoContainer>
        </Styles.KeyHeader>
        <Styles.KeyContent>
          <Typography variant='body2' color={colors.text.gray800}>
            ps19jxlfdl8mhnsqlf7x0cwlhczn69x9tcev2rawnjp7e9n8ecjms9
          </Typography>
        </Styles.KeyContent>
      </Styles.KeyContainer>
      <Styles.KeyContainer>
        <Styles.KeyHeader>
          <Typography variant='body1' color={colors.text.gray600}>
            Secret key
          </Typography>
          <Styles.InfoContainer>
            <Tooltip content='Secret-key cryptography, or asymmetric cryptography, is a cryptographic system which uses pairs of keys'>
              <Styles.InfoIcon src={infoIco} alt='info' />
            </Tooltip>
          </Styles.InfoContainer>
        </Styles.KeyHeader>
        <Styles.KeyContent>
          <Typography variant='body2' color={colors.text.gray800}>
            ps19jxlfdl8mhnsqlf7x0cwlhczn69x9tcev2rawnjp7e9n8ecjms9
          </Typography>
        </Styles.KeyContent>
      </Styles.KeyContainer>
      <Link to={ROUTES.NEW_PASSWORD}>
        <Button style={{ marginTop: '30px', width: '100%' }}>Submit</Button>
      </Link>
      <Styles.BackLink onClick={() => history.push(ROUTES.PASSWORD_RECOVERY)}>
        <Typography variant='body2' color={colors.button.default}>
          Back
        </Typography>
      </Styles.BackLink>
    </Styles.Container>
  )
}

export default CryptoKeys
