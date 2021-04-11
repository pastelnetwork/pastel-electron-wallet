/* eslint-disable */
import {
  BlockInfo,
  BlockSubsidy,
  ChainTips,
  ListTransactions,
  ListUnspent,
  MempoolInfo,
  MiningInfo,
  NetTotals,
  NetworkInfo,
  PastelRPCResponse,
  RawTransaction,
  ReceivedByAddress,
  TotalBalance,
  TransactionInfo,
  TxoutsetInfo,
  WalletInfo,
} from '../../features/type'
import { rpc, TRPCConfig } from './rpc'

interface StatisticType {
  hashrate: string
  difficulty: string
  block: string
}

export async function getStatisticInfos(
  config: TRPCConfig,
): Promise<StatisticType> {
  try {
    const hashrate = await getNetworkHashps(config)
    const difficulty = await getDifficulty(config)
    return {
      hashrate: hashrate,
      difficulty: difficulty,
      block: '',
    }
  } catch (error) {
    return {
      hashrate: '',
      difficulty: '',
      block: '',
    }
  }
}

export async function getNetworkHashps(config: TRPCConfig): Promise<string> {
  const res: PastelRPCResponse = await rpc('getnetworkhashps', [], config)
  return res.result
}

export async function getDifficulty(config: TRPCConfig): Promise<string> {
  const res: PastelRPCResponse = await rpc('getdifficulty', [], config)
  return res.result
}

export async function getNetworkInfo(config: TRPCConfig): Promise<NetworkInfo> {
  const res: PastelRPCResponse = await rpc('getnetworkinfo', [], config)
  return res.result
}

export async function getNetTotals(config: TRPCConfig): Promise<NetTotals> {
  const res: PastelRPCResponse = await rpc('getnettotals', [], config)
  return res.result
}

export async function getMempoolInfo(config: TRPCConfig): Promise<MempoolInfo> {
  const res: PastelRPCResponse = await rpc('getmempoolinfo', [], config)
  return res.result
}

export async function getMiningInfo(config: TRPCConfig): Promise<MiningInfo> {
  const res: PastelRPCResponse = await rpc('getmininginfo', [], config)
  return res.result
}

export async function getRawMempool(config: TRPCConfig): Promise<MempoolInfo> {
  const res: PastelRPCResponse = await rpc('getrawmempool', [true], config)
  return res.result
}

export async function getBlockByHeight(config: TRPCConfig): Promise<string> {
  const height = 1000
  const res: PastelRPCResponse = await rpc('getblockhash', [height], config)
  return res.result
}

export async function getBlockHeaderByHash(
  hash: string,
  config: TRPCConfig,
): Promise<BlockInfo> {
  const res: PastelRPCResponse = await rpc('getblockheader', [hash], config)
  return res.result
}

export async function getBlockByHash(config: TRPCConfig): Promise<BlockInfo> {
  const hash = await getBlockByHeight(config)
  const res: PastelRPCResponse = await rpc('getblock', [hash], config)
  return res.result
}

export async function getAddress(config: TRPCConfig): Promise<any> {
  const res: PastelRPCResponse = await rpc('validateaddress', [], config)
  return res.result
}

export async function getRawTransaction(
  txId: string,
  config: TRPCConfig,
): Promise<RawTransaction> {
  const res: PastelRPCResponse = await rpc(
    'getrawtransaction',
    [txId, 1],
    config,
  )
  return res.result
}

export async function getWalletTransaction(
  txId: string,
  config: TRPCConfig,
): Promise<TransactionInfo> {
  const res: PastelRPCResponse = await rpc(
    'gettransaction',
    [txId, true],
    config,
  )
  return res.result
}

export async function getUtxo(txId: string, config: TRPCConfig): Promise<any> {
  const res: PastelRPCResponse = await rpc('gettxout', [txId, 1], config)
  return res.result
}

export async function getTxOut(config: TRPCConfig): Promise<any> {
  const res: PastelRPCResponse = await rpc('gettxout', [], config)
  return res.result
}

export async function getRpcData(config: TRPCConfig): Promise<TxoutsetInfo> {
  const res: PastelRPCResponse = await rpc('gettxoutsetinfo', [], config)
  return res.result
}

export async function getAddressBalance(config: TRPCConfig): Promise<void> {
  // disabled
  await rpc('getaddressbalance', [], config)
  return
}

export async function getAddressDeltas(config: TRPCConfig): Promise<void> {
  // disabled
  await rpc('getaddressdeltas', [], config)
}

export async function getAddressMempool(config: TRPCConfig): Promise<void> {
  // disabled
  await rpc('getaddressmempool', [], config)
}

export async function getAddressTxids(config: TRPCConfig): Promise<void> {
  // disabled
  await rpc('getaddresstxids', [], config)
}

export async function getAddressUtxos(config: TRPCConfig): Promise<void> {
  // disabled
  await rpc('getaddressutxos', [], config)
}

