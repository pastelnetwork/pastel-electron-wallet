import { Database } from 'sql.js'

import { rpc, TRPCConfig } from '../../api/pastel-rpc/rpc'
import PastelDB from '../../features/pastelDB/database'
import {
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
  hashrate: number
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
      hashrate: networkhasps.result,
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
      results.hashrate,
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
    const height = 1000
    const hash = await rpc<types.TGetblockhash>(
      'getblockhash',
      [height],
      props.rpcConfig,
    )
    const blockInfo = await rpc<types.TGetblock>(
      'getblock',
      [hash.result],
      props.rpcConfig,
    )
    insertBlockInfoToDB(props.pastelDB, blockInfo.result)
  } catch (error) {
    throw new Error(`pastelDBThread fetchBlock error: ${error.message}`)
  }
}

export async function fetchRawtransaction(
  props: fetchFuncConfig,
): Promise<void> {
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
      const { result } = await rpc<types.TGetrawtransaction>(
        'getrawtransaction',
        [transaction.txid, 1],
        props.rpcConfig,
      )
      insertRawtransaction(props.pastelDB, result)
    }
  } catch (error) {
    throw new Error(`pastelDBThread fetchBlock error: ${error.message}`)
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

export async function PastelDBThread(rpcConfig: TRPCConfig): Promise<void> {
  const pastelDB = await PastelDB.getDatabaseInstance()
  if (pastelDB && rpcConfig && rpcConfig.username !== '') {
    // fetch whole data from RPC and save to pastel DB.
    const pastelConfig: fetchFuncConfig = {
      pastelDB,
      rpcConfig,
    }
    await Promise.all([
      fetchStatisticInfo(pastelConfig),
      fetchNetworkInfo(pastelConfig),
      fetchNettotals(pastelConfig),
      fetchMempoolInfo(pastelConfig),
      fetchRawMempoolInfo(pastelConfig),
      fetchMiningInfo(pastelConfig),
      fetchBlock(pastelConfig),
      fetchRawtransaction(pastelConfig),
      fetchTransaction(pastelConfig),
      fetchTxoutsetInfo(pastelConfig),
      fetchChaintips(pastelConfig),
      fetchBlocksubsidy(pastelConfig),
      fetchWalletInfo(pastelConfig),
      fetchListTransactions(pastelConfig),
      fetchListunspent(pastelConfig),
      fetchTotalbalance(pastelConfig),
      fetchListaddresses(pastelConfig),
    ])
  }
  return
}
