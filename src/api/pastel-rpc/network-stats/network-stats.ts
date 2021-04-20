/* eslint-disable */
import {
  IBlockInfo,
  IBlockSubsidy,
  IChainTips,
  IListTransactions,
  IListUnspent,
  IMempoolInfo,
  IMiningInfo,
  INetTotals,
  INetworkInfo,
  IRawTransaction,
  IReceivedByAddress,
  ITotalBalance,
  ITransactionInfo,
  ITxoutsetInfo,
  IWalletInfo,
} from '../../../type'
import { rpc, TRPCConfig } from '../rpc'

interface IStatistic {
  hashrate: string
  difficulty: string
}

export async function getStatisticInfo(
  config: TRPCConfig,
): Promise<IStatistic> {
  try {
    const [hashrate, difficulty] = await Promise.all([
      getNetworkHashps(config),
      getDifficulty(config),
    ])
    return {
      hashrate: hashrate,
      difficulty: difficulty,
    }
  } catch (error) {
    throw new Error(`network-stats getStatisticInfo error: ${error.message}`)
  }
}

export async function getNetworkHashps(config: TRPCConfig): Promise<string> {
  const { result } = await rpc('getnetworkhashps', [], config)
  return result
}

export async function getDifficulty(config: TRPCConfig): Promise<string> {
  const { result } = await rpc('getdifficulty', [], config)
  return result
}

export async function getNetworkInfo(
  config: TRPCConfig,
): Promise<INetworkInfo> {
  const { result } = await rpc('getnetworkinfo', [], config)
  return result
}

export async function getNetTotals(config: TRPCConfig): Promise<INetTotals> {
  const { result } = await rpc('getnettotals', [], config)
  return result
}

export async function getMempoolInfo(
  config: TRPCConfig,
): Promise<IMempoolInfo> {
  const { result } = await rpc('getmempoolinfo', [], config)
  return result
}

export async function getMiningInfo(config: TRPCConfig): Promise<IMiningInfo> {
  const { result } = await rpc('getmininginfo', [], config)
  return result
}

export async function getRawMempool(config: TRPCConfig): Promise<any> {
  const { result } = await rpc('getrawmempool', [], config)
  return result
}

export async function getBlockByHeight(config: TRPCConfig): Promise<string> {
  // const height = 1000
  const { result } = await rpc('getblockhash', [], config)
  return result
}

export async function getBlockHeaderByHash(
  hash: string,
  config: TRPCConfig,
): Promise<IBlockInfo> {
  const { result } = await rpc('getblockheader', [hash], config)
  return result
}

export async function getBlockByHash(config: TRPCConfig): Promise<IBlockInfo> {
  const hash = await getBlockByHeight(config)
  const { result } = await rpc('getblock', [hash], config)
  return result
}

export async function getAddress(config: TRPCConfig): Promise<any> {
  const { result } = await rpc('validateaddress', [], config)
  return result
}

export async function getRawTransaction(
  txId: string,
  config: TRPCConfig,
): Promise<IRawTransaction> {
  const { result } = await rpc('getrawtransaction', [txId], config)
  return result
}

export async function getWalletTransaction(
  txId: string,
  config: TRPCConfig,
): Promise<ITransactionInfo> {
  const { result } = await rpc('gettransaction', [txId], config)
  return result
}

export async function getUtxo(txId: string, config: TRPCConfig): Promise<any> {
  const { result } = await rpc('gettxout', [txId], config)
  return result
}

export async function getTxOut(config: TRPCConfig): Promise<any> {
  const { result } = await rpc('gettxout', [], config)
  return result
}

export async function getRpcData(config: TRPCConfig): Promise<ITxoutsetInfo> {
  const { result } = await rpc('gettxoutsetinfo', [], config)
  return result
}

export async function getAddressBalance(config: TRPCConfig): Promise<void> {
  await rpc('getaddressbalance', [], config)
  return
}

export async function getAddressDeltas(config: TRPCConfig): Promise<void> {
  await rpc('getaddressdeltas', [], config)
  return
}

export async function getAddressMempool(config: TRPCConfig): Promise<void> {
  await rpc('getaddressmempool', [], config)
  return
}

export async function getAddressTxids(config: TRPCConfig): Promise<void> {
  await rpc('getaddresstxids', [], config)
  return
}

