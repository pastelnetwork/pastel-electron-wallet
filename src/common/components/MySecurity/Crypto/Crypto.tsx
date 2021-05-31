import React from 'react'
import { clipboard } from 'electron'

import { Description } from '../Typography/Typography'
import IconClipboard from '../../../assets/icons/ico-clipboard.svg'
import * as Styles from './Crypto.style'

interface CryptoProps {
  label: string
  children: string
}

const Crypto: React.FC<CryptoProps> = ({ label, children }) => {
  const copyClipboard = () => {
    clipboard.writeText(children)
  }

  return (
    <>
      <Description>{label}</Description>
      <Styles.Container>
        <Styles.Key>{children}</Styles.Key>
        <Styles.IconButton onClick={copyClipboard} src={IconClipboard} />
      </Styles.Container>
    </>
  )
}

export default Crypto
