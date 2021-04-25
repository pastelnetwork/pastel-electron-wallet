import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

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
import { pastelDBSelector, TPastelDBState } from './pastelDBSlice'

interface PastelDBThreadProps {
  rpcConfig: RPCConfig
}

interface fetchFuncConfig {
  pastelDBState: TPastelDBState
  rpcConfig: RPCConfig
}

const fetchStatisticinfo = async (props: fetchFuncConfig) => {
  const results = await getStatisticInfo(props.rpcConfig)
  insertStatisticDataToDB(
    props.pastelDBState,
    results.hashrate,
    results.difficulty,
  )
}

const fetchNetworkinfo = async (props: fetchFuncConfig) => {
  const result = await getNetworkInfo(props.rpcConfig)
  insertNetworkInfotoDB(props.pastelDBState, result)
}

const fetchNettotals = async (props: fetchFuncConfig) => {
  const result = await getNetTotals(props.rpcConfig)
  insertNetTotalsToDB(props.pastelDBState, result)
}

const fetchMempoolinfo = async (props: fetchFuncConfig) => {
  const result = await getMempoolInfo(props.rpcConfig)
  insertMempoolinfoToDB(props.pastelDBState, result)
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

    insertRawMempoolinfoToDB(props.pastelDBState, data)
  }
}

const fetchMininginfo = async (props: fetchFuncConfig) => {
  const result = await getMiningInfo(props.rpcConfig)
  insertMiningInfoToDB(props.pastelDBState, result)
}

const fetchBlock = async (props: fetchFuncConfig) => {
  const result = await getBlockByHash(props.rpcConfig)
  insertBlockInfoToDB(props.pastelDBState, result)
}

const fetchRawtransaction = async (props: fetchFuncConfig) => {
  const listSinceBlock = await getListSinceBlock(props.rpcConfig)
  for (let i = 0; i < listSinceBlock.transactions.length; i++) {
    const transaction: TSinceblockTransaction = listSinceBlock.transactions[i]
    const result = await getRawTransaction(transaction.txid, props.rpcConfig)
    insertRawtransaction(props.pastelDBState, result)
  }
}

const fetchTransaction = async (props: fetchFuncConfig) => {
  const listSinceBlock = await getListSinceBlock(props.rpcConfig)
  for (let i = 0; i < listSinceBlock.transactions.length; i++) {
    const transaction: TSinceblockTransaction = listSinceBlock.transactions[i]
    const result = await getWalletTransaction(transaction.txid, props.rpcConfig)
    insertTransaction(props.pastelDBState, result)
  }
}

const fetchTxoutsetinfo = async (props: fetchFuncConfig) => {
  const result = await getRpcData(props.rpcConfig)
  insertTxoutsetinfo(props.pastelDBState, result)
}

const fetchChaintips = async (props: fetchFuncConfig) => {
  const chaintips = await getChaintips(props.rpcConfig)
  for (let i = 0; i < chaintips.length; i++) {
    insertChaintips(props.pastelDBState, chaintips[i])
  }
}

const fetchBlocksubsidy = async (props: fetchFuncConfig) => {
  const result = await getBlockSubSidy(props.rpcConfig)
  insertBlocksubsidy(props.pastelDBState, result)
}

const fetchWalletinfo = async (props: fetchFuncConfig) => {
  const result = await getWalletInfo(props.rpcConfig)
  insertWalletinfo(props.pastelDBState, result)
}

const fetchListTransactions = async (props: fetchFuncConfig) => {
  const transactions = await listTransactions(props.rpcConfig)
  for (let i = 0; i < transactions.length; i++) {
    insertListTransactions(props.pastelDBState, transactions[i])
  }
}

const fetchListunspent = async (props: fetchFuncConfig) => {
  const unspentlist = await listUnspent(props.rpcConfig)
  for (let i = 0; i < unspentlist.length; i++) {
    insertListunspent(props.pastelDBState, unspentlist[i])
  }
}

const fetchTotalbalance = async (props: fetchFuncConfig) => {
  const result = await getTotalBalance(props.rpcConfig)
  insertTotalbalance(props.pastelDBState, result)
}

const fetchListaddresses = async (props: fetchFuncConfig) => {
  const addresslist = await listAddresses(props.rpcConfig)
  for (let i = 0; i < addresslist.length; i++) {
    insertListaddresses(props.pastelDBState, addresslist[i])
  }
}

export const PastelDBThread = (
  props: PastelDBThreadProps,
): React.ReactElement => {
  const { rpcConfig } = props
  const [isStarted, setStarted] = useState(false)
  const pastelDBState = useSelector(pastelDBSelector)

  useEffect(() => {
    const fetchStatisticDataFromRPC = async () => {
      if (pastelDBState.isCreated && rpcConfig) {
        // fetch whole data from RPC and save to pastel DB.
        const pastelConfig: fetchFuncConfig = {
          pastelDBState,
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
