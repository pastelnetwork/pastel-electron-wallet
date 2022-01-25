import React, { useState, useCallback, ChangeEvent, useEffect } from 'react'
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

import { useCurrencyName } from 'common/hooks/appInfo'
import { Modal } from 'common/components/Modal'
import { Button } from 'common/components/Buttons'
import { InputPassword } from 'common/components/Inputs'
import { TAddressBook } from 'types/rpc'
import { QRCodeGEnerator } from '../../../pastelPaperWalletGenerator'
import { TPDFDocumentProps } from '../backupCryptoKey/CryptoKey'
import {
  fetchAllKeysForPdf,
  TDataForPdf,
  addLineBreakForContent,
  addLineBreakFoFullrContent,
  TPastelID,
  TPrivateKey,
} from '../common/utils'
import { translate } from 'features/app/translations'

export type TSecurityPasswordModal = {
  isOpen: boolean
  handleConfirm: () => void
  handleClose: () => void
  setCurrentPassword: (val: string) => void
  error?: string
  status: string
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

export function PDFDocument({
  allKeys,
  currencyName,
  title,
  qrcodeData,
}: TPDFDocumentProps): JSX.Element {
  const renderAddressBookContent = (addressBook: TAddressBook) => (
    <View style={pdfStyles.mainContentFull}>
      <View style={pdfStyles.contentItem}>
        <Text style={pdfStyles.contentTitle}>{translate('label')}:</Text>
        <Text style={pdfStyles.contentValue}>{addressBook.label}</Text>
      </View>
      <View style={pdfStyles.marginTop20}>
        <Text style={pdfStyles.contentTitle}>{translate('address')}:</Text>
        <Text style={pdfStyles.contentValue}>
          {addLineBreakFoFullrContent(addressBook.address)}
        </Text>
      </View>
    </View>
  )

  const renderPastelIdContent = (pastelID: TPastelID) => (
    <View style={pdfStyles.mainContent}>
      <View style={pdfStyles.contentItem}>
        <Text style={pdfStyles.contentTitle}>{translate('pastelID')}</Text>
        <Text style={pdfStyles.contentValue}>
          {addLineBreakFoFullrContent(pastelID.PastelID)}
        </Text>
      </View>
    </View>
  )

  const renderPrivateKeys = (privateKey: TPrivateKey) => (
    <View style={pdfStyles.mainContentWrapper}>
      <View style={pdfStyles.contentItem}>
        <Text style={pdfStyles.contentTitle}>{translate('privateKey')}</Text>
        <Text style={pdfStyles.contentValuePrivateKey}>
          {addLineBreakForContent(privateKey.privateKey)}
        </Text>
      </View>
      <View style={pdfStyles.marginTop20}>
        <Text style={pdfStyles.contentTitle}>
          {currencyName} {translate('address')} ({translate('sapling')})
        </Text>
        <Text style={pdfStyles.contentValue}>
          {addLineBreakForContent(privateKey.address)}
        </Text>
      </View>
    </View>
  )

  const renderPrivateKeyQRCode = (privateKey: TPrivateKey) => (
    <View style={pdfStyles.mainMedia}>
      <QRCodeGEnerator address={privateKey.address} />
    </View>
  )

  return (
    <Document title={title} keywords={qrcodeData}>
      <Page size='A4' style={pdfStyles.page}>
        {allKeys.addressKeys?.map(privateKey => (
          <View style={pdfStyles.section} key={privateKey.privateKey}>
            <View style={pdfStyles.mainContent}>
              {renderPrivateKeys(privateKey)}
              {renderPrivateKeyQRCode(privateKey)}
            </View>
          </View>
        ))}
        {allKeys.pastelIDs?.map(pastelID => (
          <View style={pdfStyles.section} key={pastelID.PastelID}>
            {renderPastelIdContent(pastelID)}
          </View>
        ))}
        {allKeys.addressBook?.map(addressBook => (
          <View style={pdfStyles.section} key={addressBook.address}>
            {renderAddressBookContent(addressBook)}
          </View>
        ))}
      </Page>
    </Document>
  )
}

export default function SecurityPasswordModal({
  isOpen,
  handleConfirm,
  setCurrentPassword,
  error,
  status,
  handleClose,
  qrcodeData,
}: TSecurityPasswordModal): JSX.Element {
  const currencyName = useCurrencyName()
  const [password, setPassword] = useState('')
  const [allKeys, setAllKeys] = useState<TDataForPdf>({
    addressKeys: [],
    pastelIDs: [],
    addressBook: [],
  })
  const vCurrencyName: string = currencyName || 'PSL'
  const date: string = dayjs(new Date()).format('MM_DD_YYYY__HH_MM_ss')
  const fileName = `${vCurrencyName}_Paper_Wallet__Private_Keys_${date}`

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchAllKeysForPdf()
      setAllKeys(result)
    }
    fetchData()
      .then(() => {
        // noop
      })
      .catch(() => {
        // noop
      })
      .finally(() => {
        // noop
      })
  }, [])

  useEffect(() => {
    if (status === 'success') {
      setPassword('')
      setCurrentPassword('')
    }
  }, [status])

  const handlePasswordChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value)
      setCurrentPassword(event.target.value)
    },
    [],
  )

  const renderPDFView = () => (
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
  )

  const renderDownloadPDFButton = () => (
    <div className='mt-[26px]'>
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
        <Button variant='default' className='w-full relative'>
          {translate('downloadPDFWithAllYourKeys')}
        </Button>
      </PDFDownloadLink>
    </div>
  )

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      className='max-w-lg'
      overlayClassName='bg-background-modal bg-opacity-60'
    >
      {status === 'success' ? (
        <div>
          <h2 className='mb-2'>{translate('yourPasswordHasBeenChanged')}</h2>
          <div className='text-gray-77 inline-block mb-4 text-h4 mt-3'>
            {translate('youCanDownloadTheNewBackupOfYourCryptoKeys')}
          </div>
          {renderDownloadPDFButton()}
        </div>
      ) : (
        <div>
          <h2 className='mb-2'>{translate('reEnterYourPassword')}</h2>
          <span className='text-gray-77 inline-block mb-4 text-h4'>
            {translate('toGetAccessToSecuritySettings')}
          </span>
          <div className='mb-[26px]'>
            <InputPassword
              labelClassName='text-gray-71 font-medium text-lg mb-1.5'
              label={translate('yourPassword')}
              value={password}
              onChange={handlePasswordChange}
              readOnly={status === 'loading'}
            />
            {error ? (
              <div className='text-red-fe text-xs leading-5 pt-1'>{error}</div>
            ) : null}
          </div>
          <Button
            variant='default'
            onClick={handleConfirm}
            className='w-full'
            disabled={!password || status === 'loading'}
          >
            {translate('confirm')}
          </Button>
        </div>
      )}
      {renderPDFView()}
    </Modal>
  )
}
