type TTableNamesValidate = {
  [key: string]: boolean
}

export const tableNames: TTableNamesValidate = {
  statisticInfo: true,
  networkInfo: true,
  netTotals: true,
  memPoolInfo: true,
  rawMempoolInfo: true,
  miningInfo: true,
  blockInfo: true,
  blockChainInfo: true,
  rawTransaction: true,
  transactionTbl: true,
  txOutSetInfo: true,
  chainTips: true,
  blockSubsidy: true,
  walletInfo: true,
  listReceivedByAddress: true,
  listTransactions: true,
  listUnspent: true,
  totalBalance: true,
  listAddresses: true,
  priceInfo: true,
}
