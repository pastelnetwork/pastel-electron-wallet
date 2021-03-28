/* eslint-disable react/jsx-props-no-spreading */

/* eslint-disable max-classes-per-file */

/* eslint-disable react/prop-types */

/* eslint-disable react/no-unused-state */
import React from 'react';
import ReactModal from 'react-modal';
import { Switch, Route } from 'react-router';
import { ErrorModal, ErrorModalData } from './components/ErrorModal';
import cstyles from './components/Common.module.css';
import routes from './constants/routes.json';
import App from './containers/App';
import Dashboard from './components/Dashboard';
import Send from './components/Send';
import Receive from './components/Receive';
import LoadingScreen from './components/LoadingScreen';
import AppState, { AddressBalance, TotalBalance, Transaction, SendPageState, ToAddr, RPCConfig, Info, ReceivePageState, AddressBookEntry } from './components/AppState';
import RPC from './rpc';
import Utils from './utils/utils';
import { PastelURITarget } from './utils/uris';
import Pasteld from './components/Pasteld';
import AddressBook from './components/Addressbook';
import AddressbookImpl from './utils/AddressbookImpl';
import Sidebar from './components/Sidebar';
import Transactions from './components/Transactions';
import CompanionAppListener from './companion';
import PastelID from './components/PastelID';
import WormholeConnection from './components/WormholeConnection';
export default class RouteApp extends React.Component {
  constructor(props) {
    super(props);
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
      pastelIDs: []
    }; // Create the initial ToAddr box
    // eslint-disable-next-line react/destructuring-assignment

    this.state.sendPageState.toaddrs = [new ToAddr(Utils.getNextToAddrID())]; // Set the Modal's app element

