import { Database } from 'sql.js'

import { rpc, TRPCConfig } from '../../api/pastel-rpc/rpc'
import PastelDB from '../../features/pastelDB/database'
import coinGeckoClient from '../pastelPrice/coingecko'
import {
  exportSqliteDB,
  insertBlockChainInfo,
  insertBlockInfoToDB,
  insertBlocksubsidy,
  insertChaintips,
  insertListaddresses,
  insertListTransactions,
  insertListunspent,
  insertMempoolInfoToDB,
  insertMiningInfoToDB,
  insertNetTotalsToDB,
  insertNetworkInfoToDB,
  insertPastelPrice,
  insertRawMempoolinfoToDB,
  insertRawtransaction,
  insertStatisticDataToDB,
  insertTotalbalance,
  insertTransaction,
  insertTxoutsetinfo,
  insertWalletinfo,
} from './pastelDBLib'
import * as types from './type'

type fetchFuncConfig = {
  pastelDB: Database
  rpcConfig: TRPCConfig
}

type TStatistic = {
  estimatedSolutions: number
  difficulty: number
}

export async function getStatisticInfo(
  config: TRPCConfig,
): Promise<TStatistic> {
  try {
    const [networkhasps, difficulty] = await Promise.all([
      rpc<types.TGetnetworkhashps>('getnetworkhashps', [], config),
      rpc<types.TGetdifficulty>('getdifficulty', [], config),
    ])
    return {
      estimatedSolutions: networkhasps.result,
      difficulty: difficulty.result,
    }
  } catch (error) {
    throw new Error(
      `pastelDBThread getnetworkhashps or getdifficulty error: ${error.message}`,
    )
  }
}

export async function fetchStatisticInfo(
  props: fetchFuncConfig,
): Promise<void> {
  try {
    const results = await getStatisticInfo(props.rpcConfig)
    insertStatisticDataToDB(
      props.pastelDB,
      results.estimatedSolutions,
      results.difficulty,
    )
  } catch (error) {
    throw new Error(`pastelDBThread fetchStatisticInfo error: ${error.message}`)
  }
}

export async function fetchNetworkInfo(props: fetchFuncConfig): Promise<void> {
  try {
    const { result } = await rpc<types.TGetNetworkinfo>(
      'getnetworkinfo',
      [],
      props.rpcConfig,
    )
    insertNetworkInfoToDB(props.pastelDB, result)
  } catch (error) {
    throw new Error(`pastelDBThread fetchNetworkInfo error: ${error.message}`)
  }
}

export async function fetchNettotals(props: fetchFuncConfig): Promise<void> {
  try {
    const { result } = await rpc<types.TGetNetTotals>(
      'getnettotals',
      [],
      props.rpcConfig,
    )
    insertNetTotalsToDB(props.pastelDB, result)
  } catch (error) {
    throw new Error(`pastelDBThread fetchNettotals error: ${error.message}`)
  }
}

export async function fetchMempoolInfo(props: fetchFuncConfig): Promise<void> {
  try {
    const { result } = await rpc<types.TGetmempoolinfo>(
      'getmempoolinfo',
      [],
      props.rpcConfig,
    )
    insertMempoolInfoToDB(props.pastelDB, result)
  } catch (error) {
    throw new Error(`pastelDBThread fetchMempoolInfo error: ${error.message}`)
  }
}

export async function fetchRawMempoolInfo(
  props: fetchFuncConfig,
): Promise<void> {
  try {
    const { result } = await rpc<types.TGetrawmempool>(
      'getrawmempool',
      [true],
      props.rpcConfig,
    )
    const keys = Object.keys(result)
    if (keys.length) {
      const transactionid = keys[0]
      const rawmempool = result[transactionid]
      const data: types.TRawMempool = {
        transactionid: transactionid,
        size: rawmempool.size,
        fee: rawmempool.fee,
        time: rawmempool.time,
        height: rawmempool.height,
        startingpriority: rawmempool.startingpriority,
        currentpriority: rawmempool.currentpriority,
        depends: rawmempool.depends,
      }
      insertRawMempoolinfoToDB(props.pastelDB, data)
    }
  } catch (error) {
    throw new Error(
      `pastelDBThread fetchRawMempoolInfo error: ${error.message}`,
    )
  }
}

