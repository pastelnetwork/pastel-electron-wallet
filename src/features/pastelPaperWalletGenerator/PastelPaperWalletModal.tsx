import {
  Document,
  Page,
  PDFDownloadLink,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'
import React from 'react'
import Modal from 'react-modal'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import styles from './PastelPaperWalletModal.module.css'
import { closePastelPaperWalletModal } from './PastelPaperWalletModalSlice'
import QRCodeGEnerator from './QRCodeGEnerator'

type PastelPaperWalletModalProps = {
  info: {
    currencyName: string
  }
  currentName: string
}

interface PDFDocumentProps {
  address: string
  privateKey: string
  currencyName: string
  title: string
}

const splitStringIntoChunks = (str: string, chunkQuantity: number) => {
  if (chunkQuantity > str.length || str.length < 16) {
    return [str]
  }

  const chunkSize = Math.round(str.length / chunkQuantity)
  const chunks = []

  str.split('').map((v: string, index: number) => {
    chunks.push(str.substr(index * chunkSize, chunkSize))
  })

  chunks.push(str.substr((chunkQuantity - 1) * chunkSize))
  return chunks
}

const addLineBreakForContent = (str: string) => {
  return str.replace(/(.{40})/g, `$1${breakChar}`)
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

function PDFDocument({
  address,
  currencyName,
  privateKey,
  title,
}: PDFDocumentProps) {
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

export default function PastelPaperWalletModal({
  info,
  currentName,
}: PastelPaperWalletModalProps): JSX.Element | null {
  const { address, privateKey, modalIsOpen } = useAppSelector(
    state => state.pastelPaperWalletModal,
  )
  const dispatch = useAppDispatch()

  if (!modalIsOpen || !privateKey) {
    return null
  }

  const generateFileName = () => {
    const firstPartOfTheAddress = splitStringIntoChunks(address, 6)[0]
    const title = `PSL_Paper_Wallet__${
      currentName || 'Shielded'
    }_Address_${firstPartOfTheAddress}`
    const date = new Date()
    const dateTime = `${
      date.getMonth() + 1
    }_${date.getDate()}_${date.getFullYear()}__${date.getHours()}_${date.getMinutes()}`
    return `${title}_${dateTime}.pdf`
  }

  const DownloadButton = () => (
    <button className={styles.btn_download} id='PDFDownloadBtn'>
      <PDFDownloadLink
        document={
          <PDFDocument
            currencyName={info.currencyName}
            address={address}
            privateKey={privateKey}
            title={generateFileName()}
          />
        }
        fileName={generateFileName()}
      />
    </button>
  )

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => dispatch(closePastelPaperWalletModal())}
      className={styles.modal_content_wrapper}
    >
      <div className={styles.modal_content}>
        <button
          type='button'
          className={styles.btn_close}
          onClick={() => dispatch(closePastelPaperWalletModal())}
        >
          X
        </button>
        <DownloadButton />
        <PDFViewer style={pdfStyles.viewer}>
          <PDFDocument
            currencyName={info.currencyName}
            address={address}
            privateKey={privateKey}
            title={generateFileName()}
          />
        </PDFViewer>
      </div>
    </Modal>
  )
}
