/* eslint-disable max-classes-per-file */
export class TotalBalance {}
export class AddressBalance {
  constructor(address, balance) {
    this.address = address;
    this.balance = balance;
  }

}
export class AddressBookEntry {
  constructor(label, address) {
    this.label = label;
    this.address = address;
  }

}
export class TxDetail {} // List of transactions. TODO: Handle memos, multiple addresses etc...

export class Transaction {}
export class ToAddr {
  constructor(id) {
    this.id = id;
    this.to = '';
    this.amount = 0;
    this.memo = '';
  }

}
export class SendPageState {
  constructor() {
    this.fromaddr = '';
    this.toaddrs = [];
  }

}
export class ReceivePageState {
  // A newly created address to show by default
  // The key used for the receive page component.
  // Increment to force re-render
  constructor() {
    this.newAddress = '';
    this.rerenderKey = 0;
  }

}
export class RPCConfig {
  constructor() {
    this.username = '';
    this.password = '';
    this.url = '';
  }

}
export class Info {}
export class ConnectedCompanionApp {}
export class SinglePastelID {
  constructor(pastelid) {
    this.pastelid = pastelid;
  }

} // eslint-disable-next-line max-classes-per-file

export default class AppState {}