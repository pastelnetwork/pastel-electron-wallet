/* eslint-disable */

import React, { PureComponent } from 'react'
import fs from 'fs'
import dateformat from 'dateformat'
import Modal from 'react-modal'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { ipcRenderer, remote } from 'electron'
import TextareaAutosize from 'react-textarea-autosize'
import querystring from 'querystring'
import { Base64 } from 'js-base64'
import PropTypes from 'prop-types'
import styles from './Sidebar.module.css'
import cstyles from './Common.module.css'
import routes from '../constants/routes.json'
import Logo from '../assets/img/pastel-logo.png'
import { Info, Transaction } from './AppState'
import Utils from '../utils/utils'
import { parsePastelURI, PastelURITarget } from '../utils/uris'

const ExportPrivKeyModal = ({
  modalIsOpen,
  exportedPrivKeys,
  closeModal,
}: any) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={cstyles.modal}
      overlayClassName={cstyles.modalOverlay}
    >
      <div className={[cstyles.verticalflex].join(' ')}>
        <div
          className={cstyles.marginbottomlarge}
          style={{
            textAlign: 'center',
          }}
        >
          Your Wallet Private Keys
        </div>

        <div className={[cstyles.marginbottomlarge, cstyles.center].join(' ')}>
          These are all the private keys in your wallet. Please store them
          carefully!
        </div>

        {exportedPrivKeys && (
          <TextareaAutosize
            value={exportedPrivKeys.join('\n')}
            className={styles.exportedPrivKeys}
            disabled
          />
        )}
      </div>

      <div className={cstyles.buttoncontainer}>
        <button
          type='button'
          className={cstyles.primarybutton}
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </Modal>
  )
}

const ImportPrivKeyModal = ({
  modalIsOpen,
  modalInput,
  setModalInput,
  closeModal,
  doImportPrivKeys,
}: any) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={cstyles.modal}
      overlayClassName={cstyles.modalOverlay}
    >
      <div className={[cstyles.verticalflex].join(' ')}>
        <div
          className={cstyles.marginbottomlarge}
          style={{
            textAlign: 'center',
          }}
        >
          Import Private Keys
        </div>

        <div className={cstyles.marginbottomlarge}>
          Please paste your private or viewing keys here (transparent address or
          shielded address), one line per key.
        </div>

        <div
          className={cstyles.well}
          style={{
            textAlign: 'center',
          }}
        >
          <TextareaAutosize
            className={cstyles.inputbox}
            placeholder='Private Keys'
            value={modalInput}
            onChange={e => setModalInput(e.target.value)}
          />
        </div>
      </div>

      <div className={cstyles.buttoncontainer}>
        <button
          type='button'
          className={cstyles.primarybutton}
          onClick={() => {
            doImportPrivKeys()
            closeModal()
          }}
        >
          Import
        </button>
        <button
          type='button'
          className={cstyles.primarybutton}
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </Modal>
  )
}

const ImportANIPrivKeyModal = ({
  modalIsOpen,
  modalInput,
  setModalInput,
  closeModal,
  doImportANIPrivKeys,
}: any) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={cstyles.modal}
      overlayClassName={cstyles.modalOverlay}
    >
      <div className={[cstyles.verticalflex].join(' ')}>
        <div
          className={cstyles.marginbottomlarge}
          style={{
            textAlign: 'center',
          }}
        >
          Import ANI (Animecoin) Private Keys
        </div>

        <div
          className={cstyles.marginbottomlarge}
          style={{
            textAlign: 'center',
          }}
        >
          Please paste your ANI private keys here, one line per key. <br />{' '}
          (NOTE: Don&apos;t use this unless you participated in the original
          fork of Animecoin!)
        </div>

        <div
          className={cstyles.well}
          style={{
            textAlign: 'center',
          }}
        >
          <TextareaAutosize
            className={cstyles.inputbox}
            placeholder='ANI Private Keys'
            value={modalInput}
            onChange={e => setModalInput(e.target.value)}
          />
        </div>
      </div>

      <div className={cstyles.buttoncontainer}>
        <button
          type='button'
          className={cstyles.primarybutton}
          onClick={() => {
            doImportANIPrivKeys()
            closeModal()
          }}
        >
          Import
        </button>
        <button
          type='button'
          className={cstyles.primarybutton}
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </Modal>
  )
}

