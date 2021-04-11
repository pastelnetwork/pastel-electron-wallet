import {
  Document,
  Page,
  Path,
  PDFViewer,
  StyleSheet,
  Svg,
  Text,
  View,
} from '@react-pdf/renderer'
import QRCode from 'qrcode.react'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Modal from 'react-modal'

import styles from './PastelPaperWalletGenerator.module.css'

type PastelPaperWalletGeneratorProps = {
  address: string
  privateKey: string
  modalIsOpen: boolean
  onCloseModal: () => void
}

function PastelPaperWalletGenerator(
  props: PastelPaperWalletGeneratorProps,
): JSX.Element {
  if (!props.modalIsOpen || !props.privateKey) {
    return <></>
  }

  const breakChar = '\u00ad'
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
    marginRight30: {
      marginRight: '30px',
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

  function generateQrcode() {
    try {
      const qrcodeValue = ReactDOMServer.renderToString(
        <QRCode value={props.address} renderAs='svg' />,
      )
      const paths = qrcodeValue.match(/d="([^"]*)/g)
      const fills = qrcodeValue.match(/fill="([^"]*)/g)

      return (
        <Svg
          shape-rendering='crispEdges'
          height='100%'
          width='100%'
          viewBox='0 0 33 33'
        >
          {paths?.map((path, idx) => (
            <Path
              fill={fills ? fills[idx].replace('fill="', '') : '#000'}
              d={path.replace('d="', '')}
              key={idx}
            ></Path>
          ))}
        </Svg>
      )
    } catch {
      return null
    }
  }

  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={() => props.onCloseModal()}
      className={styles.modal_content_wrapper}
    >
      <div className={styles.modal_content}>
        <button
          type='button'
          className={styles.btn_close}
          onClick={() => props.onCloseModal()}
        >
          X
        </button>
        <PDFViewer style={pdfStyles.viewer}>
          <Document>
            <Page size='A4' style={pdfStyles.page}>
              <View style={pdfStyles.section}>
                <View style={pdfStyles.contentTop}>
                  <View style={pdfStyles.topMedia}>{generateQrcode()}</View>
                  <View style={pdfStyles.contentWrapper}>
                    <Text style={pdfStyles.contentTitle}>
                      PSL Address (Sapling)
                    </Text>
                    <Text style={pdfStyles.contentValue}>
                      {props.address.replace(/(.{40})/g, `$1${breakChar}`)}
                    </Text>
                  </View>
                </View>
                <View style={pdfStyles.mainContent}>
                  <View style={pdfStyles.mainContentWrapper}>
                    <View style={pdfStyles.contentItem}>
                      <Text style={pdfStyles.contentTitle}>Private Key</Text>
                      <Text style={pdfStyles.contentValue}>
                        {props.privateKey.replace(/(.{40})/g, `$1${breakChar}`)}
                      </Text>
                    </View>
                    <View style={pdfStyles.marginTop20}>
                      <Text style={pdfStyles.contentTitle}>
                        PSL Address (Sapling)
                      </Text>
                      <Text style={pdfStyles.contentValue}>
                        {props.address.replace(/(.{40})/g, `$1${breakChar}`)}
                      </Text>
                    </View>
                  </View>
                  <View style={pdfStyles.mainMedia}>{generateQrcode()}</View>
                </View>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      </div>
    </Modal>
  )
}

export default PastelPaperWalletGenerator