export async function fetchMiningInfo(props: fetchFuncConfig): Promise<void> {
  try {
    const { result } = await rpc<types.TGetmininginfo>(
      'getmininginfo',
      [],
      props.rpcConfig,
    )
    insertMiningInfoToDB(props.pastelDB, result)
  } catch (error) {
    throw new Error(`pastelDBThread fetchMiningInfo error: ${error.message}`)
  }
}

export async function fetchBlock(props: fetchFuncConfig): Promise<void> {
  try {
    const hash = await rpc<types.TGetblockhash>(
      'getbestblockhash',
      [],
      props.rpcConfig,
    )
    const blockInfo = await rpc<types.TGetblock>(
      'getblock',
      [hash.result],
      props.rpcConfig,
    )
    if (insertBlockInfoToDB(props.pastelDB, blockInfo.result)) {
      await fetchRawtransaction(props, blockInfo.result.tx)
    }
  } catch (error) {
    throw new Error(`pastelDBThread fetchBlock error: ${error}`)
  }
}

export async function fetchRawtransaction(
  props: fetchFuncConfig,
  txIds: string[],
): Promise<void> {
  try {
    for (let i = 0; i < txIds.length; i++) {
      if (txIds[i]) {
        const { result } = await rpc<types.TGetrawtransaction>(
          'getrawtransaction',
          [txIds[i], 1],
          props.rpcConfig,
        )
        insertRawtransaction(props.pastelDB, result)
      }
    }
  } catch (error) {
    throw new Error(
      `pastelDBThread fetchRawtransaction error: ${error.message}`,
    )
  }
}

export async function fetchTransaction(props: fetchFuncConfig): Promise<void> {
  try {
    const { result } = await rpc<types.TListsinceblock>(
      'listsinceblock',
      [],
      props.rpcConfig,
    )
    const listSinceBlock = result
    for (let i = 0; i < listSinceBlock.transactions.length; i++) {
      const transaction: types.TSinceblockTransaction =
        listSinceBlock.transactions[i]
      const { result } = await rpc<types.TGettransaction>(
        'gettransaction',
        [transaction.txid],
        props.rpcConfig,
      )
      insertTransaction(props.pastelDB, result)
    }
  } catch (error) {
    throw new Error(`pastelDBThread fetchTransaction error: ${error.message}`)
  }
}

export async function fetchTxoutsetInfo(props: fetchFuncConfig): Promise<void> {
  try {
    const { result } = await rpc<types.TGettxoutsetinfo>(
      'gettxoutsetinfo',
      [],
      props.rpcConfig,
    )
    insertTxoutsetinfo(props.pastelDB, result)
  } catch (error) {
    throw new Error(`pastelDBThread fetchTxoutsetInfo error: ${error.message}`)
  }
}

export async function fetchChaintips(props: fetchFuncConfig): Promise<void> {
  try {
    const { result } = await rpc<types.TGetchaintips>(
      'getchaintips',
      [],
      props.rpcConfig,
    )
    const chaintips = result
    for (let i = 0; i < chaintips.length; i++) {
      insertChaintips(props.pastelDB, chaintips[i])
    }
  } catch (error) {
    throw new Error(`pastelDBThread fetchChaintips error: ${error.message}`)
  }
}

export async function fetchBlocksubsidy(props: fetchFuncConfig): Promise<void> {
  try {
    const { result } = await rpc<types.TGetblocksubsidy>(
      'getblocksubsidy',
      [],
      props.rpcConfig,
    )
    insertBlocksubsidy(props.pastelDB, result)
  } catch (error) {
    throw new Error(`pastelDBThread fetchBlocksubsidy error: ${error.message}`)
  }
}

export async function fetchWalletInfo(props: fetchFuncConfig): Promise<void> {
  try {
    const { result } = await rpc<types.TGetwalletinfo>(
      'getwalletinfo',
      [],
      props.rpcConfig,
    )
    insertWalletinfo(props.pastelDB, result)
  } catch (error) {
    throw new Error(`pastelDBThread fetchWalletInfo error: ${error.message}`)
  }
}

