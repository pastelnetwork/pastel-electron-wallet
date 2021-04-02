/* eslint-disable */

export class TotalBalance {}
export class AddressBalance {
  constructor(public address: any, public balance: any) {}
}
export class AddressBookEntry {
  constructor(public label: any, public address: any) {}
}
export class TxDetail {} // List of transactions. TODO: Handle memos, multiple addresses etc...

export class Transaction {}
export class ToAddr {
  to = ''
  amount = 0
  memo = ''
  constructor(public id: any) {}
}
export class SendPageState {
  fromaddr = ''
  toaddrs = [] as any[]
}
export class ReceivePageState {
  // A newly created address to show by default
  // The key used for the receive page component.
  // Increment to force re-render
  newAddress = ''
  rerenderKey = 0
}
export class RPCConfig {
  username = ''
  password = ''
  url = ''
}
export class Info {}
export class ConnectedCompanionApp {}
export class SinglePastelID {
  constructor(public pastelid: any) {}
}

export default class AppState {}
