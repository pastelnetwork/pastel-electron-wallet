import {
  IAddressDelta,
  IAddressesBalance,
  IAddressMempool,
  IAddressUtxo,
  IBlockInfo,
  IBlockSubsidy,
  IChainTips,
  IListTransactions,
  IListUnspent,
  IMempoolInfo,
  IMiningInfo,
  INetTotals,
  INetworkInfo,
  IRawMempoolInfo,
  IRawTransaction,
  ITotalBalance,
  ITransactionInfo,
  ITxout,
  ITxoutsetInfo,
  IValidateaddress,
  IWalletInfo,
  TGetaccount,
  TGetaddednodeinfo,
  TGetaddressbalance,
  TGetaddressdeltas,
  TGetaddressmempool,
  TGetaddresstxids,
  TGetaddressutxos,
  TGetbalance,
  TGetbestblockhash,
  TGetblock,
  TGetblockcount,
  TGetblockdeltas,
  TGetblockhash,
  TGetblockhashes,
  TGetblockheader,
  TGetblocksubsidy,
  TGetblocktemplate,
  TGetchaintips,
  TGetdifficulty,
  TGetexperimentalfeatures,
  TGetlocalsolps,
  TGetmemoryinfo,
  TGetmempoolinfo,
  TGetmigrationstatus,
  TGetmininginfo,
  TGetNetTotals,
  TGetnetworkhashps,
  TGetNetworkinfo,
  TGetnetworksolps,
  TGetnewaddress,
  TGetoperationresult,
  TGetoperationstatus,
  TGetpaymentdisclosure,
  TGetpeerinfo,
  TGetrawchangeaddress,
  TGetrawmempool,
  TGetrawtransaction,
  TGetreceivedbyaccount,
  TGetreceivedbyaddress,
  TGetspentinfo,
  TGettotalbalance,
  TGettransaction,
  TGettreestate,
  TGettxout,
  TGettxoutproof,
  TGettxoutsetinfo,
  TGetwalletinfo,
  TGgtgenerate,
  Tlistaddresses,
  Tlistsinceblock,
  Tlisttransactions,
  Tlistunspent,
  TValidateaddress,
} from '../../../type'
import { rpc, TRPCConfig } from '../rpc'

