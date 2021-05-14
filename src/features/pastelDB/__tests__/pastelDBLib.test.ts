import initSqlJs, { Database, QueryExecResult } from 'sql.js'

import {
  createBlock,
  createBlocksubsidy,
  createChaintips,
  createListaddresses,
  createListreceivedbyaddress,
  createListtransactions,
  createListunspent,
  createMempoolinfo,
  createMininginfo,
  createNettotals,
  createNetworkinfo,
  createRawmempoolinfo,
  createRawtransaction,
  createStatisticinfo,
  createTotalbalance,
  createTransaction,
  createTxoutsetinfo,
  createWalletinfo,
  insertBlockinfoQuery,
  insertBlocksubsidyQuery,
  insertChaintipsQuery,
  insertListaddressesQuery,
  insertListtransactionsQuery,
  insertListunspentQuery,
  insertMempoolinfoQuery,
  insertMininginfoQuery,
  insertNettotalsQuery,
  insertNetworkinfoQuery,
  insertRawmempoolinfoQuery,
  insertRawtransactionQuery,
  insertStatisticinfoQuery,
  insertTotalbalanceQuery,
  insertTransactionTableQuery,
  insertTxoutsetinfoQuery,
  insertWalletinfoQuery,
  selectAllQuery,
} from '../constants'

type Databaseinstance = {
  db: Database
}

