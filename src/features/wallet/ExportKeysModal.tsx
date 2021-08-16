import React, { useEffect, useState } from 'react'
import { TitleModal } from 'common/components/Modal'
import { InputExportKey } from 'common/components/Inputs'
import { Button } from 'common/components/Buttons'
import { useCurrencyName } from 'common/hooks/appInfo'
import Typography, { TypographyVariant } from 'common/components/Typography'
import DownloadWhite from 'common/assets/icons/ico-download-white.svg'

import {
  Document,
  Page,
  PDFDownloadLink,
  Text,
  View,
} from '@react-pdf/renderer'
import { WalletRPC } from '../../api/pastel-rpc'
import dayjs from 'dayjs'

type TPDFDocumentProps = {
  publicKey: string
  privateKey: string
}

const PDFDocument = ({ publicKey, privateKey }: TPDFDocumentProps) => {
  return (
    <Document title='Crypto Keys'>
      <Page size='A4'>
        <View>
          <Text>Public Key: {publicKey}</Text>
        </View>
        <View>
          <Text>Private Key: {privateKey}</Text>
        </View>
      </Page>
    </Document>
  )
}

export type ExportKeysModalProps = {
  isOpen: boolean
  address: string
  handleClose: () => void
}

const ExportKeysModal = ({
  isOpen,
  address,
  handleClose,
}: ExportKeysModalProps): JSX.Element => {
  const currencyName = useCurrencyName()
  const [publicKey, setPublicKey] = useState('')
  const [privateKey, setPrivateKey] = useState('')
  const [havePDFLink, setHavePDFLink] = useState(false)

  useEffect(() => {
    const walletRPC = new WalletRPC()
    const getKeys = async () => {
      setHavePDFLink(false)
      const pubKey = await walletRPC.getViewKeyAsString(address)
      const privKey = await walletRPC.getPrivKeyAsString(address)
      setPublicKey(pubKey)
      setPrivateKey(privKey)
      setHavePDFLink(true)
    }
    getKeys()
  }, [address])

  const getPdfFilename = () => {
    const key = (publicKey || privateKey).substr(0, 16)
    const datetime = dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]')
    return `[${currencyName}]_Paper_Wallet__Address_${key}_${datetime}.pdf`
  }
  return (
    <TitleModal
      isOpen={isOpen}
      handleClose={() => handleClose()}
      size='[598px]'
      title='Generate Paper Wallet for Address'
      classNames='w-[598px]'
    >
      <div className='mt-[11px]'>
        <InputExportKey
          value={publicKey}
          onChange={e => setPublicKey(e.target.value)}
          label='Address'
          className='mb-42px'
          labelClassName='text-h4 leading-6 font-medium text-gray-71 mb-6px'
          type='text'
        />
        <InputExportKey
          value={privateKey}
          onChange={e => setPrivateKey(e.target.value)}
          label='Private Key for Address'
          className='mb-[27px]'
          labelClassName='text-h4 leading-6 font-medium text-gray-71 mb-6px'
        />
        <Button className='w-full flex  items-center'>
          <div className='flex items-center ml-5 relative w-full justify-center'>
            {havePDFLink && (
              <PDFDownloadLink
                document={
                  <PDFDocument publicKey={publicKey} privateKey={privateKey} />
                }
                fileName={getPdfFilename()}
                className='inline-block w-full h-full absolute top-0 left-0'
              />
            )}
            <img src={DownloadWhite} className='py-3.5' />
            <Typography
              variant={TypographyVariant.h5_16_24_heavy}
              customColor='text-white'
              className='ml-2'
            >
              Download Paper Wallet (PDF)
            </Typography>
          </div>
        </Button>
      </div>
    </TitleModal>
  )
}

export default ExportKeysModal
