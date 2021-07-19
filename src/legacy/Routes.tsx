/* eslint-disable */

import React from 'react'
import ReactModal from 'react-modal'
import { Switch, Route } from 'react-router'
import { ErrorModal, ErrorModalData } from './components/ErrorModal'
import routes from './constants/routes.json'
import MemberProfile from '../features/profile/memberProfile/MemberProfile'
import Dashboard from '../features/dashboard/DashboardPage'
import PortfolioPage from '../features/nft/portfolio'
import Portfolio from '../features/portfolio'
import Send from './components/Send'
import LoadingScreen from '../features/loading'
import WalletScreen from '../features/wallet'
import Header from '../common/components/Header'
import {
  TotalBalance,
  SendPageState,
  ToAddr,
  RPCConfig,
  Info,
  ReceivePageState,
  AddressBookEntry,
} from './components/AppState'
import RPC from './rpc'
import Utils from './utils/utils'
import Pasteld from './components/Pasteld'
import AddressBook from './components/Addressbook'
import AddressbookImpl from './utils/AddressbookImpl'
import Transactions from './components/Transactions'
import CompanionAppListener from './companion'
import { PastelID } from '../features/pastelID'
import { connect } from 'react-redux'
import { setPastelConf } from '../features/pastelConf'
import { PastelDBThread } from '../features/pastelDB'
import { openPastelPaperWalletModal } from '../features/pastelPaperWalletGenerator'
import PastelSpriteEditorToolModal, {
  openPastelSpriteEditorToolModal,
} from '../features/pastelSpriteEditorTool'
import PastelPhotopeaModal, {
  openPastelPhotopeaModal,
} from '../features/pastelPhotopea'
import AboutModal, { openAboutModal } from '../features/about'
import SquooshToolModal, { openSquooshToolModal } from '../features/squooshTool'
import GlitchImageModal, { openGlitchImageModal } from '../features/glitchImage'
// @ts-ignore
import ExpertConsole from '../features/expertConsole'
import { openUpdateToast } from '../features/updateToast'
import PastelUtils from '../common/utils/utils'
import Creator from '../features/creator'
import Collector from '../features/collector'
import Nft from '../features/nft'
import NFTMarketFeed from '../features/NFTMarketFeed'
import { app } from 'electron'
import { MembersDirectory } from '../features/members'
import Chat from '../features/chat'
import { MyProfile } from '../features/profile'
import { Forum } from '../features/forum'
import { RegisterPage } from '../features/onboarding'

export type TWalletInfo = {
  connections: number
  currencyName: string
  disconnected: boolean
  latestBlock: number
  pslPrice: number | undefined
  solps: number
  testnet: boolean
  verificationProgress: number
  version: number
}

const period = 1000 * 10