const PayURIModal = ({
  modalIsOpen,
  modalInput,
  setModalInput,
  closeModal,
  modalTitle,
  actionButtonName,
  actionCallback,
}: any) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={cstyles.modal}
      overlayClassName={cstyles.modalOverlay}
    >
      <div className={[cstyles.verticalflex].join(' ')}>
        <div
          className={cstyles.marginbottomlarge}
          style={{
            textAlign: 'center',
          }}
        >
          {modalTitle}
        </div>

        <div
          className={cstyles.well}
          style={{
            textAlign: 'center',
          }}
        >
          <input
            type='text'
            className={cstyles.inputbox}
            placeholder='URI'
            value={modalInput}
            onChange={e => setModalInput(e.target.value)}
          />
        </div>
      </div>

      <div className={cstyles.buttoncontainer}>
        {actionButtonName && (
          <button
            type='button'
            className={cstyles.primarybutton}
            onClick={() => {
              if (modalInput) {
                actionCallback(modalInput)
              }

              closeModal()
            }}
          >
            {actionButtonName}
          </button>
        )}

        <button
          type='button'
          className={cstyles.primarybutton}
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </Modal>
  )
}

const SidebarMenuItem = ({ name, routeName, currentRoute, iconname }: any) => {
  let isActive = false

  let splitedCurrentRouteNames = currentRoute.split('/')
  let splitedRouteNames = routeName.split('/')
  if (
    (currentRoute.endsWith('app.html') && routeName === (routes as any).HOME) ||
    currentRoute === routeName ||
    splitedRouteNames[1] === splitedCurrentRouteNames[1]
  ) {
    isActive = true
  }

  let activeColorClass = ''

  if (isActive) {
    activeColorClass = styles.sidebarmenuitemactive
  }

  return (
    <div className={[styles.sidebarmenuitem, activeColorClass].join(' ')}>
      <Link to={routeName}>
        <span className={activeColorClass}>
          <i className={['fas', iconname].join(' ')} />
          &nbsp; &nbsp;
          {name}
        </span>
      </Link>
    </div>
  )
}