export async function getBestBlockhash(config: TRPCConfig): Promise<string> {
  const res: PastelRPCResponse = await rpc('getbestblockhash', [], config)
  return res.result
}

export async function getBlockCount(config: TRPCConfig): Promise<number> {
  const res: PastelRPCResponse = await rpc('getblockcount', [], config)
  return res.result
}

export async function getBlockDeltas(config: TRPCConfig): Promise<void> {
  // disabled
  await rpc('getblockdeltas', [], config)
}

export async function getBlockHashes(config: TRPCConfig): Promise<void> {
  // disabled
  await rpc('getblockhashes', [], config)
}

export async function getBlockHeader(config: TRPCConfig): Promise<any> {
  const res: PastelRPCResponse = await rpc('getblockheader', [], config)
  return res.result
}

export async function getChaintips(config: TRPCConfig): Promise<ChainTips[]> {
  const res: PastelRPCResponse = await rpc('getchaintips', [], config)
  return res.result
}

export async function getSpentInfo(config: TRPCConfig): Promise<void> {
  // disabled
  await rpc('getspentinfo', [], config)
}

export async function getTxoutProof(config: TRPCConfig): Promise<void> {
  //unknown param
  await rpc('gettxoutproof', [], config)
}

export async function verifyChain(config: TRPCConfig): Promise<void> {
  const res: PastelRPCResponse = await rpc('verifychain', [], config)
  return res.result
}

export async function verifyTxoutProof(config: TRPCConfig): Promise<void> {
  //unknown param
  await rpc('verifytxoutproof', [], config)
}

export async function getTreeState(config: TRPCConfig): Promise<void> {
  // unknow param
  await rpc('z_gettreestate', [], config)
}

export async function getExperimentalFeatures(
  config: TRPCConfig,
): Promise<void> {
  // disabled
  await rpc('getexperimentalfeatures', [], config)
}

export async function getMemoryInfo(config: TRPCConfig): Promise<void> {
  // unknown param
  await rpc('getmemoryinfo', [], config)
}

export async function getPaymentDisclosure(config: TRPCConfig): Promise<void> {
  // disabled
  await rpc('z_getpaymentdisclosure', [], config)
}

export async function validatePaymentDisclosure(
  config: TRPCConfig,
): Promise<void> {
  const res: PastelRPCResponse = await rpc(
    'z_validatepaymentdisclosure',
    [],
    config,
  )
  return res.result
}

export async function getGenerate(config: TRPCConfig): Promise<any> {
  const res: PastelRPCResponse = await rpc('getgenerate', [], config)
  return res.result
}

export async function getBlockSubSidy(
  config: TRPCConfig,
): Promise<BlockSubsidy> {
  const res: PastelRPCResponse = await rpc('getblocksubsidy', [], config)
  return res.result
}

export async function getBlockTemplate(config: TRPCConfig): Promise<void> {
  // unknow param
  await rpc('getblocktemplate', [], config)
}

export async function getLocalSolps(config: TRPCConfig): Promise<any> {
  const res: PastelRPCResponse = await rpc('getlocalsolps', [], config)
  return res.result
}

export async function getNetworkSolps(config: TRPCConfig): Promise<any> {
  const res: PastelRPCResponse = await rpc('getnetworksolps', [], config)
  return res.result
}

export async function prioritiseTransaction(
  txId: string,
  delta: number,
  fee: number,
  config: TRPCConfig,
): Promise<any> {
  const res: PastelRPCResponse = await rpc(
    'prioritisetransaction',
    [txId, delta, fee],
    config,
  )
  return res.result
}

export async function getAddedNodeInfo(config: TRPCConfig): Promise<void> {
  // unknown param
  await rpc('getaddednodeinfo', [], config)
}

export async function getConnectionCount(config: TRPCConfig): Promise<void> {
  // unsupport
  await rpc('getconnectioncount', [], config)
}

export async function getDeprecationInfo(config: TRPCConfig): Promise<void> {
  // unsupport
  await rpc('getdeprecationinfo', [], config)
}

export async function getPeerInfo(config: TRPCConfig): Promise<any> {
  const res: PastelRPCResponse = await rpc('getpeerinfo', [], config)
  return res.result
}

export async function listBanned(config: TRPCConfig): Promise<any> {
  const res: PastelRPCResponse = await rpc('listbanned', [], config)
  return res.result
}

export async function estimateFee(config: TRPCConfig): Promise<void> {
  // unknow param
  await rpc('estimatefee', [], config)
}

export async function estimatePriority(config: TRPCConfig): Promise<void> {
  //unknown param
  await rpc('estimatepriority', [], config)
}

export async function verifyMessage(config: TRPCConfig): Promise<void> {
  //unknown param
  await rpc('verifymessage', [], config)
}

