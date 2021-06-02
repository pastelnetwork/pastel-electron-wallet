import React from 'react'
import {
  Document,
  Page,
  PDFDownloadLink,
  Text,
  View,
} from '@react-pdf/renderer'
import dayjs from 'dayjs'

import Button from '../../../../common/components/MySecurity/Button/Button'
import Key from '../../../../common/components/MySecurity/Crypto/Crypto'
import Card from '../../../../common/components/MySecurity/Card'

interface IProps {
  currencyName: string
}
interface IPDFDocumentProps {
  publicKey: string
  secretKey: string
}

const PDFDocument = ({ publicKey, secretKey }: IPDFDocumentProps) => {
  return (
    <Document title='Crypto Keys'>
      <Page size='A4'>
        <View>
          <Text>Private Key: {publicKey}</Text>
        </View>
        <View>
          <Text>Secret Key: {secretKey}</Text>
        </View>
      </Page>
    </Document>
  )
}

const CryptoKey: React.FC<IProps> = props => {
  const { currencyName } = props
  const publicKey =
    'ps19jxlfdl8mhnsqlxlfdl8mhnsqlf7x0cwlhx0cwlhf7x0cwlhx0cwlheq0v34'
  const secretKey =
    'ps19jxlfdl8mhnsqlf7x0cwxlfdl8mhnsqlf7x0cwlhx0cwlhlhx0cwlheq0v34'

  const content = (
    <div className='flex flex-col gap-30px'>
      <Key label='Public key'>{publicKey}</Key>
      <Key label='Secret Key'>{secretKey}</Key>
    </div>
  )

  const footer = (
    <Button>
      Download PDF with all keys
      <PDFDownloadLink
        document={<PDFDocument publicKey={publicKey} secretKey={secretKey} />}
        fileName={`${
          currencyName ? currencyName : 'PSL'
        }_Paper_Wallet__Shielded_Address_${dayjs(new Date()).format(
          'MM_DD_YYYY__HH_MM_ss',
        )}`}
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
