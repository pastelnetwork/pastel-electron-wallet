import React, { useEffect, useState } from 'react'
import {
  Document,
  Page,
  PDFDownloadLink,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer'
import dayjs from 'dayjs'

import { Button } from '../../../../common/components/Buttons'
import { QRCodeGEnerator } from '../../../pastelPaperWalletGenerator'
import Card from '../../components/Card'
import { TRPCConfig } from '../../Profile'
import {
  fetchAllKeysForPdf,
  TDataForPdf,
  addLineBreakForContent,
  addLineBreakFoFullrContent,
} from '../common/utils'

type TCrypto = {
  currencyName?: string
  rpcConfig: TRPCConfig
  qrcodeData: string
}

type TPDFDocumentProps = {
  allKeys: TDataForPdf
  currencyName?: string
  title: string
  qrcodeData: string
}

const pdfStyles = StyleSheet.create({
  viewer: {
    width: '100%',
    height: '100%',
  },
  page: {
    width: '100%',
    paddingTop: '12px',
  },
  section: {
    width: '100%',
    margin: 0,
    padding: 20,
  },
  contentTop: {
    display: 'flex',
    width: '100%',
    marginBottom: '40px',
    paddingBottom: '20px',
    borderBottom: '2px dashed #000',
    flexDirection: 'row',
  },
  contentItem: {
    margin: '0',
  },
  contentTitle: {
    marginTop: '0',
    marginBottom: '5px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#000',
  },
  contentValue: {
    marginTop: '0',
    fontSize: '12px',
    fontWeight: 'normal',
    wordBreak: 'break-all',
    color: '#000',
  },
  contentValuePrivateKey: {
    marginTop: '0',
    paddingRight: '10px',
    fontSize: '12px',
    fontWeight: 'normal',
    wordBreak: 'break-all',
    color: '#000',
  },
  marginTop20: {
    marginTop: '20px',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingBottom: '40px',
    borderBottom: '2px solid #000',
  },
  mainContentFull: {
    width: '100%',
    paddingBottom: '40px',
    borderBottom: '2px solid #000',
  },
  topMedia: {
    width: '35%',
    maxWidth: '180px',
    marginRight: '30px',
  },
  contentWrapper: {
    width: '75%',
  },
  mainContentWrapper: {
    width: '65%',
  },
  mainMedia: {
    width: '35%',
    maxWidth: '240px',
    textAlign: 'right',
  },
  topImg: {
    width: '100%',
  },
  mainImg: {
    width: '100%',
  },
})

export const PDFDocument = ({
  allKeys,
  currencyName,
  title,
  qrcodeData,
}: TPDFDocumentProps): JSX.Element => {
  return (
    <Document title={title} keywords={qrcodeData}>
      <Page size='A4' style={pdfStyles.page}>
        {allKeys.addressKeys?.map((privateKey, idx) => (
          <View style={pdfStyles.section} key={idx}>
            <View style={pdfStyles.mainContent}>
              <View style={pdfStyles.mainContentWrapper}>
                <View style={pdfStyles.contentItem}>
                  <Text style={pdfStyles.contentTitle}>Private Key</Text>
                  <Text style={pdfStyles.contentValuePrivateKey}>
                    {addLineBreakForContent(privateKey.privateKey)}
                  </Text>
                </View>
                <View style={pdfStyles.marginTop20}>
                  <Text style={pdfStyles.contentTitle}>
                    {currencyName} Address (Sapling)
                  </Text>
                  <Text style={pdfStyles.contentValue}>
                    {addLineBreakForContent(privateKey.address)}
                  </Text>
                </View>
              </View>
              <View style={pdfStyles.mainMedia}>
                <QRCodeGEnerator address={privateKey.address} />
              </View>
            </View>
          </View>
        ))}
        {allKeys.pastelIDs?.map((pastelID, idx) => (
          <View style={pdfStyles.section} key={idx}>
            <View style={pdfStyles.mainContent}>
              <View style={pdfStyles.contentItem}>
                <Text style={pdfStyles.contentTitle}>PastelID</Text>
                <Text style={pdfStyles.contentValue}>
                  {addLineBreakFoFullrContent(pastelID.PastelID)}
                </Text>
              </View>
            </View>
          </View>
        ))}
        {allKeys.addressBook?.map((addressBook, idx) => (
          <View style={pdfStyles.section} key={idx}>
            <View style={pdfStyles.mainContentFull}>
              <View style={pdfStyles.contentItem}>
                <Text style={pdfStyles.contentTitle}>Label:</Text>
                <Text style={pdfStyles.contentValue}>{addressBook.label}</Text>
              </View>
              <View style={pdfStyles.marginTop20}>
                <Text style={pdfStyles.contentTitle}>Address:</Text>
                <Text style={pdfStyles.contentValue}>
                  {addLineBreakFoFullrContent(addressBook.address)}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </Page>
    </Document>
  )
}

const CryptoKey = (props: TCrypto): JSX.Element => {
  const { currencyName, rpcConfig, qrcodeData } = props
  const [allKeys, setAllKeys] = useState<TDataForPdf>({
    addressKeys: [],
    pastelIDs: [],
    addressBook: [],
  })

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchAllKeysForPdf(rpcConfig)
      setAllKeys(result)
    }
    fetchData()
  }, [])

  const fileName = `${currencyName || 'LSP'}_Paper_Wallet__Private_Keys_${dayjs(
    new Date(),
  ).format('MM_DD_YYYY__HH_MM_ss')}`

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
    <PDFDownloadLink
      document={
        <PDFDocument
          allKeys={allKeys}
          currencyName={currencyName}
          title={fileName}
          qrcodeData={qrcodeData}
        />
      }
      fileName={fileName}
      className='block w-full'
    >
      <Button variant='secondary' className='w-full font-extrabold relative'>
        Download PDF with All Your Keys
      </Button>
    </PDFDownloadLink>
  )

  return (
    <>
      <Card
        title='Backup Your Crypto Keys'
        description={description}
        content=''
        footer={footer}
      />
      <div className='h-0 w-0 hidden'>
        <PDFViewer>
          <PDFDocument
            allKeys={allKeys}
            currencyName={currencyName}
            title={fileName}
            qrcodeData={qrcodeData}
          />
        </PDFViewer>
      </div>
    </>
  )
}

export default CryptoKey
