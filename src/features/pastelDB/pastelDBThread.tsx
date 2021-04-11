/* eslint-disable */
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
  getRawTransaction,
  getRpcData,
  getStatisticInfos,
  getTotalBalance,
  getWalletInfo,
  getWalletTransaction,
  listAddresses,
  listReceivedByAddress,
  listTransactions,
  listUnspent,
} from '../../api/pastel-rpc/network-stats'
import { RPCConfig } from '../../legacy/components/AppState'
import { pastelTableNames } from '../constants'
import { IPastelDBState, ListTransactions } from '../type'
import {
  getDatasFromDB,
  insertBlockInfoToDB,
  insertBlocksubsidy,
  insertChaintips,
  insertListaddresses,
  insertListreceivedbyaddress,
  insertListTransactions,
  insertListunspent,
  insertMempoolinfoToDB,
  insertMiningInfoToDB,
  insertNetTotalsToDB,
  insertNetworkInfotoDB,
  insertRawtransaction,
  insertStatisticDataToDB,
  insertTotalbalance,
  insertTransaction,
  insertTxoutsetinfo,
  insertWalletinfo,
} from './pastelDBLib'
import { pastelDBSelector } from './pastelDBSlice'

interface PastelDBThreadProps {
  rpcConfig: RPCConfig
}

interface fetchFuncConfig {
  pastelDBState: IPastelDBState
  rpcConfig: RPCConfig
}

const fetchStatisticinfo = async (props: fetchFuncConfig) => {
  const results = await getStatisticInfos(props.rpcConfig)
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
    const transaction: ListTransactions = listSinceBlock.transactions[i]
    const result = await getRawTransaction(transaction.txid, props.rpcConfig)
    insertRawtransaction(props.pastelDBState, result)
  }
}

const fetchTransaction = async (props: fetchFuncConfig) => {
  const listSinceBlock = await getListSinceBlock(props.rpcConfig)
  for (let i = 0; i < listSinceBlock.transactions.length; i++) {
    const transaction: ListTransactions = listSinceBlock.transactions[i]
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

const fetchListreceivedbyaddress = async (props: fetchFuncConfig) => {
  const addresslist = await listReceivedByAddress(props.rpcConfig)

  for (let i = 0; i < addresslist.length; i++) {
    insertListreceivedbyaddress(props.pastelDBState, addresslist[i])
  }
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
  getDatasFromDB(props.pastelDBState, pastelTableNames[16])
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
        Promise.all([
          fetchStatisticinfo(pastelConfig),
          fetchNetworkinfo(pastelConfig),
          fetchNettotals(pastelConfig),
          fetchMempoolinfo(pastelConfig),
          fetchMininginfo(pastelConfig),
          fetchBlock(pastelConfig),
          fetchRawtransaction(pastelConfig),
          fetchTransaction(pastelConfig),
          fetchTxoutsetinfo(pastelConfig),
          fetchChaintips(pastelConfig),
          fetchBlocksubsidy(pastelConfig),
          fetchWalletinfo(pastelConfig),
          fetchListreceivedbyaddress(pastelConfig),
          fetchListTransactions(pastelConfig),
          fetchListunspent(pastelConfig),
          fetchTotalbalance(pastelConfig),
          fetchListaddresses(pastelConfig),
        ])

        setTimeout(() => fetchStatisticDataFromRPC(), 300000)
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