export async function getAddressUtxos(config: TRPCConfig): Promise<void> {
  await rpc('getaddressutxos', [], config)
  return
}

export async function getBestBlockhash(config: TRPCConfig): Promise<string> {
  const { result } = await rpc('getbestblockhash', [], config)
  return result
}

export async function getBlockCount(config: TRPCConfig): Promise<number> {
  const { result } = await rpc('getblockcount', [], config)
  return result
}

export async function getBlockDeltas(config: TRPCConfig): Promise<void> {
  await rpc('getblockdeltas', [], config)
  return
}

export async function getBlockHashes(config: TRPCConfig): Promise<void> {
  await rpc('getblockhashes', [], config)
  return
}

export async function getBlockHeader(config: TRPCConfig): Promise<any> {
  const { result } = await rpc('getblockheader', [], config)
  return result
}

export async function getChaintips(config: TRPCConfig): Promise<IChainTips[]> {
  const { result } = await rpc('getchaintips', [], config)
  return result
}

export async function getSpentInfo(config: TRPCConfig): Promise<void> {
  await rpc('getspentinfo', [], config)
  return
}

export async function getTxoutProof(config: TRPCConfig): Promise<void> {
  await rpc('gettxoutproof', [], config)
  return
}

export async function verifyChain(config: TRPCConfig): Promise<void> {
  const { result } = await rpc('verifychain', [], config)
  return result
}

export async function verifyTxoutProof(config: TRPCConfig): Promise<void> {
  await rpc('verifytxoutproof', [], config)
  return
}

export async function getTreeState(config: TRPCConfig): Promise<void> {
  await rpc('z_gettreestate', [], config)
  return
}

export async function getExperimentalFeatures(
  config: TRPCConfig,
): Promise<void> {
  await rpc('getexperimentalfeatures', [], config)
  return
}

export async function getMemoryInfo(config: TRPCConfig): Promise<void> {
  await rpc('getmemoryinfo', [], config)
  return
}

export async function getPaymentDisclosure(config: TRPCConfig): Promise<void> {
  await rpc('z_getpaymentdisclosure', [], config)
  return
}

export async function validatePaymentDisclosure(
  config: TRPCConfig,
): Promise<void> {
  const { result } = await rpc('z_validatepaymentdisclosure', [], config)
  return result
}

export async function getGenerate(config: TRPCConfig): Promise<any> {
  const { result } = await rpc('getgenerate', [], config)
  return result
}

export async function getBlockSubSidy(
  config: TRPCConfig,
): Promise<IBlockSubsidy> {
  const { result } = await rpc('getblocksubsidy', [], config)
  return result
}

export async function getBlockTemplate(config: TRPCConfig): Promise<void> {
  await rpc('getblocktemplate', [], config)
  return
}

export async function getLocalSolps(config: TRPCConfig): Promise<any> {
  const { result } = await rpc('getlocalsolps', [], config)
  return result
}

export async function getNetworkSolps(config: TRPCConfig): Promise<any> {
  const { result } = await rpc('getnetworksolps', [], config)
  return result
}

export async function prioritiseTransaction(
  txId: string,
  delta: number,
  fee: number,
  config: TRPCConfig,
): Promise<any> {
  const { result } = await rpc('prioritisetransaction', [txId], config)
  return result
}

export async function getAddedNodeInfo(config: TRPCConfig): Promise<void> {
  await rpc('getaddednodeinfo', [], config)
  return
}

export async function getConnectionCount(config: TRPCConfig): Promise<void> {
  await rpc('getconnectioncount', [], config)
  return
}

export async function getDeprecationInfo(config: TRPCConfig): Promise<void> {
  await rpc('getdeprecationinfo', [], config)
}

export async function getPeerInfo(config: TRPCConfig): Promise<any> {
  const { result } = await rpc('getpeerinfo', [], config)
  return result
}

export async function listBanned(config: TRPCConfig): Promise<any> {
  const { result } = await rpc('listbanned', [], config)
  return result
}

export async function estimateFee(config: TRPCConfig): Promise<void> {
  await rpc('estimatefee', [], config)
  return
}

export async function estimatePriority(config: TRPCConfig): Promise<void> {
  await rpc('estimatepriority', [], config)
  return
}

export async function verifyMessage(config: TRPCConfig): Promise<void> {
  await rpc('verifymessage', [], config)
  return
}