describe('managePastelDatabase', () => {
  const loadDatabase = jest.fn(async () => {
    const SQL = await initSqlJs()
    const db: Database = new SQL.Database()
    return db
  })

  const getDatafromDB = jest.fn((tableName): QueryExecResult[] => {
    return pastelDB.db.exec(selectAllQuery + tableName)
  })

  const pastelDB: Databaseinstance = {
    db: {} as Database,
  }

  beforeAll(async () => {
    pastelDB.db = await loadDatabase()
    pastelDB.db.exec(createStatisticinfo)
    pastelDB.db.exec(createNetworkinfo)
    pastelDB.db.exec(createNettotals)
    pastelDB.db.exec(createMempoolinfo)
    pastelDB.db.exec(createRawmempoolinfo)
    pastelDB.db.exec(createMininginfo)
    pastelDB.db.exec(createBlock)
    pastelDB.db.exec(createRawtransaction)
    pastelDB.db.exec(createTransaction)
    pastelDB.db.exec(createTxoutsetinfo)
    pastelDB.db.exec(createChaintips)
    pastelDB.db.exec(createBlocksubsidy)
    pastelDB.db.exec(createWalletinfo)
    pastelDB.db.exec(createListreceivedbyaddress)
    pastelDB.db.exec(createListtransactions)
    pastelDB.db.exec(createListunspent)
    pastelDB.db.exec(createTotalbalance)
    pastelDB.db.exec(createListaddresses)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('the data should be added correctly to staticinfo table', async () => {
    const values = {
      $newId: 1,
      $hashrate: 1.0,
      $difficulty: 1.2345678,
      $createTimestamp: 0,
    }

    pastelDB.db.exec(insertStatisticinfoQuery, values)
    const result: QueryExecResult[] = getDatafromDB('statisticinfo')
    expect(result).toStrictEqual([
      {
        columns: [
          'id',
          'hashrate',
          'miner_distribution',
          'difficulty',
          'create_timestamp',
        ],
        values: [[1, '1', '', '1.2345678', 0]],
      },
    ])
  })

  test('the data should be added correctly to networkinfo table', async () => {
    const values = {
      $newId: 1,
      $version: 1.0,
      $subversion: 1,
      $protocolversion: 1,
      $localservices: '',
      $timeoffset: 0,
      $connections: 0,
      $networks: 'networks',
      $relayfee: 0,
      $localaddresses: 'localaddresses',
      $warnings: 'warnings',
      $createTimestamp: 0,
    }

    pastelDB.db.exec(insertNetworkinfoQuery, values)
    const result: QueryExecResult[] = getDatafromDB('networkinfo')
    expect(result[0].values).toStrictEqual([
      [1, 1, '1', 1, '', 0, 0, 'networks', 0, 'localaddresses', 'warnings', 0],
    ])
  })

  test('the data should be added correctly to nettotals table', async () => {
    const values = {
      $newId: 1,
      $totalbytesrecv: 0,
      $totalbytessent: 0,
      $timemillis: 0,
      $createTimestamp: 0,
    }

    pastelDB.db.exec(insertNettotalsQuery, values)
    const result: QueryExecResult[] = getDatafromDB('nettotals')
    expect(result[0].values).toStrictEqual([[1, 0, 0, 0, 0]])
  })

  test('the data should be added correctly to mempoolinfo table', async () => {
    const values = {
      $newId: 1,
      $size: 10,
      $bytes: 100,
      $usage: 10,
      $createTimestamp: 0,
    }

    pastelDB.db.exec(insertMempoolinfoQuery, values)
    const result: QueryExecResult[] = getDatafromDB('mempoolinfo')
    expect(result[0].values).toStrictEqual([[1, 10, 100, 10, 0]])
  })

  test('the data should be added correctly to rawmempoolinfo table', async () => {
    const values = {
      $newId: 1,
      $transactionid: 'transactionid',
      $size: 1,
      $fee: 1,
      $time: 0,
      $height: 1000,
      $startingpriority: 1,
      $currentpriority: 1,
      $depends: '',
      $createTimestamp: 0,
    }

    pastelDB.db.exec(insertRawmempoolinfoQuery, values)
    const result: QueryExecResult[] = getDatafromDB('rawmempoolinfo')
    expect(result[0].values).toStrictEqual([
      [1, 'transactionid', 1, 1, 0, 1000, 1, 1, '', 0],
    ])
  })

  test('the data should be added correctly to mininginfo table', async () => {
    const values = {
      $newId: 1,
      $blocks: 10,
      $currentblocksize: 10,
      $currentblocktx: 1,
      $difficulty: 1,
      $errors: '',
      $genproclimit: 1,
      $localsolps: 0,
      $networksolps: 0,
      $networkhashps: 0,
      $pooledtx: 0,
      $testnet: 0,
      $chain: '',
      $createTimestamp: 0,
    }

    pastelDB.db.exec(insertMininginfoQuery, values)
    const result: QueryExecResult[] = getDatafromDB('mininginfo')
    expect(result[0].values).toStrictEqual([
      [1, 10, 10, 1, 1, '', 1, 0, 0, 0, 0, 0, '', 0],
    ])
  })

  test('the data should be added correctly to blockinfo table', async () => {
    const values = {
      $newId: 1,
      $hash: '',
      $confirmations: '',
      $size: 1,
      $height: 1,
      $version: 1,
      $merkleroot: '',
      $finalsaplingroot: '',
      $tx: 'tx',
      $time: 0,
      $nonce: '',
      $solution: '',
      $bits: 0,
      $difficulty: 0,
      $chainwork: '',
      $anchor: '',
      $valuePools: '',
      $previousblockhash: '',
      $nextblockhash: '',
      $createTimestamp: 0,
    }

    pastelDB.db.exec(insertBlockinfoQuery, values)
    const result: QueryExecResult[] = getDatafromDB('blockinfo')
    expect(result[0].values).toStrictEqual([
      [
        1,
        '',
        '',
        1,
        1,
        1,
        '',
        '',
        'tx',
        0,
        '',
        '',
        '0',
        0,
        '',
        '',
        '',
        '',
        '',
        0,
      ],
    ])
  })

  test('the data should be added correctly to rawtransaction table', async () => {
    const values = {
      $newId: 1,
      $bindingSig: '',
      $blockhash: '',
      $blocktime: 0,
      $confirmations: '',
      $expiryheight: 0,
      $hex: 0,
      $locktime: 0,
      $overwintered: '',
      $time: 0,
      $txid: 'txid',
      $vShieldedOutput: '',
      $vShieldedSpend: '',
      $valueBalance: 0,
      $version: 0,
      $versiongroupid: 0,
      $vjoinsplit: '',
      $createTimestamp: 0,
    }

    pastelDB.db.exec(insertRawtransactionQuery, values)
    const result: QueryExecResult[] = getDatafromDB('blockinfo')
    expect(result[0].values).toStrictEqual([
      [
        1,
        '',
        '',
        1,
        1,
        1,
        '',
        '',
        'tx',
        0,
        '',
        '',
        '0',
        0,
        '',
        '',
        '',
        '',
        '',
        0,
      ],
    ])
  })

  test('the data should be added correctly to transaction table', async () => {
    const values = {
      $newId: 1,
      $amount: 1,
      $blockhash: '',
      $blockindex: 1,
      $blocktime: 0,
      $confirmations: '',
      $details: '',
      $expiryheight: 1,
      $hex: 1,
      $time: 0,
      $timereceived: 0,
      $txid: 'txid',
      $vjoinsplit: '',
      $walletconflicts: '',
      $createTimestamp: 0,
    }

    pastelDB.db.exec(insertTransactionTableQuery, values)
    const result: QueryExecResult[] = getDatafromDB('transaction_tbl')
    expect(result[0].values).toStrictEqual([
      [1, 1, '', 1, 0, '', '', 1, '1', 0, 0, 'txid', '', '', 0],
    ])
  })

  test('the data should be added correctly to txoutsetinfo table', async () => {
    const values = {
      $newId: 1,
      $height: 1,
      $bestblock: '',
      $transactions: 0,
      $txouts: 0,
      $bytes_serialized: 0,
      $hash_serialized: '',
      $total_amount: 10,
      $createTimestamp: 0,
    }

    pastelDB.db.exec(insertTxoutsetinfoQuery, values)
    const result: QueryExecResult[] = getDatafromDB('txoutsetinfo')
    expect(result[0].values).toStrictEqual([[1, 1, '', 0, 0, 0, '', 10, 0]])
  })

  test('the data should be added correctly to chaintips table', async () => {
    const values = {
      $newId: 1,
      $height: 1,
      $hash: '',
      $branchlen: 1,
      $status: '',
      $createTimestamp: 0,
    }

    pastelDB.db.exec(insertChaintipsQuery, values)
    const result: QueryExecResult[] = getDatafromDB('chaintips')
    expect(result[0].values).toStrictEqual([[1, 1, '', 1, '', 0]])
  })

  test('the data should be added correctly to blocksubsidy table', async () => {
    const values = {
      $newId: 1,
      $miner: 0,
      $masternode: 0,
      $governance: 0,
      $createTimestamp: 0,
    }

    pastelDB.db.exec(insertBlocksubsidyQuery, values)
    const result: QueryExecResult[] = getDatafromDB('blocksubsidy')
    expect(result[0].values).toStrictEqual([[1, 0, 0, 0, 0]])
  })

  test('the data should be added correctly to walletinfo table', async () => {
    const values = {
      $newId: 1,
      $walletversion: 1,
      $balance: 0,
      $unconfirmed_balance: 0,
      $immature_balance: 0,
      $txcount: 0,
      $keypoololdest: 0,
      $keypoolsize: 0,
      $paytxfee: 0,
      $seedfp: '',
      $createTimestamp: 0,
    }

    pastelDB.db.exec(insertWalletinfoQuery, values)
    const result: QueryExecResult[] = getDatafromDB('walletinfo')
    expect(result[0].values).toStrictEqual([[1, 1, 0, 0, 0, 0, 0, 0, 0, '', 0]])
  })

  test('the data should be added correctly to listtransactions table', async () => {
    const values = {
      $newId: 1,
      $account: '',
      $address: '',
      $category: '',
      $amount: 0,
      $vout: '',
      $confirmations: '',
      $blockhash: '',
      $blockindex: 0,
      $blocktime: 0,
      $expiryheight: 0,
      $txid: '',
      $walletconflicts: '',
      $time: 0,
      $timereceived: '',
      $vjoinsplit: '',
      $size: 0,
      $createTimestamp: 0,
    }

    pastelDB.db.exec(insertListtransactionsQuery, values)
    const result: QueryExecResult[] = getDatafromDB('listtransactions')
    expect(result[0].values).toStrictEqual([
      [1, '', '', '', 0, '', '', '', 0, 0, 0, '', '', 0, '', '', 0, 0],
    ])
  })

  test('the data should be added correctly to listunspent table', async () => {
    const values = {
      $newId: 1,
      $txid: 'txid',
      $vout: 'vout',
      $generated: '',
      $address: 'address',
      $account: 'account',
      $scriptPubKey: 'scriptPubKey',
      $amount: 0,
      $confirmations: 0,
      $spendable: 0,
      $createTimestamp: 0,
    }

    pastelDB.db.exec(insertListunspentQuery, values)
    const result: QueryExecResult[] = getDatafromDB('listunspent')
    expect(result[0].values).toStrictEqual([
      [1, 'txid', 'vout', '', 'address', 'account', 'scriptPubKey', 0, 0, 0, 0],
    ])
  })

  test('the data should be added correctly to totalbalance table', async () => {
    const values = {
      $newId: 1,
      $transparent: 'transparent',
      $private: 'private',
      $total: 'total',
      $createTimestamp: 0,
    }

    pastelDB.db.exec(insertTotalbalanceQuery, values)
    const result: QueryExecResult[] = getDatafromDB('totalbalance')
    expect(result[0].values).toStrictEqual([
      [1, 'transparent', 'private', 'total', 0],
    ])
  })

  test('the data should be added correctly to listaddresses table', async () => {
    const values = {
      $newId: 1,
      $address: 'address',
      $createTimestamp: 0,
    }

    pastelDB.db.exec(insertListaddressesQuery, values)
    const result: QueryExecResult[] = getDatafromDB('listaddresses')
    expect(result[0].values).toStrictEqual([[1, 'address', 0]])
  })
})

export {}