class RouteApp extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      totalBalance: new TotalBalance(),
      addressesWithBalance: [],
      addressPrivateKeys: {},
      addressViewKeys: {},
      addresses: [],
      addressBook: [],
      transactions: null,
      sendPageState: new SendPageState(),
      receivePageState: new ReceivePageState(),
      rpcConfig: new RPCConfig(),
      info: new Info(),
      location: null,
      errorModalData: new ErrorModalData(),
      connectedCompanionApp: null,
      pastelIDs: [],
    } // Create the initial ToAddr box

    this.state.sendPageState.toaddrs = [new ToAddr(Utils.getNextToAddrID())] // Set the Modal's app element

    ReactModal.setAppElement('#root')
  }

  rpc: any
  companionAppListener: any
  rpcRefreshIntervalId = 0

  async componentDidMount() {
    const rpc = new RPC(
      this.setTotalBalance,
      this.setAddressesWithBalances,
      this.setTransactionList,
      this.setAllAddresses,
      this.setInfo,
      this.setPslPrice,
      this.setDisconnected,
    )
    this.rpc = rpc

    // Auto refresh every 10s
    if (!app?.isPackaged) {
      this.rpcRefreshIntervalId = window.setInterval(() => {
        if (this.state.rpcConfig.username) {
          rpc.refresh()
        }
      }, 10000)
    }

    const addressBook = await AddressbookImpl.readAddressBook()
    if (addressBook) {
      this.setState({ addressBook })
    }

    this.companionAppListener = new CompanionAppListener(
      this.getFullState,
      this.sendTransaction,
      this.updateConnectedCompanionApp,
    )
    this.companionAppListener.setUp()
  }

  componentWillUnmount() {
    window.clearInterval(this.rpcRefreshIntervalId)
  }

  getFullState = () => {
    return this.state
  }
  openErrorModal = (title: any, body: any) => {
    const errorModalData: any = new ErrorModalData()
    errorModalData.modalIsOpen = true
    errorModalData.title = title
    errorModalData.body = body
    this.setState({
      errorModalData,
    })
  }
  closeErrorModal = () => {
    const errorModalData = new ErrorModalData()
    errorModalData.modalIsOpen = false
    this.setState({
      errorModalData,
    })
  } // Set the state of the current info object to be disconnected

  setDisconnected = (err: any) => {
    const { info } = this.state
    const newInfo: any = new Info()
    Object.assign(newInfo, info)
    newInfo.disconnected = true
    this.setState({
      info: newInfo,
    })
    this.openErrorModal('Disconnected', err)
  }

  // TODO duplicated with below, discovered by TypeScript
  // setInfo = (info: any) => {
  //   this.setState({
  //     info,
  //   })
  // }

  setTotalBalance = (totalBalance: any) => {
    this.setState({
      totalBalance,
    })
  }
  setAddressesWithBalances = (addressesWithBalance: any) => {
    this.setState({
      addressesWithBalance,
    })
    const { sendPageState } = this.state // If there is no 'from' address, we'll set a default one

    if (!sendPageState.fromaddr) {
      // Find a z-address with the highest balance
      const defaultAB = addressesWithBalance
        .filter((ab: any) => Utils.isSapling(ab.address))
        .reduce((prev: any, ab: any) => {
          // We'll start with a sapling address
          if (prev == null) {
            return ab
          } // Find the sapling address with the highest balance

          if (prev.balance < ab.balance) {
            return ab
          }

          return prev
        }, null)

      if (defaultAB) {
        const newSendPageState = new SendPageState()
        newSendPageState.fromaddr = defaultAB.address
        newSendPageState.toaddrs = sendPageState.toaddrs
        this.setState({
          sendPageState: newSendPageState,
        })
      }
    }
  }
  setTransactionList = (transactions: any) => {
    this.setState({
      transactions,
    })
  }
  setAllAddresses = (addresses: any) => {
    this.setState({
      addresses,
    })
  }
  setSendPageState = (sendPageState: any) => {
    this.setState({
      sendPageState,
    })
  }
  importPrivKeys = async (keys: any) => {
    console.log(keys)

    for (let i = 0; i < keys.length; i++) {
      // The last doImport will take forever, because it will trigger the rescan. So, show
      // the dialog. If the last one fails, there will be an error displayed anyways
      if (i === keys.length - 1) {
        this.openErrorModal(
          'Key Import Started',
          <span>
            The import process for the private keys has started.
            <br />
            This will take a long time, up to 1 hour!
            <br />
            Please be patient!
          </span>,
        )
      }

      const result = await this.rpc.doImportPrivKey(
        PastelUtils.removeAllBreakChar(keys[i]),
        i === keys.length - 1,
      )

      if (result !== '') {
        this.openErrorModal(
          'Failed to import key',
          <span>
            A private key failed to import.
            <br />
            The error was:
            <br />
            {result}
          </span>,
        )
        return
      }
    }
  }
  importANIPrivKeys = async (keys: any) => {
    console.log(keys)

    for (let i = 0; i < keys.length; i++) {
      // The last doImport will take forever, because it will trigger the rescan. So, show
      // the dialog. If the last one fails, there will be an error displayed anyways
      if (i === keys.length - 1) {
        this.openErrorModal(
          'ANI Key Import Started',
          <span>
            The import process for the private keys has started.
            <br />
            This will take a long time, up to 1 hour!
            <br />
            Please be patient!
          </span>,
        )
      }

      const result = await this.rpc.doImportANIPrivKey(
        keys[i],
        i === keys.length - 1,
      )

      if (result !== '') {
        this.openErrorModal(
          'Success! Your ANI private key converted into PSL',
          <span>
            <br /> The corresponding PSL Private Key is as follows (copy this
            someplace secure!): <br />
            {result}
            <br /> Copy this key and paste it into the &quot;Import Private
            Keys...&quot; menu item. <br />
          </span>,
        )
        return
      }
    }
  }
  setSendTo = (targets: any) => {
    // Clear the existing send page state and set up the new one
    const { sendPageState } = this.state
    const newSendPageState = new SendPageState()
    newSendPageState.toaddrs = []
    newSendPageState.fromaddr = sendPageState.fromaddr // If a single object is passed, accept that as well.

    let tgts = targets

    if (!Array.isArray(tgts)) {
      tgts = [targets]
    }

    tgts.forEach((tgt: any) => {
      const to = new ToAddr(Utils.getNextToAddrID())

      if (tgt.address) {
        to.to = tgt.address
      }

      if (tgt.amount) {
        to.amount = tgt.amount
      }

      if (tgt.memoString) {
        to.memo = tgt.memoString
      }

      newSendPageState.toaddrs.push(to)
    })
    this.setState({
      sendPageState: newSendPageState,
    })
  }
  setRPCConfig = (rpcConfig: any) => {
    this.setState({
      rpcConfig,
    })
    this.rpc.configure(rpcConfig)
  }
  setPslPrice = (price: any) => {
    console.log(`Price = ${price}`)
    const { info } = this.state
    const newInfo: any = new Info()
    Object.assign(newInfo, info)
    newInfo.pslPrice = price
    this.setState({
      info: newInfo,
    })
  }
  setInfo = (newInfo: TWalletInfo) => {
    // If the price is not set in this object, copy it over from the current object
    const { info } = this.state

    if (!newInfo.pslPrice) {
      newInfo.pslPrice = info.pslPrice
    }

    this.setState({
      info: newInfo,
    })
  }
  sendTransaction = async (sendJson: any, fnOpenSendErrorModal: any) => {
    try {
      const success = await this.rpc.sendTransaction(
        sendJson,
        fnOpenSendErrorModal,
      )
      return success
    } catch (err) {
      console.log('route sendtx error', err)
    }
  } // Get a single private key for this address, and return it as a string.

  getPrivKeyAsString = async (address: any) => {
    return this.rpc.getPrivKeyAsString(address)
  } // Getter methods, which are called by the components to update the state

  fetchAndSetSinglePrivKey = async (address: any, type: string = '') => {
    const key = await this.rpc.getPrivKeyAsString(address)
    const addressPrivateKeys: any = {}
    addressPrivateKeys[address] = key
    if (type === 'generatePaperWallet') {
      this.props.openPastelPaperWalletModal({
        address,
        privateKey: addressPrivateKeys[address],
      })
    } else {
      this.setState({
        addressPrivateKeys,
      })
    }
  }
  hidePrivKey = () => {
    this.setState({ addressPrivateKeys: {} })
  }

  fetchAndSetSingleViewKey = async (address: any) => {
    const key = await this.rpc.getViewKeyAsString(address)
    const addressViewKeys: any = {}
    addressViewKeys[address] = key
    this.setState({
      addressViewKeys,
    })
  }
  addAddressBookEntry = (label: any, address: any) => {
    // Add an entry into the address book
    const { addressBook } = this.state
    const newAddressBook = addressBook.concat(
      new AddressBookEntry(label, address),
    ) // Write to disk. This method is async

    AddressbookImpl.writeAddressBook(newAddressBook)
    this.setState({
      addressBook: newAddressBook,
    })
  }
  removeAddressBookEntry = (label: any) => {
    const { addressBook } = this.state
    const newAddressBook = addressBook.filter((i: any) => i.label !== label) // Write to disk. This method is async

    AddressbookImpl.writeAddressBook(newAddressBook)
    this.setState({
      addressBook: newAddressBook,
    })
  }
  createNewAddress = async (zaddress: any) => {
    // Create a new address
    const newaddress = await this.rpc.createNewAddress(zaddress)
    console.log(`Created new Address ${newaddress}`) // And then fetch the list of addresses again to refresh

    this.rpc.fetchAllAddresses()
    const { receivePageState } = this.state
    const newRerenderKey = receivePageState.rerenderKey + 1
    const newReceivePageState = new ReceivePageState()
    newReceivePageState.newAddress = newaddress
    newReceivePageState.rerenderKey = newRerenderKey
    this.setState({
      receivePageState: newReceivePageState,
    })
    return newaddress
  }
  updateConnectedCompanionApp = (connectedCompanionApp: any) => {
    this.setState({
      connectedCompanionApp,
    })
  }
  doRefresh = () => {
    this.rpc.refresh()
  }

  render() {
    const {
      totalBalance,
      transactions,
      addressesWithBalance,
      addressPrivateKeys,
      addressViewKeys,
      addresses,
      addressBook,
      sendPageState,
      receivePageState,
      info,
      errorModalData,
      connectedCompanionApp,
      pastelIDs,
      rpcConfig,
    } = this.state
    const standardProps = {
      openErrorModal: this.openErrorModal,
      closeErrorModal: this.closeErrorModal,
      setSendTo: this.setSendTo,
      info,
    }

    return (
      <div className='flex flex-col h-full'>
        <ErrorModal
          title={errorModalData.title}
          body={errorModalData.body}
          modalIsOpen={errorModalData.modalIsOpen}
          closeModal={this.closeErrorModal}
        />
        <PastelPhotopeaModal />
        <PastelSpriteEditorToolModal />
        <AboutModal />
        <SquooshToolModal />
        <GlitchImageModal />
        {info?.version && <Header />}
        <div className='flex-grow overflow-auto'>
          <Switch>
            <Route path={routes.MARKET} render={() => <NFTMarketFeed />} />
            <Route
              path={routes.SEND}
              render={() => (
                <Send
                  addressesWithBalance={addressesWithBalance}
                  sendTransaction={this.sendTransaction}
                  sendPageState={sendPageState}
                  setSendPageState={this.setSendPageState}
                  addressBook={addressBook}
                  {...standardProps}
                />
              )}
            />
            <Route
              path={routes.ADDRESSBOOK}
              render={() => (
                <AddressBook
                  addressBook={addressBook}
                  addAddressBookEntry={this.addAddressBookEntry}
                  removeAddressBookEntry={this.removeAddressBookEntry}
                  {...standardProps}
                />
              )}
            />
            <Route path={routes.DASHBOARD} component={Dashboard} />
            <Route
              path={routes.PORTFOLIO_DETAIL}
              exact
              render={() => <PortfolioPage currencyName={info.currencyName} />}
            />
            <Route path={routes.CHAT} exact component={Chat} />
            <Route path={routes.PORTFOLIO} exact component={Portfolio} />
            <Route
              path={routes.TRANSACTIONS}
              render={() => (
                <Transactions
                  transactions={transactions}
                  info={info}
                  addressBook={addressBook}
                  setSendTo={this.setSendTo}
                />
              )}
            />
            <Route path={routes.WALLET} render={() => <WalletScreen />} />

            <Route path={routes.CREATOR} render={() => <Creator />} />

            <Route path={routes.COLLECTOR} render={() => <Collector />} />

            <Route path={routes.NFT} render={() => <Nft />} />
            <Route path={routes.FORUM} render={() => <Forum />} />
            <Route path={routes.MEMBERS} render={() => <MembersDirectory />} />

            <Route
              path={routes.MY_PROFILE}
              render={() => <MyProfile info={info} rpcConfig={rpcConfig} />}
            />

            <Route
              path={routes.MEMBERS_PROFILE}
              render={() => <MemberProfile />}
            />

            <Route
              path={routes.PASTELD}
              render={() => <Pasteld info={info} refresh={this.doRefresh} />}
            />

            <Route
              path={routes.PASTEL_ID}
              render={() => (
                <PastelID
                  addressesWithBalance={addressesWithBalance}
                  createNewAddress={this.createNewAddress}
                  totalBalance={totalBalance}
                  info={info}
                />
              )}
            />

            <Route
              path={routes.EXPERT_CONSOLE}
              render={() => (
                <ExpertConsole
                  totalBalance={totalBalance}
                  info={info}
                  addressesWithBalance={addressesWithBalance}
                  transactions={transactions}
                  addressPrivateKeys={addressPrivateKeys}
                  connectedCompanionApp={connectedCompanionApp}
                  pastelIDs={pastelIDs}
                />
              )}
            />

            <Route
              path={routes.LOADING}
              render={props => (
                <LoadingScreen
                  {...props}
                  setRPCConfig={(rpcConfig: any) => {
                    // To support Redux calls
                    this.props.setPastelConf({
                      url: rpcConfig.url,
                      username: rpcConfig.username,
                      password: rpcConfig.password,
                    })

                    // To support legacy calls
                    // TODO Remove then fully moved over to Redux
                    this.setRPCConfig(rpcConfig)

                    // set pastel DB thread update timer
                    if (!app?.isPackaged) {
                      setInterval(() => {
                        PastelDBThread(rpcConfig)
                      }, period)
                    }
                  }}
                  setInfo={this.setInfo}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    )
  }
}

export default connect(null, {
  setPastelConf,
  openPastelPaperWalletModal,
  openPastelPhotopeaModal,
  openPastelSpriteEditorToolModal,
  openAboutModal,
  openSquooshToolModal,
  openUpdateToast,
  openGlitchImageModal,
})(RouteApp)
