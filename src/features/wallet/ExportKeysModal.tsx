import React, { useEffect, useState } from 'react'
import {
  Document,
  Page,
  PDFDownloadLink,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'

import { TitleModal } from 'common/components/Modal'
import { InputExportKey } from 'common/components/Inputs'
import { Button } from 'common/components/Buttons'
import { useCurrencyName } from 'common/hooks/appInfo'
import { QRCodeGEnerator } from '../pastelPaperWalletGenerator'
import DownloadWhite from 'common/assets/icons/ico-download-white.svg'

import { WalletRPC } from '../../api/pastel-rpc'
import dayjs from 'dayjs'

type TPDFDocumentProps = {
  address: string
  privateKey: string
  currencyName: string
  title: string
}

const pdfStyles = StyleSheet.create({
  viewer: {
    width: '100%',
    height: '100%',
  },
  page: {
    flexDirection: 'row',
  },
  section: {
    margin: 0,
    padding: 20,
    flexGrow: 1,
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
  },
  contentValue: {
    marginTop: '0',
    fontSize: '12px',
    fontWeight: 'normal',
    wordBreak: 'break-all',
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
const breakChar = '\u00ad'
const addLineBreakForContent = (str: string) => {
  return str.replace(/(.{40})/g, `$1${breakChar}`)
}

function PDFDocument({
  address,
  currencyName,
  privateKey,
  title,
}: TPDFDocumentProps) {
  return (
    <Document title={title}>
      <Page size='A4' style={pdfStyles.page}>
        <View style={pdfStyles.section}>
          <View style={pdfStyles.contentTop}>
            <View style={pdfStyles.topMedia}>
              <QRCodeGEnerator address={address} />
            </View>
            <View style={pdfStyles.contentWrapper}>
              <Text style={pdfStyles.contentTitle}>
                {currencyName} Address (Sapling)
              </Text>
              <Text style={pdfStyles.contentValue}>
                {addLineBreakForContent(address)}
              </Text>
            </View>
          </View>
          <View style={pdfStyles.mainContent}>
            <View style={pdfStyles.mainContentWrapper}>
              <View style={pdfStyles.contentItem}>
                <Text style={pdfStyles.contentTitle}>Private Key</Text>
                <Text style={pdfStyles.contentValue}>
                  {addLineBreakForContent(privateKey)}
                </Text>
              </View>
              <View style={pdfStyles.marginTop20}>
                <Text style={pdfStyles.contentTitle}>
                  {currencyName} Address (Sapling)
                </Text>
                <Text style={pdfStyles.contentValue}>
                  {addLineBreakForContent(address)}
                </Text>
              </View>
            </View>
            <View style={pdfStyles.mainMedia}>
              <QRCodeGEnerator address={address} />
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export type TExportKeysModalProps = {
  isOpen: boolean
  address: string
  handleClose: () => void
}

const ExportKeysModal = ({
  isOpen,
  address,
  handleClose,
}: TExportKeysModalProps): JSX.Element => {
  const currencyName = useCurrencyName()
  const [privateKey, setPrivateKey] = useState('')
  const [havePDFLink, setHavePDFLink] = useState(false)

  useEffect(() => {
    const walletRPC = new WalletRPC()
    const getKeys = async () => {
      setHavePDFLink(false)
      const privKey = await walletRPC.getPrivKeyAsString(address)
      setPrivateKey(privKey)
      setHavePDFLink(true)
    }
    getKeys()
  }, [address])

  const getPdfFilename = () => {
    const key = address.substr(0, 16)
    const datetime = dayjs().format('MM_DD_YYYY__HH_MM_ss')
    return `${currencyName}_Paper_Wallet__Address_${key}_${datetime}.pdf`
  }
  return (
    <TitleModal
      isOpen={isOpen}
      handleClose={() => handleClose()}
      title='Generate Paper Wallet for Address'
      classNames='max-w-[598px]'
    >
      <div className='mt-[11px] pr-22px'>
        <InputExportKey
          value={address}
          label='Address'
          className='mb-42px'
          labelClassName='text-h4 leading-6 font-medium text-gray-71 mb-6px'
          type='text'
          onChange={() => {
            //noop
          }}
        />
        <InputExportKey
          value={privateKey}
          label='Private Key for Address'
          className='mb-[27px]'
          labelClassName='text-h4 leading-6 font-medium text-gray-71 mb-6px'
          type='password'
          onChange={() => {
            //noop
          }}
        />
        <Button className='w-full flex  items-center'>
          <div className='flex items-center relative w-full justify-center'>
            {havePDFLink && (
              <PDFDownloadLink
                document={
                  <PDFDocument
                    address={address}
                    privateKey={privateKey}
                    currencyName={currencyName}
                    title={getPdfFilename()}
                  />
                }
                fileName={getPdfFilename()}
                className='inline-block w-full h-full absolute top-0 left-0'
              />
            )}
            <img src={DownloadWhite} className='py-3.5' />
            <div className='ml-2 text-white text-h5-heavy'>
              Download Paper Wallet (PDF)
            </div>
          </div>
        </Button>
      </div>
    </TitleModal>
  )
}

export default ExportKeysModal