export async function fetchListTransactions(
  props: fetchFuncConfig,
): Promise<void> {
  try {
    const { result } = await rpc<types.Tlisttransactions>(
      'listtransactions',
      [],
      props.rpcConfig,
    )
    const transactions = result
    for (let i = 0; i < transactions.length; i++) {
      insertListTransactions(props.pastelDB, transactions[i])
    }
  } catch (error) {
    throw new Error(`pastelDBThread fetchWalletInfo error: ${error.message}`)
  }
}

export async function fetchListunspent(props: fetchFuncConfig): Promise<void> {
  try {
    const { result } = await rpc<types.Tlistunspent>(
      'listunspent',
      [],
      props.rpcConfig,
    )
    const unspentlist = result
    for (let i = 0; i < unspentlist.length; i++) {
      insertListunspent(props.pastelDB, unspentlist[i])
    }
  } catch (error) {
    throw new Error(`pastelDBThread fetchWalletInfo error: ${error.message}`)
  }
}

export async function fetchTotalbalance(props: fetchFuncConfig): Promise<void> {
  try {
    const { result } = await rpc<types.TGettotalbalance>(
      'z_gettotalbalance',
      [],
      props.rpcConfig,
    )
    insertTotalbalance(props.pastelDB, result)
  } catch (error) {
    throw new Error(`pastelDBThread fetchTotalbalance error: ${error.message}`)
  }
}

export async function fetchListaddresses(
  props: fetchFuncConfig,
): Promise<void> {
  try {
    const { result } = await rpc<types.Tlistaddresses>(
      'z_listaddresses',
      [],
      props.rpcConfig,
    )
    const addresslist = result
    for (let i = 0; i < addresslist.length; i++) {
      insertListaddresses(props.pastelDB, addresslist[i])
    }
  } catch (error) {
    throw new Error(`pastelDBThread fetchTotalbalance error: ${error.message}`)
  }
}

export async function fetchPastelPrices(props: fetchFuncConfig): Promise<void> {
  try {
    const resp = await coinGeckoClient.simple.price({
      ids: ['pastel'],
      vs_currencies: ['usd'],
    })

    if (!resp.data?.['pastel']?.['usd']) {
      throw new Error('pastelPrice fetchPastelPrice error: invalid response')
    }

    insertPastelPrice(props.pastelDB, resp.data?.['pastel']?.['usd'])
  } catch (err) {
    // TODO log errors to a central logger so we can address them later.
    console.warn(err.message)
  }
}

export async function fetchBlockChainInfo(
  props: fetchFuncConfig,
): Promise<void> {
  try {
    const { result } = await rpc<types.TGetBlockChainInfo>(
      'getblockchaininfo',
      [],
      props.rpcConfig,
    )
    insertBlockChainInfo(props.pastelDB, result)
  } catch (error) {
    throw new Error(`pastelDBThread fetchBlockChainInfo error: ${error}`)
  }
}

export async function PastelDBThread(rpcConfig: TRPCConfig): Promise<void> {
  PastelDB.setValid(false)
  const pastelDB = await PastelDB.getDatabaseInstance()
  if (pastelDB && rpcConfig && rpcConfig.username !== '') {
    // fetch whole data from RPC and save to pastel DB.
    const pastelConfig: fetchFuncConfig = {
      pastelDB,
      rpcConfig,
    }
    await Promise.all([
      fetchStatisticInfo(pastelConfig),
      fetchNettotals(pastelConfig),
      fetchMempoolInfo(pastelConfig),
      fetchRawMempoolInfo(pastelConfig),
      fetchMiningInfo(pastelConfig),
      fetchBlock(pastelConfig),
      fetchTxoutsetInfo(pastelConfig),
      fetchBlocksubsidy(pastelConfig),
      fetchWalletInfo(pastelConfig),
      fetchTotalbalance(pastelConfig),
      fetchPastelPrices(pastelConfig),
      fetchBlockChainInfo(pastelConfig),
    ])
    await exportSqliteDB(pastelDB)
    PastelDB.setValid(true)
  }
  return
}