interface IStatistic {
  hashrate: number
  difficulty: number
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

export async function getNetworkHashps(config: TRPCConfig): Promise<number> {
  const { result } = await rpc<TGetnetworkhashps>(
    'getnetworkhashps',
    [],
    config,
  )
  return result
}

export async function getDifficulty(config: TRPCConfig): Promise<number> {
  const { result } = await rpc<TGetdifficulty>('getdifficulty', [], config)
  return result
}

export async function getNetworkInfo(
  config: TRPCConfig,
): Promise<INetworkInfo> {
  const { result } = await rpc<TGetNetworkinfo>('getnetworkinfo', [], config)
  return result
}

export async function getNetTotals(config: TRPCConfig): Promise<INetTotals> {
  const { result } = await rpc<TGetNetTotals>('getnettotals', [], config)
  return result
}

export async function getMempoolInfo(
  config: TRPCConfig,
): Promise<IMempoolInfo> {
  const { result } = await rpc<TGetmempoolinfo>('getmempoolinfo', [], config)
  return result
}

export async function getMiningInfo(config: TRPCConfig): Promise<IMiningInfo> {
  const { result } = await rpc<TGetmininginfo>('getmininginfo', [], config)
  return result
}

export async function getRawMempool(
  config: TRPCConfig,
): Promise<IRawMempoolInfo> {
  const { result } = await rpc<TGetrawmempool>('getrawmempool', [], config)
  return result
}

export async function getBlockByHeight(config: TRPCConfig): Promise<string> {
  // const height = 1000
  const { result } = await rpc<TGetblockhash>('getblockhash', [], config)
  return result
}

export async function getBlockHeaderByHash(
  hash: string,
  config: TRPCConfig,
): Promise<IBlockInfo> {
  const { result } = await rpc<TGetblock>('getblockheader', [hash], config)
  return result
}

export async function getBlockByHash(config: TRPCConfig): Promise<IBlockInfo> {
  const hash = await getBlockByHeight(config)
  const { result } = await rpc<TGetblock>('getblock', [hash], config)
  return result
}

export async function getAddress(
  config: TRPCConfig,
): Promise<IValidateaddress> {
  const { result } = await rpc<TValidateaddress>('validateaddress', [], config)
  return result
}

export async function getRawTransaction(
  txId: string,
  config: TRPCConfig,
): Promise<IRawTransaction> {
  const { result } = await rpc<TGetrawtransaction>(
    'getrawtransaction',
    [txId],
    config,
  )
  return result
}

export async function getWalletTransaction(
  txId: string,
  config: TRPCConfig,
): Promise<ITransactionInfo> {
  const { result } = await rpc<TGettransaction>(
    'gettransaction',
    [txId],
    config,
  )
  return result
}

export async function getTxOut(config: TRPCConfig): Promise<ITxout> {
  const { result } = await rpc<TGettxout>('gettxout', [], config)
  return result
}

export async function getRpcData(config: TRPCConfig): Promise<ITxoutsetInfo> {
  const { result } = await rpc<TGettxoutsetinfo>('gettxoutsetinfo', [], config)
  return result
}

export async function getAddressBalance(
  config: TRPCConfig,
): Promise<IAddressesBalance> {
  const { result } = await rpc<TGetaddressbalance>(
    'getaddressbalance',
    [],
    config,
  )
  return result
}

export async function getAddressDeltas(
  config: TRPCConfig,
): Promise<IAddressDelta[]> {
  const { result } = await rpc<TGetaddressdeltas>(
    'getaddressdeltas',
    [],
    config,
  )
  return result
}

export async function getAddressMempool(
  config: TRPCConfig,
): Promise<IAddressMempool[]> {
  const { result } = await rpc<TGetaddressmempool>(
    'getaddressmempool',
    [],
    config,
  )
  return result
}

export async function getAddressTxids(config: TRPCConfig): Promise<string[]> {
  const { result } = await rpc<TGetaddresstxids>('getaddresstxids', [], config)
  return result
}

export async function getAddressUtxos(
  config: TRPCConfig,
): Promise<IAddressUtxo> {
  const { result } = await rpc<TGetaddressutxos>('getaddressutxos', [], config)
  return result
}

export async function getBestBlockhash(config: TRPCConfig): Promise<string> {
  const { result } = await rpc<TGetbestblockhash>(
    'getbestblockhash',
    [],
    config,
  )
  return result
}

export async function getBlockCount(config: TRPCConfig): Promise<number> {
  const { result } = await rpc<TGetblockcount>('getblockcount', [], config)
  return result
}

export async function getBlockDeltas(config: TRPCConfig): Promise<void> {
  await rpc<TGetblockdeltas>('getblockdeltas', [], config)
  return
}

export async function getBlockHashes(config: TRPCConfig): Promise<void> {
  await rpc<TGetblockhashes>('getblockhashes', [], config)
  return
}

export async function getBlockHeader(config: TRPCConfig): Promise<unknown> {
  const { result } = await rpc<TGetblockheader>('getblockheader', [], config)
  return result
}

export async function getChaintips(config: TRPCConfig): Promise<IChainTips[]> {
  const { result } = await rpc<TGetchaintips>('getchaintips', [], config)
  return result
}

export async function getSpentInfo(config: TRPCConfig): Promise<void> {
  await rpc<TGetspentinfo>('getspentinfo', [], config)
  return
}

export async function getTxoutProof(config: TRPCConfig): Promise<void> {
  await rpc<TGettxoutproof>('gettxoutproof', [], config)
  return
}

export async function getTreeState(config: TRPCConfig): Promise<void> {
  await rpc<TGettreestate>('z_gettreestate', [], config)
  return
}

export async function getExperimentalFeatures(
  config: TRPCConfig,
): Promise<void> {
  await rpc<TGetexperimentalfeatures>('getexperimentalfeatures', [], config)
  return
}

export async function getMemoryInfo(config: TRPCConfig): Promise<void> {
  await rpc<TGetmemoryinfo>('getmemoryinfo', [], config)
  return
}

export async function getPaymentDisclosure(config: TRPCConfig): Promise<void> {
  await rpc<TGetpaymentdisclosure>('z_getpaymentdisclosure', [], config)
  return
}

export async function getGenerate(config: TRPCConfig): Promise<unknown> {
  const { result } = await rpc<TGgtgenerate>('getgenerate', [], config)
  return result
}

export async function getBlockSubSidy(
  config: TRPCConfig,
): Promise<IBlockSubsidy> {
  const { result } = await rpc<TGetblocksubsidy>('getblocksubsidy', [], config)
  return result
}

export async function getBlockTemplate(config: TRPCConfig): Promise<void> {
  await rpc<TGetblocktemplate>('getblocktemplate', [], config)
  return
}

export async function getLocalSolps(config: TRPCConfig): Promise<unknown> {
  const { result } = await rpc<TGetlocalsolps>('getlocalsolps', [], config)
  return result
}

export async function getNetworkSolps(config: TRPCConfig): Promise<unknown> {
  const { result } = await rpc<TGetnetworksolps>('getnetworksolps', [], config)
  return result
}

export async function getAddedNodeInfo(config: TRPCConfig): Promise<void> {
  await rpc<TGetaddednodeinfo>('getaddednodeinfo', [], config)
  return
}

export async function getPeerInfo(config: TRPCConfig): Promise<unknown> {
  const { result } = await rpc<TGetpeerinfo>('getpeerinfo', [], config)
  return result
}

export async function getAccount(
  address: string,
  config: TRPCConfig,
): Promise<unknown> {
  const { result } = await rpc<TGetaccount>('getaccount', [address], config)
  return result
}

export async function getBalance(config: TRPCConfig): Promise<unknown> {
  const { result } = await rpc<TGetbalance>('getbalance', [], config)
  return result
}

export async function getRawChangeAddress(
  config: TRPCConfig,
): Promise<unknown> {
  const { result } = await rpc<TGetrawchangeaddress>(
    'getrawchangeaddress',
    [],
    config,
  )
  return result
}

export async function getReceivedByAccount(config: TRPCConfig): Promise<void> {
  await rpc<TGetreceivedbyaccount>('getreceivedbyaccount', [], config)
  return
}

export async function getreceivedByAddress(
  address: string,
  minconf: number,
  config: TRPCConfig,
): Promise<unknown> {
  const { result } = await rpc<TGetreceivedbyaddress>(
    'getreceivedbyaddress',
    [address],
    config,
  )
  return result
}

export async function getTransaction(
  config: TRPCConfig,
): Promise<ITransactionInfo> {
  const { result } = await rpc<TGettransaction>('gettransaction', [], config)
  return result
}

export async function getWalletInfo(config: TRPCConfig): Promise<IWalletInfo> {
  const { result } = await rpc<TGetwalletinfo>('getwalletinfo', [], config)
  return result
}

export async function getListSinceBlock(config: TRPCConfig): Promise<unknown> {
  const { result } = await rpc<Tlistsinceblock>('listsinceblock', [], config)
  return result
}

export async function listTransactions(
  config: TRPCConfig,
): Promise<IListTransactions[]> {
  const { result } = await rpc<Tlisttransactions>(
    'listtransactions',
    [],
    config,
  )
  return result
}

export async function listUnspent(config: TRPCConfig): Promise<IListUnspent[]> {
  const { result } = await rpc<Tlistunspent>('listunspent', [], config)
  return result
}

export async function getZBalance(
  address: string,
  mineconf: string,
  config: TRPCConfig,
): Promise<unknown> {
  const { result } = await rpc<TGetbalance>(
    'z_getbalance',
    [address, mineconf],
    config,
  )
  return result
}

export async function getMigrationStatus(config: TRPCConfig): Promise<void> {
  await rpc<TGetmigrationstatus>('z_getmigrationstatus', [], config)
  return
}

export async function getNewAddress(config: TRPCConfig): Promise<unknown> {
  const { result } = await rpc<TGetnewaddress>('z_getnewaddress', [], config)
  return result
}

export async function getOperationResult(config: TRPCConfig): Promise<void> {
  await rpc<TGetoperationresult>('z_getoperationresult', [], config)
  return
}

export async function getOperationStatus(config: TRPCConfig): Promise<void> {
  await rpc<TGetoperationstatus>('z_getoperationstatus', [], config)
  return
}

export async function getTotalBalance(
  config: TRPCConfig,
): Promise<ITotalBalance> {
  const { result } = await rpc<TGettotalbalance>(
    'z_gettotalbalance',
    [],
    config,
  )
  return result
}

export async function listAddresses(config: TRPCConfig): Promise<string[]> {
  const { result } = await rpc<Tlistaddresses>('z_listaddresses', [], config)
  return result
}

export async function z_listunspent(config: TRPCConfig): Promise<void> {
  await rpc<Tlistunspent>('z_listunspent', [], config)
  return
}