class Sidebar extends PureComponent<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      uriModalIsOpen: false,
      uriModalInputValue: null,
      privKeyModalIsOpen: false,
      ANIprivKeyModalIsOpen: false,
      exportPrivKeysModalIsOpen: false,
      exportedPrivKeys: null,
      privKeyInputValue: null,
    }
    this.setupMenuHandlers()
  } // Handle menu items

  setupMenuHandlers = async () => {
    const {
      history,
      openErrorModal,
      closeErrorModal,
      openPastelSpriteEditorToolModal,
      openPastelPhotopeaModal,
      openAboutModal,
      openUpdateToast,
      openSquooshToolModal,
      openGlitchImageModal,
      setSendTo,
      addresses,
      createNewAddress,
    } = this.props

    ipcRenderer.on('payuri', (event, uri) => {
      this.openURIModal(uri)
    }) // Import Private Keys

    ipcRenderer.on('import', () => {
      this.openImportPrivKeyModal(null)
    }) // Import ANI Private Keys

    ipcRenderer.on('importani', () => {
      this.openImportANIPrivKeyModal(null)
    }) // Export All Transactions

    ipcRenderer.on('exportalltx', async () => {
      const save = await remote.dialog.showSaveDialog({
        title: 'Save Transactions As CSV',
        defaultPath: 'pastelwallet_transactions.csv',
        filters: [
          {
            name: 'CSV File',
            extensions: ['csv'],
          },
        ],
        properties: ['showOverwriteConfirmation'],
      })

      if (save.filePath) {
        // Construct a CSV
        const { transactions } = this.props
        const rows = transactions.flatMap((t: any) => {
          if (t.detailedTxns) {
            return t.detailedTxns.map((dt: any) => {
              const normaldate = dateformat(
                t.time * 1000,
                'mmm dd yyyy hh::MM tt',
              ) // Add a single quote "'" into the memo field to force interpretation as a string, rather than as a
              // formula from a rogue memo

              const escapedMemo = dt.memo
                ? `'${dt.memo.replace(/"/g, '""')}'`
                : ''
              return `${t.time},"${normaldate}","${t.txid}","${t.type}",${dt.amount},"${dt.address}","${escapedMemo}"`
            })
          } else {
            return []
          }
        })
        const header = [`UnixTime, Date, Txid, Type, Amount, Address, Memo`]

        try {
          await fs.promises.writeFile(
            save.filePath,
            header.concat(rows).join('\n'),
          )
        } catch (err) {
          openErrorModal('Error Exporting Transactions', `${err}`)
        }
      }
    }) // Export all private keys

    ipcRenderer.on('exportall', async () => {
      // There might be lots of keys, so we get them serially.
      // Get all the addresses and run export key on each of them.
      const { addresses, getPrivKeyAsString } = this.props // We'll do an array iteration rather than a async array.map, because there might
      // be several keys, and we don't want to hammer pasteld with 100s of RPC calls.

      const exportedPrivKeys = []

      for (let i = 0; i < addresses.length; i++) {
        const address = addresses[i]

        const privKey = await getPrivKeyAsString(address)
        exportedPrivKeys.push(`${privKey} #${address}`) // Show a progress dialog

        openErrorModal(
          'Exporting Private Keys',
          <span>
            Exporting Private Keys
            <br />
            Please wait...({i} / {addresses.length})
          </span>,
        )
      }

      closeErrorModal()
      this.setState({
        exportPrivKeysModalIsOpen: true,
        exportedPrivKeys,
      })
    }) // View pasteld

    ipcRenderer.on('pasteld', () => {
      history.push(routes.PASTELD)
    }) // Connect mobile app

    ipcRenderer.on('pastelSpriteEditorTool', () => {
      openPastelSpriteEditorToolModal()
    })

    ipcRenderer.on('pastelPhotopea', () => {
      openPastelPhotopeaModal()
    })

    ipcRenderer.on('about', () => {
      openAboutModal()
    }) // About

    ipcRenderer.on('squooshTool', () => {
      openSquooshToolModal()
    })

    ipcRenderer.on('glitchImage', () => {
      openGlitchImageModal()
    })

    ipcRenderer.send('app-ready')
    ipcRenderer.on('update_downloaded', () => {
      openUpdateToast()
    })
    ipcRenderer.on(
      'deepLink',
      async (event, { view, param }: { view: string; param: string }) => {
        const allRoutes = Object.assign(routes)
        const page = allRoutes[view.toUpperCase()] ? view : routes.DASHBOARD
        if (routes.SEND.includes(page) && param.includes('amount=')) {
          const params = querystring.parse(param || '')
          let uri = ''
          if (params?.to) {
            uri = params.to.toString()
          } else {
            uri = await createNewAddress(true)
          }
          uri = `${uri}?amount=${params.amount}`

          if (params?.memo) {
            uri = `${uri}&memo=${Base64.encode(params.memo.toString())}`
          }
          const parsedUri = parsePastelURI(`pastel:${uri}`)
          if (typeof parsedUri !== 'string') {
            setSendTo(parsedUri)
          }
        }

        history.replace({
          pathname: page,
          state: { param },
        })
      },
    )
  }
  closeExportPrivKeysModal = () => {
    this.setState({
      exportPrivKeysModalIsOpen: false,
      exportedPrivKeys: null,
    })
  }
  openImportPrivKeyModal = (defaultValue: any) => {
    const privKeyInputValue = defaultValue || ''
    this.setState({
      privKeyModalIsOpen: true,
      privKeyInputValue,
    })
  }
  openImportANIPrivKeyModal = (defaultValue: any) => {
    const ANIprivKeyInputValue = defaultValue || ''
    this.setState({
      ANIprivKeyModalIsOpen: true,
      ANIprivKeyInputValue,
    })
  }
  setImprovPrivKeyInputValue = (privKeyInputValue: any) => {
    this.setState({
      privKeyInputValue,
    })
  }
  setImportANIPrivKeyInputValue = (ANIprivKeyInputValue: any) => {
    this.setState({
      ANIprivKeyInputValue,
    })
  }
  closeImportPrivKeyModal = () => {
    this.setState({
      privKeyModalIsOpen: false,
    })
  }
  openURIModal = (defaultValue: any) => {
    const uriModalInputValue = defaultValue || ''
    this.setState({
      uriModalIsOpen: true,
      uriModalInputValue,
    })
  }
  closeImportANIPrivKeyModal = () => {
    this.setState({
      ANIprivKeyModalIsOpen: false,
    })
  }
  doImportPrivKeys = () => {
    const { importPrivKeys, openErrorModal } = this.props
    const { privKeyInputValue } = this.state

    if (privKeyInputValue) {
      let keys = privKeyInputValue.split(new RegExp('[\n\r]+'))

      if (!keys || keys.length === 0) {
        openErrorModal(
          'No Keys Imported',
          'No keys were specified, so none were imported',
        )
        return
      } // Filter out empty lines and clean up the private keys

      keys = keys.filter(
        (k: any) => !(k.trim().startsWith('#') || k.trim().length === 0),
      ) // Special case.
      // Sometimes, when importing from a paperwallet or such, the key is split by newlines, and might have
      // been pasted like that. So check to see if the whole thing is one big private key

      if (Utils.isValidSaplingPrivateKey(keys.join(''))) {
        keys = [keys.join('')]
      }

      importPrivKeys(keys)
    }
  }
  doImportANIPrivKeys = () => {
    const { importANIPrivKeys, openErrorModal } = this.props
    const { ANIprivKeyInputValue } = this.state

    if (ANIprivKeyInputValue) {
      let keys = ANIprivKeyInputValue.split(new RegExp('[\n\r]+'))

      if (!keys || keys.length === 0) {
        openErrorModal(
          'No ANI Keys Imported',
          'No ANI keys were specified, so none were imported',
        )
        return
      } // Filter out empty lines and clean up the private keys

      keys = keys.filter(
        (k: any) => !(k.trim().startsWith('#') || k.trim().length === 0),
      )
      importANIPrivKeys(keys)
    }
  }
  setURIInputValue = (uriModalInputValue: any) => {
    this.setState({
      uriModalInputValue,
    })
  }
  closeURIModal = () => {
    this.setState({
      uriModalIsOpen: false,
    })
  }
  payURI = (uri: any) => {
    console.log(`Paying ${uri}`)
    const { openErrorModal, setSendTo, history } = this.props
    const errTitle = 'URI Error'

    const getErrorBody = (explain: any) => {
      return (
        <div>
          <span>{explain}</span>
          <br />
        </div>
      )
    }

    if (!uri || uri === '') {
      openErrorModal(errTitle, getErrorBody('URI was not found or invalid'))
      return
    }

    const parsedUri = parsePastelURI(uri)

    if (typeof parsedUri === 'string') {
      openErrorModal(errTitle, getErrorBody(parsedUri))
      return
    }

    setSendTo(parsedUri)
    history.push(routes.SEND)
  }

  render() {
    const { location, info } = this.props
    const {
      uriModalIsOpen,
      uriModalInputValue,
      privKeyModalIsOpen,
      privKeyInputValue,
      ANIprivKeyModalIsOpen,
      ANIprivKeyInputValue,
      exportPrivKeysModalIsOpen,
      exportedPrivKeys,
    } = this.state
    let state = 'DISCONNECTED'
    let progress: any = 100

    if (info && info.version && !info.disconnected) {
      if (info.verificationProgress < 0.99) {
        state = 'SYNCING'
        progress = (info.verificationProgress * 100).toFixed(1)
      } else {
        state = 'CONNECTED'
      }
    }

    return (
      <div>
        {/* Payment URI Modal */}
        <PayURIModal
          modalInput={uriModalInputValue}
          setModalInput={this.setURIInputValue}
          modalIsOpen={uriModalIsOpen}
          closeModal={this.closeURIModal}
          modalTitle='Pay URI'
          actionButtonName='Pay URI'
          actionCallback={this.payURI}
        />

        {/* Import Private Key Modal */}
        <ImportPrivKeyModal
          modalIsOpen={privKeyModalIsOpen}
          setModalInput={this.setImprovPrivKeyInputValue}
          modalInput={privKeyInputValue}
          closeModal={this.closeImportPrivKeyModal}
          doImportPrivKeys={this.doImportPrivKeys}
        />

        {/* Import ANI Private Key Modal */}
        <ImportANIPrivKeyModal
          modalIsOpen={ANIprivKeyModalIsOpen}
          setModalInput={this.setImportANIPrivKeyInputValue}
          modalInput={ANIprivKeyInputValue}
          closeModal={this.closeImportANIPrivKeyModal}
          doImportANIPrivKeys={this.doImportANIPrivKeys}
        />

        {/* Exported (all) Private Keys */}
        <ExportPrivKeyModal
          modalIsOpen={exportPrivKeysModalIsOpen}
          exportedPrivKeys={exportedPrivKeys}
          closeModal={this.closeExportPrivKeysModal}
        />

        <div className={[cstyles.center, styles.sidebarlogobg].join(' ')}>
          <img src={Logo} width='70' alt='logo' />
        </div>

        <div className={styles.sidebar}>
          <SidebarMenuItem
            name='Dashboard'
            routeName={routes.DASHBOARD}
            currentRoute={location.pathname}
            iconname='fa-home'
          />
          <SidebarMenuItem
            name='Send'
            routeName={routes.SEND}
            currentRoute={location.pathname}
            iconname='fa-paper-plane'
          />
          <SidebarMenuItem
            name='Receive'
            routeName={routes.RECEIVE}
            currentRoute={location.pathname}
            iconname='fa-download'
          />
          <SidebarMenuItem
            name='Transactions'
            routeName={routes.TRANSACTIONS}
            currentRoute={location.pathname}
            iconname='fa-list'
          />
          <SidebarMenuItem
            name='Address Book'
            routeName={routes.ADDRESSBOOK}
            currentRoute={location.pathname}
            iconname='fa-address-book'
          />
          <SidebarMenuItem
            name='Pastel ID'
            routeName={routes.PASTEL_ID}
            currentRoute={location.pathname}
            iconname='fa-fingerprint'
          />
          <SidebarMenuItem
            name='Statistics'
            routeName={routes.STATISTICS}
            currentRoute={location.pathname}
            iconname='fa-chart-bar'
          />
          <SidebarMenuItem
            name='Expert Console'
            routeName={routes.EXPERT_CONSOLE}
            currentRoute={location.pathname}
            iconname='fa-file-code'
          />
          <SidebarMenuItem
            name='Members'
            routeName={routes.MEMBERS}
            currentRoute={location.pathname}
            iconname='fa-file-code'
          />
          <SidebarMenuItem
            name='Market'
            routeName={routes.MARKET}
            currentRoute={location.pathname}
            iconname='fa-shopping-cart'
          />
        </div>

        <div className={cstyles.center}>
          {state === 'CONNECTED' && (
            <div
              className={[
                cstyles.padsmallall,
                cstyles.margintopsmall,
                cstyles.blackbg,
              ].join(' ')}
            >
              <i className={[cstyles.green, 'fas', 'fa-check'].join(' ')} />
              &nbsp; Connected
            </div>
          )}
          {state === 'SYNCING' && (
            <div
              className={[
                cstyles.padsmallall,
                cstyles.margintopsmall,
                cstyles.blackbg,
              ].join(' ')}
            >
              <div>
                <i className={[cstyles.yellow, 'fas', 'fa-sync'].join(' ')} />
                &nbsp; Syncing {progress}%
              </div>
            </div>
          )}
          {state === 'DISCONNECTED' && (
            <div
              className={[
                cstyles.padsmallall,
                cstyles.margintopsmall,
                cstyles.blackbg,
              ].join(' ')}
            >
              <i
                className={[cstyles.red, 'fas', 'fa-times-circle'].join(' ')}
              />
              &nbsp; Connected
            </div>
          )}
        </div>
      </div>
    )
  }
} // $FlowFixMe

export default withRouter(Sidebar)
