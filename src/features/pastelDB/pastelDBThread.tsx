import { TransactionRPC, rpc } from '../../api/pastel-rpc'
import { Database } from 'sql.js'
import {
  TBlockChainInfoResponse,
  TBlockHashResponse,
  TBlockResponse,
  TBlockSubsidyResponse,
  TChainTipsResponse,
  TListAddressesResponse,
  TListSinceBlockResponse,
  TListUnspentResponse,
  TMempoolinfoResponse,
  TMiningInfoResponse,
  TNetTotalResponse,
  TNetworkHashPsResponse,
  TNetworkInfoResponse,
  TRawMempool,
  TRawMempoolResponse,
  TSinceBlockTransaction,
  TTotalBalanceResponse,
  TTransactionResponse,
  TWalletInfoResponse,
} from 'types/rpc'

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
import { getRpcConfig } from '../rpcConfig'
import { setPastelPrice } from '../pastelPrice/pastelPriceSlice'
import store from '../../redux/store'
import { queryClient } from '../../common/utils/queryClient'

type fetchFuncConfig = {
  pastelDB: Database
}

type TStatistic = {
  estimatedSolutions: number
  difficulty: number
}

export async function getStatisticInfo(): Promise<TStatistic> {
  try {
    const [networkhasps, difficulty] = await Promise.all([
      rpc<TNetworkHashPsResponse>('getnetworkhashps', []),
      rpc<types.TGetdifficulty>('getdifficulty', []),
    ])
    return {
      estimatedSolutions: networkhasps.result,
      difficulty: difficulty.result,
    }
  } catch ({ message }) {
    throw new Error(
      `pastelDBThread getnetworkhashps or getdifficulty error: ${message}`,
    )
  }
}

export async function fetchStatisticInfo(
  props: fetchFuncConfig,
): Promise<void> {
  try {
    const results = await getStatisticInfo()
    insertStatisticDataToDB(
      props.pastelDB,
      results.estimatedSolutions,
      results.difficulty,
    )
  } catch ({ message }) {
    throw new Error(`pastelDBThread fetchStatisticInfo error: ${message}`)
  }
}

export async function fetchNetworkInfo(props: fetchFuncConfig): Promise<void> {
  try {
    const { result } = await rpc<TNetworkInfoResponse>('getnetworkinfo', [])
    insertNetworkInfoToDB(props.pastelDB, result)
  } catch ({ message }) {
    throw new Error(`pastelDBThread fetchNetworkInfo error: ${message}`)
  }
}

export async function fetchNettotals(props: fetchFuncConfig): Promise<void> {
  try {
    const { result } = await rpc<TNetTotalResponse>('getnettotals', [])
    insertNetTotalsToDB(props.pastelDB, result)
  } catch ({ message }) {
    throw new Error(`pastelDBThread fetchNettotals error: ${message}`)
  }
}

export async function fetchMempoolInfo(props: fetchFuncConfig): Promise<void> {
  try {
    const { result } = await rpc<TMempoolinfoResponse>('getmempoolinfo', [])
    insertMempoolInfoToDB(props.pastelDB, result)
  } catch ({ message }) {
    throw new Error(`pastelDBThread fetchMempoolInfo error: ${message}`)
  }
}

export async function fetchRawMempoolInfo(
  props: fetchFuncConfig,
): Promise<void> {
  try {
    const { result } = await rpc<TRawMempoolResponse>('getrawmempool', [true])
    const keys = Object.keys(result)
    if (keys.length) {
      const transactionId = keys[0]
      const rawMempool = result[transactionId]
      const data: TRawMempool = {
        transactionid: transactionId,
        size: rawMempool.size,
        fee: rawMempool.fee,
        time: rawMempool.time,
        height: rawMempool.height,
        startingpriority: rawMempool.startingpriority,
        currentpriority: rawMempool.currentpriority,
        depends: rawMempool.depends,
      }
      insertRawMempoolinfoToDB(props.pastelDB, data)
    }
  } catch ({ message }) {
    throw new Error(`pastelDBThread fetchRawMempoolInfo error: ${message}`)
  }
}

export async function fetchMiningInfo(props: fetchFuncConfig): Promise<void> {
  try {
    const { result } = await rpc<TMiningInfoResponse>('getmininginfo', [])
    insertMiningInfoToDB(props.pastelDB, result)
  } catch ({ message }) {
    throw new Error(`pastelDBThread fetchMiningInfo error: ${message}`)
  }
}

export async function fetchBlock(props: fetchFuncConfig): Promise<void> {
  try {
    const hash = await rpc<TBlockHashResponse>('getbestblockhash', [])
    const blockInfo = await rpc<TBlockResponse>('getblock', [hash.result])
    insertBlockInfoToDB(props.pastelDB, blockInfo.result)
  } catch ({ message }) {
    throw new Error(`pastelDBThread fetchBlock error: ${message}`)
  }
}

export async function fetchRawtransaction(
  props: fetchFuncConfig,
): Promise<void> {
  try {
    const { result } = await rpc<TListSinceBlockResponse>('listsinceblock', [])
    const listSinceBlock = result
    for (let i = 0; i < listSinceBlock.transactions.length; i++) {
      const transaction: TSinceBlockTransaction = listSinceBlock.transactions[i]
      if (transaction.txid) {
        const transactionRPC = new TransactionRPC()
        const { result } = await transactionRPC.getRawTxn(transaction.txid)
        insertRawtransaction(props.pastelDB, result)
      }
    }
  } catch ({ message }) {
    throw new Error(`pastelDBThread fetchRawtransaction error: ${message}`)
  }
}

