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
} from '../constants'

describe('managePastelDatabase', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('the database and tables should be created correctly', async () => {
    const SQL = await initSqlJs()
    const db: Database = new SQL.Database()

    expect(db).not.toBeNull()

    db.exec(createStatisticinfo)
    db.exec(createNetworkinfo)
    db.exec(createNettotals)
    db.exec(createMempoolinfo)
    db.exec(createRawmempoolinfo)
    db.exec(createMininginfo)
    db.exec(createBlock)
    db.exec(createRawtransaction)
    db.exec(createTransaction)
    db.exec(createTxoutsetinfo)
    db.exec(createChaintips)
    db.exec(createBlocksubsidy)
    db.exec(createWalletinfo)
    db.exec(createListreceivedbyaddress)
    db.exec(createListtransactions)
    db.exec(createListunspent)
    db.exec(createTotalbalance)
    db.exec(createListaddresses)
  })

  test('the data should be added correctly to staticinfo table', async () => {
    const SQL = await initSqlJs()
    const db: Database = new SQL.Database()

    expect(db).not.toBeNull()
    db.exec(createStatisticinfo)

    const values = {
      $newId: 1,
      $hashrate: 1.0,
      $difficulty: 1.2345678,
      $createTimestamp: 0,
    }

    const result: QueryExecResult[] = db.exec(insertStatisticinfoQuery, values)
    expect(result).not.toBeNull()
  })

  test('the data should be added correctly to networkinfo table', async () => {
    const SQL = await initSqlJs()
    const db: Database = new SQL.Database()

    expect(db).not.toBeNull()
    db.exec(createNetworkinfo)

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

    const result: QueryExecResult[] = db.exec(insertNetworkinfoQuery, values)
    expect(result).not.toBeNull()
  })

  test('the data should be added correctly to nettotals table', async () => {
    const SQL = await initSqlJs()
    const db: Database = new SQL.Database()

    expect(db).not.toBeNull()
    db.exec(createNettotals)

    const values = {
      $newId: 1,
      $totalbytesrecv: 0,
      $totalbytessent: 0,
      $timemillis: 0,
      $createTimestamp: 0,
    }

    const result: QueryExecResult[] = db.exec(insertNettotalsQuery, values)
    expect(result).not.toBeNull()
  })

  test('the data should be added correctly to mempoolinfo table', async () => {
    const SQL = await initSqlJs()
    const db: Database = new SQL.Database()

    expect(db).not.toBeNull()
    db.exec(createMempoolinfo)

    const values = {
      $newId: 1,
      $size: 10,
      $bytes: 100,
      $usage: 10,
      $createTimestamp: 0,
    }

    const result: QueryExecResult[] = db.exec(insertMempoolinfoQuery, values)
    expect(result).not.toBeNull()
  })

  test('the data should be added correctly to rawmempoolinfo table', async () => {
    const SQL = await initSqlJs()
    const db: Database = new SQL.Database()

    expect(db).not.toBeNull()
    db.exec(createRawmempoolinfo)

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

    const result: QueryExecResult[] = db.exec(insertRawmempoolinfoQuery, values)
    expect(result).not.toBeNull()
  })

  test('the data should be added correctly to mininginfo table', async () => {
    const SQL = await initSqlJs()
    const db: Database = new SQL.Database()

    expect(db).not.toBeNull()
    db.exec(createMininginfo)

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
      $chain: 0,
      $createTimestamp: 0,
    }

    const result: QueryExecResult[] = db.exec(insertMininginfoQuery, values)
    expect(result).not.toBeNull()
  })

  test('the data should be added correctly to blockinfo table', async () => {
    const SQL = await initSqlJs()
    const db: Database = new SQL.Database()

    expect(db).not.toBeNull()
    db.exec(createBlock)

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

    const result: QueryExecResult[] = db.exec(insertBlockinfoQuery, values)
    expect(result).not.toBeNull()
  })

  test('the data should be added correctly to rawtransaction table', async () => {
    const SQL = await initSqlJs()
    const db: Database = new SQL.Database()

    expect(db).not.toBeNull()
    db.exec(createRawtransaction)

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

    const result: QueryExecResult[] = db.exec(insertRawtransactionQuery, values)
    expect(result).not.toBeNull()
  })

  test('the data should be added correctly to transaction table', async () => {
    const SQL = await initSqlJs()
    const db: Database = new SQL.Database()

    expect(db).not.toBeNull()
    db.exec(createTransaction)

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

    const result: QueryExecResult[] = db.exec(
      insertTransactionTableQuery,
      values,
    )
    expect(result).not.toBeNull()
  })

  test('the data should be added correctly to txoutsetinfo table', async () => {
    const SQL = await initSqlJs()
    const db: Database = new SQL.Database()

    expect(db).not.toBeNull()
    db.exec(createTxoutsetinfo)

    const values = {
      $newId: 1,
      $height: 1,
      $bestblock: '',
      $transactions: 0,
      $txouts: 0,
      $bytes_serialized: 0,
      $hash_serialized: 0,
      $total_amount: 10,
      $createTimestamp: 0,
    }

    const result: QueryExecResult[] = db.exec(insertTxoutsetinfoQuery, values)
    expect(result).not.toBeNull()
  })

  test('the data should be added correctly to chaintips table', async () => {
    const SQL = await initSqlJs()
    const db: Database = new SQL.Database()

    expect(db).not.toBeNull()
    db.exec(createChaintips)

    const values = {
      $newId: 1,
      $height: 1,
      $hash: '',
      $branchlen: 1,
      $status: '',
      $createTimestamp: 0,
    }

    const result: QueryExecResult[] = db.exec(insertChaintipsQuery, values)
    expect(result).not.toBeNull()
  })

  test('the data should be added correctly to blocksubsidy table', async () => {
    const SQL = await initSqlJs()
    const db: Database = new SQL.Database()

    expect(db).not.toBeNull()
    db.exec(createBlocksubsidy)

    const values = {
      $newId: 1,
      $miner: 0,
      $masternode: 0,
      $governance: 0,
      $createTimestamp: 0,
    }

    const result: QueryExecResult[] = db.exec(insertBlocksubsidyQuery, values)
    expect(result).not.toBeNull()
  })

  test('the data should be added correctly to walletinfo table', async () => {
    const SQL = await initSqlJs()
    const db: Database = new SQL.Database()

    expect(db).not.toBeNull()
    db.exec(createWalletinfo)

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
      $seedfp: 0,
      $createTimestamp: 0,
    }

    const result: QueryExecResult[] = db.exec(insertWalletinfoQuery, values)
    expect(result).not.toBeNull()
  })

  test('the data should be added correctly to listtransactions table', async () => {
    const SQL = await initSqlJs()
    const db: Database = new SQL.Database()

    expect(db).not.toBeNull()
    db.exec(createListtransactions)

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

    const result: QueryExecResult[] = db.exec(
      insertListtransactionsQuery,
      values,
    )
    expect(result).not.toBeNull()
  })

  test('the data should be added correctly to listunspent table', async () => {
    const SQL = await initSqlJs()
    const db: Database = new SQL.Database()

    expect(db).not.toBeNull()
    db.exec(createListunspent)

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

    const result: QueryExecResult[] = db.exec(insertListunspentQuery, values)
    expect(result).not.toBeNull()
  })

  test('the data should be added correctly to totalbalance table', async () => {
    const SQL = await initSqlJs()
    const db: Database = new SQL.Database()

    expect(db).not.toBeNull()
    db.exec(createTotalbalance)

    const values = {
      $newId: 1,
      $transparent: 'transparent',
      $private: 'private',
      $total: 'total',
      $createTimestamp: 0,
    }

    const result: QueryExecResult[] = db.exec(insertTotalbalanceQuery, values)
    expect(result).not.toBeNull()
  })

  test('the data should be added correctly to listaddresses table', async () => {
    const SQL = await initSqlJs()
    const db: Database = new SQL.Database()

    expect(db).not.toBeNull()
    db.exec(createListaddresses)

    const values = {
      $newId: 1,
      $address: 'address',
      $createTimestamp: 0,
    }

    const result: QueryExecResult[] = db.exec(insertListaddressesQuery, values)
    expect(result).not.toBeNull()
  })
})

export {}
