import React, { useEffect, useState } from 'react'
import { TitleModal } from '../../common/components/Modal'
import { InputExportKey } from 'common/components/Inputs'
import Button from '../../common/components/Button/Button'
import DownloadWhite from '../../common/assets/icons/ico-download-white.svg'

import {
  Document,
  Page,
  PDFDownloadLink,
  Text,
  View,
} from '@react-pdf/renderer'
import { WalletRPC } from '../../api/pastel-rpc'
import { useAppSelector } from 'redux/hooks'
import { RootState } from 'redux/store'

type TPDFDocumentProps = {
  publicKey: string
  privateKey: string
}

const PDFDocument = ({ publicKey, privateKey }: TPDFDocumentProps) => {
  return (
    <Document title='Crypto Keys'>
      <Page size='A4'>
        <View>
          <Text>Public Key: {privateKey}</Text>
        </View>
        <View>
          <Text>Private Key: {publicKey}</Text>
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

const ExportKeysModal: React.FC<ExportKeysModalProps> = ({
  isOpen,
  address,
  handleClose,
}) => {
  const [publicKey, setPublicKey] = useState('')
  const [privateKey, setPrivateKey] = useState('')
  const { url, username, password } = useAppSelector<RootState['pastelConf']>(
    ({ pastelConf }) => pastelConf,
  )

  useEffect(() => {
    const rpcConfig = { url, username, password }
    const walletRPC = new WalletRPC(rpcConfig)
    const getKeys = async () => {
      const pubKey = await walletRPC.getViewKeyAsString(address)
      const privKey = await walletRPC.getPrivKeyAsString(address)
      setPublicKey(pubKey)
      setPrivateKey(privKey)
    }
    getKeys()
  }, [address])

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
        <Button className='w-full flex justify-center items-center'>
          <div className='flex items-center ml-5 relative'>
            <PDFDownloadLink
              document={
                <PDFDocument publicKey={publicKey} privateKey={privateKey} />
              }
              fileName={`${address}.pdf`}
              className='inline-block w-full h-full absolute top-0 left-0'
            ></PDFDownloadLink>
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