export async function fetchTransaction(props: fetchFuncConfig): Promise<void> {
  try {
    const { result } = await rpc<TListSinceBlockResponse>('listsinceblock', [])
    const listSinceBlock = result
    for (let i = 0; i < listSinceBlock.transactions.length; i++) {
      const transaction: TSinceBlockTransaction = listSinceBlock.transactions[i]

      const transactionRPC = new TransactionRPC()
      const { result } = await transactionRPC.getTxn(transaction.txid)
      insertTransaction(props.pastelDB, result)
    }
  } catch ({ message }) {
    throw new Error(`pastelDBThread fetchTransaction error: ${message}`)
  }
}

export async function fetchTxoutsetInfo(props: fetchFuncConfig): Promise<void> {
  try {
    const { result } = await rpc<types.TGettxoutsetinfo>('gettxoutsetinfo', [])
    insertTxoutsetinfo(props.pastelDB, result)
  } catch ({ message }) {
    throw new Error(`pastelDBThread fetchTxoutsetInfo error: ${message}`)
  }
}

export async function fetchChaintips(props: fetchFuncConfig): Promise<void> {
  try {
    const { result } = await rpc<TChainTipsResponse>('getchaintips', [])
    const chaintips = result
    for (let i = 0; i < chaintips.length; i++) {
      insertChaintips(props.pastelDB, chaintips[i])
    }
  } catch ({ message }) {
    throw new Error(`pastelDBThread fetchChaintips error: ${message}`)
  }
}

export async function fetchBlocksubsidy(props: fetchFuncConfig): Promise<void> {
  try {
    const { result } = await rpc<TBlockSubsidyResponse>('getblocksubsidy', [])
    insertBlocksubsidy(props.pastelDB, result)
  } catch ({ message }) {
    throw new Error(`pastelDBThread fetchBlocksubsidy error: ${message}`)
  }
}

export async function fetchWalletInfo(props: fetchFuncConfig): Promise<void> {
  try {
    const { result } = await rpc<TWalletInfoResponse>('getwalletinfo', [])
    insertWalletinfo(props.pastelDB, result)
  } catch ({ message }) {
    throw new Error(`pastelDBThread fetchWalletInfo error: ${message}`)
  }
}

export async function fetchListTransactions(
  props: fetchFuncConfig,
): Promise<void> {
  try {
    const { result } = await rpc<TTransactionResponse>('listtransactions', [])
    const transactions = result
    for (let i = 0; i < transactions.length; i++) {
      insertListTransactions(props.pastelDB, transactions[i])
    }
  } catch ({ message }) {
    throw new Error(`pastelDBThread fetchListTransactions error: ${message}`)
  }
}

export async function fetchListunspent(props: fetchFuncConfig): Promise<void> {
  try {
    const data = await rpc<TListUnspentResponse>('listunspent', [])
    const unspentlist = data.result
    for (let i = 0; i < 1; i++) {
      insertListunspent(props.pastelDB, unspentlist[i])
    }
    queryClient.setQueryData('listunspent', data)
  } catch ({ message }) {
    throw new Error(`pastelDBThread fetchListunspent error: ${message}`)
  }
}

export async function fetchTotalBalance(props: fetchFuncConfig): Promise<void> {
  try {
    const { result } = await rpc<TTotalBalanceResponse>('z_gettotalbalance', [])

    insertTotalbalance(props.pastelDB, result)

    queryClient.setQueryData('z_gettotalbalance', result)
  } catch ({ message }) {
    throw new Error(`pastelDBThread fetchTotalBalance error: ${message}`)
  }
}

export async function fetchListaddresses(
  props: fetchFuncConfig,
): Promise<void> {
  try {
    const { result } = await rpc<TListAddressesResponse>('z_listaddresses', [])
    const addresslist = result
    for (let i = 0; i < addresslist.length; i++) {
      insertListaddresses(props.pastelDB, addresslist[i])
    }
  } catch ({ message }) {
    throw new Error(`pastelDBThread fetchTotalBalance error: ${message}`)
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

    const price = resp.data?.['pastel']?.['usd']
    insertPastelPrice(props.pastelDB, price)

    if (price) {
      store.dispatch(setPastelPrice({ price, lastFetched: Date.now() }))
    }
  } catch ({ message }) {
    // TODO log errors to a central logger so we can address them later.
    throw new Error(`pastelDBThread fetchPastelPrice error: ${message}`)
  }
}

export async function fetchBlockChainInfo(
  props: fetchFuncConfig,
): Promise<void> {
  try {
    const { result } = await rpc<TBlockChainInfoResponse>(
      'getblockchaininfo',
      [],
    )
    insertBlockChainInfo(props.pastelDB, result)
  } catch ({ message }) {
    throw new Error(`pastelDBThread fetchBlockChainInfo error: ${message}`)
  }
}

export async function PastelDBThread(): Promise<void> {
  PastelDB.setValid(false)
  const pastelDB = await PastelDB.getDatabaseInstance()
  const rpcConfig = getRpcConfig()
  if (pastelDB && rpcConfig && rpcConfig.username !== '') {
    // fetch whole data from RPC and save to pastel DB.
    const pastelConfig: fetchFuncConfig = {
      pastelDB,
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
      fetchTotalBalance(pastelConfig),
      fetchPastelPrices(pastelConfig),
      fetchBlockChainInfo(pastelConfig),
    ])
    PastelDB.setValid(true)
  }
  return
}

export async function saveSqliteDB(): Promise<void> {
  const pastelDB = await PastelDB.getDatabaseInstance()
  await exportSqliteDB(pastelDB)
}