export async function validateaddress(
  address: string,
  config: TRPCConfig,
): Promise<any> {
  const res: PastelRPCResponse = await rpc(
    'z_validateaddress',
    [address],
    config,
  )
  return res.result
}

export async function getAccount(
  address: string,
  config: TRPCConfig,
): Promise<any> {
  const res: PastelRPCResponse = await rpc('getaccount', [address], config)
  return res.result
}

export async function getBalance(config: TRPCConfig): Promise<any> {
  const res: PastelRPCResponse = await rpc('getbalance', [], config)
  return res.result
}

export async function getRawChangeAddress(config: TRPCConfig): Promise<any> {
  const res: PastelRPCResponse = await rpc('getrawchangeaddress', [], config)
  return res.result
}

export async function getReceivedByAccount(config: TRPCConfig): Promise<void> {
  //unknown param
  await rpc('getreceivedbyaccount', [], config)
}

export async function getreceivedByAddress(
  address: string,
  minconf: number,
  config: TRPCConfig,
): Promise<any> {
  const res: PastelRPCResponse = await rpc(
    'getreceivedbyaddress',
    [address, minconf],
    config,
  )
  return res.result
}

export async function getTransaction(
  config: TRPCConfig,
): Promise<TransactionInfo> {
  const res: PastelRPCResponse = await rpc('gettransaction', [], config)
  return res.result
}

export async function getUnconfirmedBalance(config: TRPCConfig): Promise<void> {
  //unsupport
  const res: PastelRPCResponse = await rpc('getunconfirmedbalance', [], config)
  return res.result
}

export async function getWalletInfo(config: TRPCConfig): Promise<WalletInfo> {
  const res: PastelRPCResponse = await rpc('getwalletinfo', [], config)
  return res.result
}

export async function listAccounts(config: TRPCConfig): Promise<any> {
  const res: PastelRPCResponse = await rpc('listaccounts', [], config)
  return res.result
}

export async function listAddressGroupings(config: TRPCConfig): Promise<any> {
  const res: PastelRPCResponse = await rpc('listaddressgroupings', [], config)
  return res.result
}

export async function listLockUnspent(config: TRPCConfig): Promise<any> {
  const res: PastelRPCResponse = await rpc('listlockunspent', [], config)
  return res.result
}

export async function listReceivedByAccount(config: TRPCConfig): Promise<any> {
  const res: PastelRPCResponse = await rpc('listreceivedbyaccount', [], config)
  return res.result
}

export async function listReceivedByAddress(
  config: TRPCConfig,
): Promise<ReceivedByAddress[]> {
  const res: PastelRPCResponse = await rpc('listreceivedbyaddress', [], config)
  return res.result
}

export async function getListSinceBlock(config: TRPCConfig): Promise<any> {
  const res: PastelRPCResponse = await rpc('listsinceblock', [], config)
  return res.result
}

export async function listTransactions(
  config: TRPCConfig,
): Promise<ListTransactions[]> {
  const res: PastelRPCResponse = await rpc('listtransactions', [], config)
  return res.result
}

export async function listUnspent(config: TRPCConfig): Promise<ListUnspent[]> {
  const res: PastelRPCResponse = await rpc('listunspent', [], config)
  return res.result
}

export async function getZBalance(
  address: string,
  mineconf: string,
  config: TRPCConfig,
): Promise<any> {
  return await rpc('z_getbalance', [address, mineconf], config)
}

export async function getMigrationStatus(config: TRPCConfig): Promise<void> {
  // unknown param
  return await rpc('z_getmigrationstatus', [], config)
}

export async function getNewAddress(config: TRPCConfig): Promise<any> {
  await rpc('z_getnewaddress', [], config)
}

export async function getNotesCount(config: TRPCConfig): Promise<void> {
  // unsupport
  return await rpc('z_getnotescount', [], config)
}

export async function getOperationResult(config: TRPCConfig): Promise<void> {
  // unknown param
  return await rpc('z_getoperationresult', [], config)
}

export async function getOperationStatus(config: TRPCConfig): Promise<void> {
  // unknown param
  return await rpc('z_getoperationstatus', [], config)
}

export async function getTotalBalance(
  config: TRPCConfig,
): Promise<TotalBalance> {
  const res: PastelRPCResponse = await rpc('z_gettotalbalance', [], config)
  return res.result
}

export async function listAddresses(config: TRPCConfig): Promise<string[]> {
  const res: PastelRPCResponse = await rpc('z_listaddresses', [], config)
  return res.result
}

export async function listOperationIds(config: TRPCConfig): Promise<any> {
  const res: PastelRPCResponse = await rpc('z_listoperationids', [], config)
  return res.result
}

export async function zListReceivedByAddress(
  config: TRPCConfig,
): Promise<void> {
  // unsupport
  return await rpc('z_listreceivedbyaddress', [], config)
}

export async function z_listunspent(config: TRPCConfig): Promise<void> {
  // unknown param
  return await rpc('z_listunspent', [], config)
}
