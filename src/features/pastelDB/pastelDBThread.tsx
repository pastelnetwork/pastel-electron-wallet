import { remote } from 'electron'
import React, { useEffect, useState } from 'react'
import { Database } from 'sql.js'

import {
  getBlockByHash,
  getBlockSubSidy,
  getChaintips,
  getListSinceBlock,
  getMempoolInfo,
  getMiningInfo,
  getNetTotals,
  getNetworkInfo,
  getRawMempool,
  getRawTransaction,
  getRpcData,
  getStatisticInfo,
  getTotalBalance,
  getWalletInfo,
  getWalletTransaction,
  listAddresses,
  listTransactions,
  listUnspent,
} from '../../api/pastel-rpc/network-stats/network-stats'
import {
  TRawMempool,
  TSinceblockTransaction,
} from '../../api/pastel-rpc/network-stats/type'
import { RPCConfig } from '../../legacy/components/AppState'
import {
  insertBlockInfoToDB,
  insertBlocksubsidy,
  insertChaintips,
  insertListaddresses,
  insertListTransactions,
  insertListunspent,
  insertMempoolinfoToDB,
  insertMiningInfoToDB,
  insertNetTotalsToDB,
  insertNetworkInfotoDB,
  insertRawMempoolinfoToDB,
  insertRawtransaction,
  insertStatisticDataToDB,
  insertTotalbalance,
  insertTransaction,
  insertTxoutsetinfo,
  insertWalletinfo,
} from './pastelDBLib'

interface PastelDBThreadProps {
  rpcConfig: RPCConfig
}

interface fetchFuncConfig {
  pastelDB: Database
  rpcConfig: RPCConfig
}

const fetchStatisticinfo = async (props: fetchFuncConfig) => {
  const results = await getStatisticInfo(props.rpcConfig)
  insertStatisticDataToDB(props.pastelDB, results.hashrate, results.difficulty)
}

const fetchNetworkinfo = async (props: fetchFuncConfig) => {
  const result = await getNetworkInfo(props.rpcConfig)
  insertNetworkInfotoDB(props.pastelDB, result)
}

const fetchNettotals = async (props: fetchFuncConfig) => {
  const result = await getNetTotals(props.rpcConfig)
  insertNetTotalsToDB(props.pastelDB, result)
}

const fetchMempoolinfo = async (props: fetchFuncConfig) => {
  const result = await getMempoolInfo(props.rpcConfig)
  insertMempoolinfoToDB(props.pastelDB, result)
}

const fetchRawMempoolinfo = async (props: fetchFuncConfig) => {
  const result = await getRawMempool(props.rpcConfig)
  const keys = Object.keys(result)
  if (keys.length) {
    const transactionid = keys[0]
    const rawmempool = result[transactionid]
    const data: TRawMempool = {
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
}

const fetchMininginfo = async (props: fetchFuncConfig) => {
  const result = await getMiningInfo(props.rpcConfig)
  insertMiningInfoToDB(props.pastelDB, result)
}

const fetchBlock = async (props: fetchFuncConfig) => {
  const result = await getBlockByHash(props.rpcConfig)
  insertBlockInfoToDB(props.pastelDB, result)
}

const fetchRawtransaction = async (props: fetchFuncConfig) => {
  const listSinceBlock = await getListSinceBlock(props.rpcConfig)
  for (let i = 0; i < listSinceBlock.transactions.length; i++) {
    const transaction: TSinceblockTransaction = listSinceBlock.transactions[i]
    const result = await getRawTransaction(transaction.txid, props.rpcConfig)
    insertRawtransaction(props.pastelDB, result)
  }
}

const fetchTransaction = async (props: fetchFuncConfig) => {
  const listSinceBlock = await getListSinceBlock(props.rpcConfig)
  for (let i = 0; i < listSinceBlock.transactions.length; i++) {
    const transaction: TSinceblockTransaction = listSinceBlock.transactions[i]
    const result = await getWalletTransaction(transaction.txid, props.rpcConfig)
    insertTransaction(props.pastelDB, result)
  }
}

const fetchTxoutsetinfo = async (props: fetchFuncConfig) => {
  const result = await getRpcData(props.rpcConfig)
  insertTxoutsetinfo(props.pastelDB, result)
}

const fetchChaintips = async (props: fetchFuncConfig) => {
  const chaintips = await getChaintips(props.rpcConfig)
  for (let i = 0; i < chaintips.length; i++) {
    insertChaintips(props.pastelDB, chaintips[i])
  }
}

const fetchBlocksubsidy = async (props: fetchFuncConfig) => {
  const result = await getBlockSubSidy(props.rpcConfig)
  insertBlocksubsidy(props.pastelDB, result)
}

const fetchWalletinfo = async (props: fetchFuncConfig) => {
  const result = await getWalletInfo(props.rpcConfig)
  insertWalletinfo(props.pastelDB, result)
}

const fetchListTransactions = async (props: fetchFuncConfig) => {
  const transactions = await listTransactions(props.rpcConfig)
  for (let i = 0; i < transactions.length; i++) {
    insertListTransactions(props.pastelDB, transactions[i])
  }
}

const fetchListunspent = async (props: fetchFuncConfig) => {
  const unspentlist = await listUnspent(props.rpcConfig)
  for (let i = 0; i < unspentlist.length; i++) {
    insertListunspent(props.pastelDB, unspentlist[i])
  }
}

const fetchTotalbalance = async (props: fetchFuncConfig) => {
  const result = await getTotalBalance(props.rpcConfig)
  insertTotalbalance(props.pastelDB, result)
}

const fetchListaddresses = async (props: fetchFuncConfig) => {
  const addresslist = await listAddresses(props.rpcConfig)
  for (let i = 0; i < addresslist.length; i++) {
    insertListaddresses(props.pastelDB, addresslist[i])
  }
}

export const PastelDBThread = (
  props: PastelDBThreadProps,
): React.ReactElement => {
  const { rpcConfig } = props
  const [isStarted, setStarted] = useState(false)

  useEffect(() => {
    const pastelDB = remote.getGlobal('pastelDB')
    const fetchStatisticDataFromRPC = async () => {
      if (pastelDB && rpcConfig && rpcConfig.username !== '') {
        // fetch whole data from RPC and save to pastel DB.
        const pastelConfig: fetchFuncConfig = {
          pastelDB,
          rpcConfig,
        }
        setStarted(true)
        await Promise.all([
          fetchStatisticinfo(pastelConfig),
          fetchNetworkinfo(pastelConfig),
          fetchNettotals(pastelConfig),
          fetchMempoolinfo(pastelConfig),
          fetchRawMempoolinfo(pastelConfig),
          fetchMininginfo(pastelConfig),
          fetchBlock(pastelConfig),
          fetchRawtransaction(pastelConfig),
          fetchTransaction(pastelConfig),
          fetchTxoutsetinfo(pastelConfig),
          fetchChaintips(pastelConfig),
          fetchBlocksubsidy(pastelConfig),
          fetchWalletinfo(pastelConfig),
          fetchListTransactions(pastelConfig),
          fetchListunspent(pastelConfig),
          fetchTotalbalance(pastelConfig),
          fetchListaddresses(pastelConfig),
        ])

        setTimeout(() => fetchStatisticDataFromRPC(), 10000)
      } else {
        return
      }
    }

    if (!isStarted) {
      fetchStatisticDataFromRPC()
    }

    return () => {
      clearTimeout()
    }
  }, [rpcConfig])

  return <></>
}
