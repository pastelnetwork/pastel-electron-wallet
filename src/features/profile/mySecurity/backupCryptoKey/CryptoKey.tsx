import * as React from 'react'
import {
  Document,
  Page,
  PDFDownloadLink,
  Text,
  View,
} from '@react-pdf/renderer'

import Button from '../../../../common/components/MySecurity/Button/Button'
import Key from '../../../../common/components/MySecurity/Crypto/Crypto'
import {
  Title,
  Description,
} from '../../../../common/components/MySecurity/Typography/Typography'
import * as Styles from './CryptoKey.style'
import { DescriptionContainer, BodyContainer } from '../MySecurity.style'

interface PDFDocumentProps {
  privateKey: string
  secretKey: string
}

const PDFDocument = ({ privateKey, secretKey }: PDFDocumentProps) => {
  return (
    <Document title={'Crypto Keys'}>
      <Page size='A4'>
        <View>
          <Text>Private Key: {privateKey}</Text>
        </View>
        <View>
          <Text>Secret Key: {secretKey}</Text>
        </View>
      </Page>
    </Document>
  )
}

const CryptoKey: React.FC = () => {
  const privateKey = 'ps19jxlfdl8mhnsqlf7x0cwlhx0cwlheq0v34'
  const secretKey = 'ps19jxlfdl8mhnsqlf7x0cwlhx0cwlheq0v34'

  return (
    <>
      <Title>Backup crypto-keys</Title>
      <DescriptionContainer>
        <Description>Some description goes here</Description>
      </DescriptionContainer>
      <BodyContainer>
        <Key label='Private Key'>{privateKey}</Key>
        <Styles.Spacer />
        <Key label='Secret Key'>{secretKey}</Key>
      </BodyContainer>
      <Button>
        Download PDF with all keys
        <PDFDownloadLink
          document={
            <PDFDocument privateKey={privateKey} secretKey={secretKey} />
          }
          fileName={'crypto_keys'}
          className='inline-block w-full h-full absolute top-o left-0'
        />
      </Button>
    </>
  )
}

export default CryptoKey
