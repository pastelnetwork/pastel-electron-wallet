import React, { useState } from 'react'
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

export type ExportKeysModalProps = {
  isOpen: boolean
  handleClose: () => void
}

const ExportKeysModal: React.FC<ExportKeysModalProps> = ({
  isOpen,
  handleClose,
}) => {
  const [publicKey, setPublicKey] = useState('')
  const [privateKey, setPrivateKey] = useState('')
  return (
    <TitleModal
      isOpen={isOpen}
      handleClose={() => handleClose()}
      size='598px'
      title='Export keys'
    >
      <div>
        <InputExportKey
          onChange={e => setPublicKey(e.target.value)}
          label='Public key'
          className='mb-7'
        />
        <InputExportKey
          onChange={e => setPrivateKey(e.target.value)}
          label='Private key'
          className='mb-10'
        />
        <Button className='w-full px-1 py-6px h-12'>
          <div className='flex items-center ml-5 relative'>
            <PDFDownloadLink
              document={
                <PDFDocument publicKey={publicKey} secretKey={privateKey} />
              }
              fileName='example.pdf'
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
