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
import Card from '../../../../common/components/MySecurity/Card'

interface IPDFDocumentProps {
  privateKey: string
  secretKey: string
}

const PDFDocument = ({ privateKey, secretKey }: IPDFDocumentProps) => {
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

  const content = (
    <>
      <Key label='Private Key'>{privateKey}</Key>
      <Key label='Secret Key'>{secretKey}</Key>
    </>
  )

  const footer = (
    <Button>
      Download PDF with all keys
      <PDFDownloadLink
        document={<PDFDocument privateKey={privateKey} secretKey={secretKey} />}
        fileName={'crypto_keys'}
        className='inline-block w-full h-full absolute top-o left-0'
      />
    </Button>
  )

  return (
    <Card
      title='Backup crypto-keys'
      description='Some description goes here'
      content={content}
      footer={footer}
    />
  )
}

export default CryptoKey