export async function validateaddress(
  address: string,
  config: TRPCConfig,
): Promise<any> {
  const { result } = await rpc('z_validateaddress', [address], config)
  return result
}

export async function getAccount(
  address: string,
  config: TRPCConfig,
): Promise<any> {
  const { result } = await rpc('getaccount', [address], config)
  return result
}

export async function getBalance(config: TRPCConfig): Promise<any> {
  const { result } = await rpc('getbalance', [], config)
  return result
}

export async function getRawChangeAddress(config: TRPCConfig): Promise<any> {
  const { result } = await rpc('getrawchangeaddress', [], config)
  return result
}

export async function getReceivedByAccount(config: TRPCConfig): Promise<void> {
  await rpc('getreceivedbyaccount', [], config)
  return
}

export async function getreceivedByAddress(
  address: string,
  minconf: number,
  config: TRPCConfig,
): Promise<any> {
  const { result } = await rpc('getreceivedbyaddress', [address], config)
  return result
}

export async function getTransaction(
  config: TRPCConfig,
): Promise<ITransactionInfo> {
  const { result } = await rpc('gettransaction', [], config)
  return result
}

export async function getUnconfirmedBalance(config: TRPCConfig): Promise<void> {
  const { result } = await rpc('getunconfirmedbalance', [], config)
  return result
}

export async function getWalletInfo(config: TRPCConfig): Promise<IWalletInfo> {
  const { result } = await rpc('getwalletinfo', [], config)
  return result
}

export async function listAccounts(config: TRPCConfig): Promise<any> {
  const { result } = await rpc('listaccounts', [], config)
  return result
}

export async function listAddressGroupings(config: TRPCConfig): Promise<any> {
  const { result } = await rpc('listaddressgroupings', [], config)
  return result
}

export async function listLockUnspent(config: TRPCConfig): Promise<any> {
  const { result } = await rpc('listlockunspent', [], config)
  return result
}

export async function listReceivedByAccount(config: TRPCConfig): Promise<any> {
  const { result } = await rpc('listreceivedbyaccount', [], config)
  return result
}

export async function listReceivedByAddress(
  config: TRPCConfig,
): Promise<IReceivedByAddress[]> {
  const { result } = await rpc('listreceivedbyaddress', [], config)
  return result
}

export async function getListSinceBlock(config: TRPCConfig): Promise<any> {
  const { result } = await rpc('listsinceblock', [], config)
  return result
}

export async function listTransactions(
  config: TRPCConfig,
): Promise<IListTransactions[]> {
  const { result } = await rpc('listtransactions', [], config)
  return result
}

export async function listUnspent(config: TRPCConfig): Promise<IListUnspent[]> {
  const { result } = await rpc('listunspent', [], config)
  return result
}

export async function getZBalance(
  address: string,
  mineconf: string,
  config: TRPCConfig,
): Promise<any> {
  return await rpc('z_getbalance', [address, mineconf], config)
}

export async function getMigrationStatus(config: TRPCConfig): Promise<void> {
  return await rpc('z_getmigrationstatus', [], config)
}

export async function getNewAddress(config: TRPCConfig): Promise<any> {
  await rpc('z_getnewaddress', [], config)
}

export async function getNotesCount(config: TRPCConfig): Promise<void> {
  return await rpc('z_getnotescount', [], config)
}

export async function getOperationResult(config: TRPCConfig): Promise<void> {
  return await rpc('z_getoperationresult', [], config)
}

export async function getOperationStatus(config: TRPCConfig): Promise<void> {
  return await rpc('z_getoperationstatus', [], config)
}

export async function getTotalBalance(
  config: TRPCConfig,
): Promise<ITotalBalance> {
  const { result } = await rpc('z_gettotalbalance', [], config)
  return result
}

export async function listAddresses(config: TRPCConfig): Promise<string[]> {
  const { result } = await rpc('z_listaddresses', [], config)
  return result
}

export async function listOperationIds(config: TRPCConfig): Promise<any> {
  const { result } = await rpc('z_listoperationids', [], config)
  return result
}

export async function zListReceivedByAddress(
  config: TRPCConfig,
): Promise<void> {
  return await rpc('z_listreceivedbyaddress', [], config)
}

export async function z_listunspent(config: TRPCConfig): Promise<void> {
  return await rpc('z_listunspent', [], config)
}
