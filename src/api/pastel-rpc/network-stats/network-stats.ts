import { rpc, TRPCConfig } from '../rpc'
import {
  TAddressDelta,
  TAddressesBalance,
  TAddressMempool,
  TAddressUtxo,
  TBlockInfo,
  TBlockSubsidy,
  TChainTips,
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
  TListTransactions,
  Tlisttransactions,
  TListUnspent,
  Tlistunspent,
  TMempoolInfo,
  TMiningInfo,
  TNetTotals,
  TNetworkInfo,
  TRawMempoolInfo,
  TRawTransaction,
  TTotalBalance,
  TTransactionInfo,
  TTxout,
  TTxoutsetInfo,
  TValidateaddress,
  TValidateaddresses,
  TWalletInfo,
} from './type'

type TStatistic = {
  hashrate: number
  difficulty: number
}

export async function getStatisticInfo(
  config: TRPCConfig,
): Promise<TStatistic> {
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
): Promise<TNetworkInfo> {
  const { result } = await rpc<TGetNetworkinfo>('getnetworkinfo', [], config)
  return result
}

export async function getNetTotals(config: TRPCConfig): Promise<TNetTotals> {
  const { result } = await rpc<TGetNetTotals>('getnettotals', [], config)
  return result
}

export async function getMempoolInfo(
  config: TRPCConfig,
): Promise<TMempoolInfo> {
  const { result } = await rpc<TGetmempoolinfo>('getmempoolinfo', [], config)
  return result
}

export async function getMiningInfo(config: TRPCConfig): Promise<TMiningInfo> {
  const { result } = await rpc<TGetmininginfo>('getmininginfo', [], config)
  return result
}

export async function getRawMempool(
  config: TRPCConfig,
): Promise<TRawMempoolInfo> {
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
): Promise<TBlockInfo> {
  const { result } = await rpc<TGetblock>('getblockheader', [hash], config)
  return result
}

export async function getBlockByHash(config: TRPCConfig): Promise<TBlockInfo> {
  const hash = await getBlockByHeight(config)
  const { result } = await rpc<TGetblock>('getblock', [hash], config)
  return result
}

export async function getAddress(
  config: TRPCConfig,
): Promise<TValidateaddress> {
  const { result } = await rpc<TValidateaddresses>(
    'validateaddress',
    [],
    config,
  )
  return result
}

export async function getRawTransaction(
  txId: string,
  config: TRPCConfig,
): Promise<TRawTransaction> {
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
): Promise<TTransactionInfo> {
  const { result } = await rpc<TGettransaction>(
    'gettransaction',
    [txId],
    config,
  )
  return result
}

export async function getTxOut(config: TRPCConfig): Promise<TTxout> {
  const { result } = await rpc<TGettxout>('gettxout', [], config)
  return result
}

export async function getRpcData(config: TRPCConfig): Promise<TTxoutsetInfo> {
  const { result } = await rpc<TGettxoutsetinfo>('gettxoutsetinfo', [], config)
  return result
}

export async function getAddressBalance(
  config: TRPCConfig,
): Promise<TAddressesBalance> {
  const { result } = await rpc<TGetaddressbalance>(
    'getaddressbalance',
    [],
    config,
  )
  return result
}

export async function getAddressDeltas(
  config: TRPCConfig,
): Promise<TAddressDelta[]> {
  const { result } = await rpc<TGetaddressdeltas>(
    'getaddressdeltas',
    [],
    config,
  )
  return result
}

export async function getAddressMempool(
  config: TRPCConfig,
): Promise<TAddressMempool[]> {
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
): Promise<TAddressUtxo> {
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

export async function getChaintips(config: TRPCConfig): Promise<TChainTips[]> {
  const { result } = await rpc<TGetchaintips>('getchaintips', [], config)
  return result
}

export async function getBlockSubSidy(
  config: TRPCConfig,
): Promise<TBlockSubsidy> {
  const { result } = await rpc<TGetblocksubsidy>('getblocksubsidy', [], config)
  return result
}

export async function getTransaction(
  config: TRPCConfig,
): Promise<TTransactionInfo> {
  const { result } = await rpc<TGettransaction>('gettransaction', [], config)
  return result
}

export async function getWalletInfo(config: TRPCConfig): Promise<TWalletInfo> {
  const { result } = await rpc<TGetwalletinfo>('getwalletinfo', [], config)
  return result
}

export async function listTransactions(
  config: TRPCConfig,
): Promise<TListTransactions[]> {
  const { result } = await rpc<Tlisttransactions>(
    'listtransactions',
    [],
    config,
  )
  return result
}

export async function listUnspent(config: TRPCConfig): Promise<TListUnspent[]> {
  const { result } = await rpc<Tlistunspent>('listunspent', [], config)
  return result
}

export async function getTotalBalance(
  config: TRPCConfig,
): Promise<TTotalBalance> {
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