    ReactModal.setAppElement('#root');
  }

  componentDidMount() {
    if (!this.rpc) {
      this.rpc = new RPC(this.setTotalBalance, this.setAddressesWithBalances, this.setTransactionList, this.setAllAddresses, this.setInfo, this.setPslPrice, this.setDisconnected);
    } // Read the address book


    (async () => {
      const addressBook = await AddressbookImpl.readAddressBook();

      if (addressBook) {
        this.setState({
          addressBook
        });
      }
    })(); // Setup the websocket for the companion app


    this.companionAppListener = new CompanionAppListener(this.getFullState, this.sendTransaction, this.updateConnectedCompanionApp);
    this.companionAppListener.setUp();
  }

  componentWillUnmount() {}

  getFullState = () => {
    return this.state;
  };
  openErrorModal = (title, body) => {
    const errorModalData = new ErrorModalData();
    errorModalData.modalIsOpen = true;
    errorModalData.title = title;
    errorModalData.body = body;
    this.setState({
      errorModalData
    });
  };
  closeErrorModal = () => {
    const errorModalData = new ErrorModalData();
    errorModalData.modalIsOpen = false;
    this.setState({
      errorModalData
    });
  }; // Set the state of the current info object to be disconnected

  setDisconnected = err => {
    const {
      info
    } = this.state;
    const newInfo = new Info();
    Object.assign(newInfo, info);
    newInfo.disconnected = true;
    this.setState({
      info: newInfo
    });
    this.openErrorModal('Disconnected', err);
  };
  setInfo = info => {
    this.setState({
      info
    });
  };
  setTotalBalance = totalBalance => {
    this.setState({
      totalBalance
    });
  };
  setAddressesWithBalances = addressesWithBalance => {
    this.setState({
      addressesWithBalance
    });
    const {
      sendPageState
    } = this.state; // If there is no 'from' address, we'll set a default one

    if (!sendPageState.fromaddr) {
      // Find a z-address with the highest balance
      const defaultAB = addressesWithBalance.filter(ab => Utils.isSapling(ab.address)).reduce((prev, ab) => {
        // We'll start with a sapling address
        if (prev == null) {
          return ab;
        } // Find the sapling address with the highest balance


        if (prev.balance < ab.balance) {
          return ab;
        }

        return prev;
      }, null);

      if (defaultAB) {
        const newSendPageState = new SendPageState();
        newSendPageState.fromaddr = defaultAB.address;
        newSendPageState.toaddrs = sendPageState.toaddrs;
        this.setState({
          sendPageState: newSendPageState
        });
      }
    }
  };
  setTransactionList = transactions => {
    this.setState({
      transactions
    });
  };
  setAllAddresses = addresses => {
    this.setState({
      addresses
    });
  };
  setSendPageState = sendPageState => {
    this.setState({
      sendPageState
    });
  };
  importPrivKeys = async keys => {
    console.log(keys); // eslint-disable-next-line no-plusplus

    for (let i = 0; i < keys.length; i++) {
      // The last doImport will take forever, because it will trigger the rescan. So, show
      // the dialog. If the last one fails, there will be an error displayed anyways
      if (i === keys.length - 1) {
        this.openErrorModal('Key Import Started', <span>
            The import process for the private keys has started.
            <br />
            This will take a long time, up to 1 hour!
            <br />
            Please be patient!
          </span>);
      } // eslint-disable-next-line no-await-in-loop


      const result = await this.rpc.doImportPrivKey(keys[i], i === keys.length - 1);

      if (result !== '') {
        this.openErrorModal('Failed to import key', <span>
            A private key failed to import.
            <br />
            The error was:
            <br />
            {result}
          </span>);
        return;
      }
    }
  };
  importANIPrivKeys = async keys => {
    console.log(keys); // eslint-disable-next-line no-plusplus

    for (let i = 0; i < keys.length; i++) {
      // The last doImport will take forever, because it will trigger the rescan. So, show
      // the dialog. If the last one fails, there will be an error displayed anyways
      if (i === keys.length - 1) {
        this.openErrorModal('ANI Key Import Started', <span>
            The import process for the private keys has started.
            <br />
            This will take a long time, up to 1 hour!
            <br />
            Please be patient!
          </span>);
      } // eslint-disable-next-line no-await-in-loop


      const result = await this.rpc.doImportANIPrivKey(keys[i], i === keys.length - 1);

      if (result !== '') {
        this.openErrorModal('Success! Your ANI private key converted into PSL', <span>
            <br /> The corresponding PSL Private Key is as follows (copy this someplace secure!): <br />
            {result}
            <br /> Copy this key and paste it into the &quot;Import Private Keys...&quot; menu item. <br />
          </span>);
        return;
      }
    }
  };
  setSendTo = targets => {
    // Clear the existing send page state and set up the new one
    const {
      sendPageState
    } = this.state;
    const newSendPageState = new SendPageState();
    newSendPageState.toaddrs = [];
    newSendPageState.fromaddr = sendPageState.fromaddr; // If a single object is passed, accept that as well.

    let tgts = targets;

    if (!Array.isArray(tgts)) {
      tgts = [targets];
    }

    tgts.forEach(tgt => {
      const to = new ToAddr(Utils.getNextToAddrID());

      if (tgt.address) {
        to.to = tgt.address;
      }

      if (tgt.amount) {
        to.amount = tgt.amount;
      }

      if (tgt.memoString) {
        to.memo = tgt.memoString;
      }

      newSendPageState.toaddrs.push(to);
    });
    this.setState({
      sendPageState: newSendPageState
    });
  };
  setRPCConfig = rpcConfig => {
    this.setState({
      rpcConfig
    });
    console.log(rpcConfig);
    this.rpc.configure(rpcConfig);
  };
  setPslPrice = price => {
    console.log(`Price = ${price}`);
    const {
      info
    } = this.state;
    const newInfo = new Info();
    Object.assign(newInfo, info);
    newInfo.pslPrice = price;
    this.setState({
      info: newInfo
    });
  };
  setInfo = newInfo => {
    // If the price is not set in this object, copy it over from the current object
    const {
      info
    } = this.state;

    if (!newInfo.pslPrice) {
      // eslint-disable-next-line no-param-reassign
      newInfo.pslPrice = info.pslPrice;
    }

    this.setState({
      info: newInfo
    });
  };
  sendTransaction = async (sendJson, fnOpenSendErrorModal) => {
    try {
      const success = await this.rpc.sendTransaction(sendJson, fnOpenSendErrorModal);
      return success;
    } catch (err) {
      console.log('route sendtx error', err);
    }
  }; // Get a single private key for this address, and return it as a string.

  getPrivKeyAsString = async address => {
    return this.rpc.getPrivKeyAsString(address);
  }; // Getter methods, which are called by the components to update the state

  fetchAndSetSinglePrivKey = async address => {
    const key = await this.rpc.getPrivKeyAsString(address);
    const addressPrivateKeys = {};
    addressPrivateKeys[address] = key;
    this.setState({
      addressPrivateKeys
    });
  };
  fetchAndSetSingleViewKey = async address => {
    const key = await this.rpc.getViewKeyAsString(address);
    const addressViewKeys = {};
    addressViewKeys[address] = key;
    this.setState({
      addressViewKeys
    });
  };
  addAddressBookEntry = (label, address) => {
    // Add an entry into the address book
    const {
      addressBook
    } = this.state;
    const newAddressBook = addressBook.concat(new AddressBookEntry(label, address)); // Write to disk. This method is async

    AddressbookImpl.writeAddressBook(newAddressBook);
    this.setState({
      addressBook: newAddressBook
    });
  };
  removeAddressBookEntry = label => {
    const {
      addressBook
    } = this.state;
    const newAddressBook = addressBook.filter(i => i.label !== label); // Write to disk. This method is async

    AddressbookImpl.writeAddressBook(newAddressBook);
    this.setState({
      addressBook: newAddressBook
    });
  };
  createNewAddress = async zaddress => {
    // Create a new address
    const newaddress = await this.rpc.createNewAddress(zaddress);
    console.log(`Created new Address ${newaddress}`); // And then fetch the list of addresses again to refresh

    this.rpc.fetchAllAddresses();
    const {
      receivePageState
    } = this.state;
    const newRerenderKey = receivePageState.rerenderKey + 1;
    const newReceivePageState = new ReceivePageState();
    newReceivePageState.newAddress = newaddress;
    newReceivePageState.rerenderKey = newRerenderKey;
    this.setState({
      receivePageState: newReceivePageState
    });
    return newaddress;
  };
  updateConnectedCompanionApp = connectedCompanionApp => {
    this.setState({
      connectedCompanionApp
    });
  };
  doRefresh = () => {
    this.rpc.refresh();
  };

  async getPastelIDs() {
    try {
      const ids = await this.rpc.getPastelIDs();
      this.setState({
        pastelIDs: ids
      });
    } catch (e) {
      this.openErrorModal('Can not fetch Pastel IDs', "We cound't fetch existing Pastel IDs for some reason. Please restart the wallet to try again."); // TODO log errors to a central logger so we can address them later.

      console.warn(e);
    }
  }

  createNewPastelID = async passphrase => {
    try {
      const res = await this.rpc.createNewPastelID(passphrase);
      this.setState(prevState => ({
        pastelIDs: [...prevState.pastelIDs, res]
      }));
    } catch (e) {
      this.openErrorModal('Can not create new Pastel ID', "We cound't create a new Pastel ID for some reason. Please restart the wallet and try again."); // TODO log errors to a central logger so we can address them later.

      console.warn(e);
    }
  };

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
      pastelIDs
    } = this.state;
    const standardProps = {
      openErrorModal: this.openErrorModal,
      closeErrorModal: this.closeErrorModal,
      setSendTo: this.setSendTo,
      info
    };
    return <App>
        <ErrorModal title={errorModalData.title} body={errorModalData.body} modalIsOpen={errorModalData.modalIsOpen} closeModal={this.closeErrorModal} />

        <div style={{
        overflow: 'hidden'
      }}>
          {info && info.version && <div className={cstyles.sidebarcontainer}>
              <Sidebar info={info} setSendTo={this.setSendTo} getPrivKeyAsString={this.getPrivKeyAsString} importPrivKeys={this.importPrivKeys} importANIPrivKeys={this.importANIPrivKeys} addresses={addresses} transactions={transactions} {...standardProps} />
            </div>}
          <div className={cstyles.contentcontainer}>
            <Switch>
              <Route path={routes.SEND} render={() => <Send addressesWithBalance={addressesWithBalance} sendTransaction={this.sendTransaction} sendPageState={sendPageState} setSendPageState={this.setSendPageState} addressBook={addressBook} {...standardProps} />} />
              <Route path={routes.RECEIVE} render={() => <Receive rerenderKey={receivePageState.rerenderKey} addresses={addresses} addressesWithBalance={addressesWithBalance} addressPrivateKeys={addressPrivateKeys} addressViewKeys={addressViewKeys} receivePageState={receivePageState} addressBook={addressBook} {...standardProps} fetchAndSetSinglePrivKey={this.fetchAndSetSinglePrivKey} fetchAndSetSingleViewKey={this.fetchAndSetSingleViewKey} createNewAddress={this.createNewAddress} />} />
              <Route path={routes.ADDRESSBOOK} render={() => <AddressBook addressBook={addressBook} addAddressBookEntry={this.addAddressBookEntry} removeAddressBookEntry={this.removeAddressBookEntry} {...standardProps} />} />
              <Route path={routes.DASHBOARD} // eslint-disable-next-line react/jsx-props-no-spreading
            render={() => <Dashboard totalBalance={totalBalance} info={info} addressesWithBalance={addressesWithBalance} />} />
              <Route path={routes.TRANSACTIONS} render={() => <Transactions transactions={transactions} info={info} addressBook={addressBook} setSendTo={this.setSendTo} />} />

              <Route path={routes.PASTELD} render={() => <Pasteld info={info} refresh={this.doRefresh} />} />

              <Route path={routes.PASTEL_ID} render={() => <PastelID getPastelIDs={this.getPastelIDs.bind(this)} addressesWithBalance={addressesWithBalance} createNewAddress={this.createNewAddress} createNewPastelID={this.createNewPastelID.bind(this)} pastelIDs={pastelIDs} />} />

              <Route path={routes.CONNECTMOBILE} render={() => <WormholeConnection companionAppListener={this.companionAppListener} connectedCompanionApp={connectedCompanionApp} />} />

              <Route path={routes.LOADING} render={() => <LoadingScreen setRPCConfig={this.setRPCConfig} setInfo={this.setInfo} />} />
            </Switch>
          </div>
        </div>
      </App>;
  }

}