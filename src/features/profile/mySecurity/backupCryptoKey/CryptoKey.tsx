import React from 'react'
import {
  Document,
  Page,
  PDFDownloadLink,
  Text,
  View,
} from '@react-pdf/renderer'
import dayjs from 'dayjs'

import { Button } from '../../../../common/components/Buttons'
import Card from '../../components/Card'

type TCrypto = {
  currencyName?: string
}
type TPDFDocumentProps = {
  publicKey: string
  secretKey: string
}

const PDFDocument = ({ publicKey, secretKey }: TPDFDocumentProps) => {
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

const CryptoKey = (props: TCrypto): JSX.Element => {
  const { currencyName } = props
  const publicKey =
    'ps19jxlfdl8mhnsqlxlfdl8mhnsqlf7x0cwlhx0cwlhf7x0cwlhx0cwlheq0v34'
  const secretKey =
    'ps19jxlfdl8mhnsqlf7x0cwxlfdl8mhnsqlf7x0cwlhx0cwlhlhx0cwlheq0v34'

  const description = (
    <div className='max-w-330px'>
      Clicking the button below will generate a PDF “paper wallet,” which is a
      single file that contains all your Pastel secret information that gives
      control over your PastelID (idenity on the Pastel Network) and your PSL
      coins stored in this wallet. This file can be used to restore your account
      information on a new computer.
      <br />
      <br />
      <i className='font-normal'>Note:</i> Make sure you keep this file safe,
      since anyone with access to this file will be able to control your Pastel
      account and take your PSL coins.
    </div>
  )

  const footer = (
    <Button variant='secondary' className='w-full font-extrabold'>
      Download PDF with All Your Keys
      <PDFDownloadLink
        document={<PDFDocument publicKey={publicKey} secretKey={secretKey} />}
        fileName={`${
          currencyName ? currencyName : 'LSP'
        }_Paper_Wallet__Shielded_Address_${dayjs(new Date()).format(
          'MM_DD_YYYY__HH_MM_ss',
        )}`}
        className='inline-block w-full h-full absolute top-o left-0'
      />
    </Button>
  )

  return (
    <Card
      title='Backup Your Crypto Keys'
      description={description}
      content=''
      footer={footer}
    />
  )
}

export default CryptoKey
