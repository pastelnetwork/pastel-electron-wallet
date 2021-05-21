type TTableNamesValidate = {
  [key: string]: boolean
}

export const tableNames: TTableNamesValidate = {
  statisticinfo: true,
  networkinfo: true,
  nettotals: true,
  mempoolinfo: true,
  rawmempoolinfo: true,
  mininginfo: true,
  blockinfo: true,
  blockchaininfo: true,
  rawtransaction: true,
  transaction_tbl: true,
  txoutsetinfo: true,
  chaintips: true,
  blocksubsidy: true,
  walletinfo: true,
  listreceivedbyaddress: true,
  listtransactions: true,
  listunspent: true,
  totalbalance: true,
  listaddresses: true,
  pslprice: true,
}
