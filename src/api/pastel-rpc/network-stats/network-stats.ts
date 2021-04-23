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
  TGetaddressbalance,
  TGetaddressdeltas,
  TGetaddressmempool,
  TGetaddresstxids,
  TGetaddressutxos,
  TGetbestblockhash,
  TGetblock,
  TGetblockcount,
  TGetblockhash,
  TGetblocksubsidy,
  TGetchaintips,
  TGetdifficulty,
  TGetmempoolinfo,
  TGetmininginfo,
  TGetNetTotals,
  TGetnetworkhashps,
  TGetNetworkinfo,
  TGetrawmempool,
  TGetrawtransaction,
  TGettotalbalance,
  TGettransaction,
  TGettxout,
  TGettxoutsetinfo,
  TGetwalletinfo,
  Tlistaddresses,
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

export async function getChaintips(config: TRPCConfig): Promise<IChainTips[]> {
  const { result } = await rpc<TGetchaintips>('getchaintips', [], config)
  return result
}

export async function getBlockSubSidy(
  config: TRPCConfig,
): Promise<IBlockSubsidy> {
  const { result } = await rpc<TGetblocksubsidy>('getblocksubsidy', [], config)
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
