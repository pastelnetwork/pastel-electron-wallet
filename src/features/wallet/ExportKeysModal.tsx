import React, { useEffect, useState } from 'react'
import { TitleModal } from 'common/components/Modal'
import { InputExportKey } from 'common/components/Inputs'
import { Button } from 'common/components/Buttons'
import DownloadWhite from 'common/assets/icons/ico-download-white.svg'

import {
  Document,
  Page,
  PDFDownloadLink,
  Text,
  View,
} from '@react-pdf/renderer'
import { ControlRPC, WalletRPC } from '../../api/pastel-rpc'
import { useAppSelector } from 'redux/hooks'
import { RootState } from 'redux/store'
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
  const [currencyName, setCurrencyName] = useState('PSL')
  const [publicKey, setPublicKey] = useState('')
  const [privateKey, setPrivateKey] = useState('')
  const [havePDFLink, setHavePDFLink] = useState(false)
  const { url, username, password } = useAppSelector<RootState['pastelConf']>(
    ({ pastelConf }) => pastelConf,
  )

  useEffect(() => {
    const rpcConfig = { url, username, password }
    const walletRPC = new WalletRPC(rpcConfig)
    const controlRPC = new ControlRPC(rpcConfig)
    const getKeys = async () => {
      setHavePDFLink(false)
      const info = await controlRPC.fetchInfo()
      const pubKey = await walletRPC.getViewKeyAsString(address)
      const privKey = await walletRPC.getPrivKeyAsString(address)
      setPublicKey(pubKey)
      setPrivateKey(privKey)
      setCurrencyName(info.currencyName)
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
      size='598px'
      title='Export keys'
    >
      <div>
        <InputExportKey
          value={publicKey}
          onChange={e => setPublicKey(e.target.value)}
          label='Public key'
          className='mb-7'
        />
        <InputExportKey
          value={privateKey}
          onChange={e => setPrivateKey(e.target.value)}
          label='Private key'
          className='mb-10'
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
            <span className='text-sm font-extrabold ml-3'>
              Download Paper Wallet (PDF)
            </span>
          </div>
        </Button>
      </div>
    </TitleModal>
  )
}

export default ExportKeysModal
