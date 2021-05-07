import initSqlJs, { Database, QueryExecResult } from 'sql.js'

import {
  createBlock,
  createBlocksubsidy,
  createChaintips,
  createListaddresses,
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
  createTxoutsetinfo,
  createWalletinfo,
  selectAllQuery,
} from '../constants'
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
  insertTxoutsetinfo,
  insertWalletinfo,
} from '../pastelDBLib'

type Databaseinstance = {
  db: Database
}

describe('PastelDBThread', () => {
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
    pastelDB.db.exec(createTxoutsetinfo)
    pastelDB.db.exec(createChaintips)
    pastelDB.db.exec(createBlocksubsidy)
    pastelDB.db.exec(createWalletinfo)
    pastelDB.db.exec(createListtransactions)
    pastelDB.db.exec(createListunspent)
    pastelDB.db.exec(createTotalbalance)
    pastelDB.db.exec(createListaddresses)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  const getStatisticInfo = jest.fn(() => {
    return {
      difficult: 1.0,
      hashrate: 1.2345,
    }
  })

  const getNetworkInfo = jest.fn(() => {
    return {
      version: 1.0,
      subversion: '1.0',
      protocolversion: 1,
      localservices: '',
      timeoffset: 0,
      connections: 0,
      networks: [
        {
          name: '',
          limited: true,
          reachable: true,
          proxy: '',
        },
      ],
      relayfee: 0,
      localaddresses: [
        {
          address: '',
          port: 0,
          score: 0,
        },
      ],
      warnings: 'warnings',
      create_timestamp: '',
    }
  })

  const getNetTotals = jest.fn(() => {
    return {
      totalbytesrecv: 0,
      totalbytessent: 0,
      timemillis: 0,
    }
  })

  const getMempoolInfo = jest.fn(() => {
    return {
      size: 0,
      bytes: 100,
      usage: 10,
    }
  })

  const getRawMempool = jest.fn(() => {
    return {
      transactionid: 'transactionid-12345678',
      size: 0,
      fee: 0,
      time: 0,
      height: 0,
      startingpriority: 0,
      currentpriority: 0,
      depends: [
        {
          0: {
            transactionid: 'id',
            size: 0,
            fee: 0,
            time: 0,
            height: 0,
            startingpriority: 0,
            currentpriority: 0,
            depends: [],
          },
        },
      ],
    }
  })

  const getMiningInfo = jest.fn(() => {
    return {
      newId: 1,
      blocks: 0,
      currentblocksize: 0,
      currentblocktx: 0,
      difficulty: 0,
      errors: '',
      genproclimit: 0,
      localsolps: 0,
      networksolps: 0,
      networkhashps: 0,
      pooledtx: 0,
      testnet: 0,
      chain: 'mininginfo-chain',
      generate: true,
    }
  })

  const getBlockByHash = jest.fn(() => {
    return {
      hash: 'hash-12345678',
      confirmations: 0,
      size: 0,
      height: 0,
      version: 0,
      merkleroot: '',
      finalsaplingroot: '',
      tx: '',
      time: 0,
      nonce: '',
      solution: '',
      bits: '',
      difficulty: 0,
      chainwork: '',
      anchor: '',
      valuePools: '',
      previousblockhash: '',
      nextblockhash: '',
    }
  })

  const getRawTransaction = jest.fn(() => {
    return {
      hex: 'raw-transaction-hex-12345678',
      txid: '',
      overwintered: true,
      version: 1.0,
      versiongroupid: '',
      locktime: 0,
      expiryheight: 0,
      vin: [
        {
          txid: '',
          vout: 0,
          scriptSig: {
            asm: '',
            hex: '',
          },
          sequence: 0,
        },
      ],
      vout: [
        {
          value: 0,
          n: 0,
          scriptPubkey: {
            asm: '',
            hex: '',
            regSigs: 0,
            type: '',
            addresses: [''],
          },
        },
      ],
      vjoinsplit: [
        {
          vpub_old: 0,
          vpub_new: 0,
          anchor: '',
          nullifiers: [''],
          commitments: [''],
          onetimePubKey: '',
          randomSeed: '',
          macs: [''],
          proof: '',
          ciphertexts: [''],
        },
      ],
      blockhash: '',
      confirmations: 0,
      time: 0,
      blocktime: 0,
    }
  })

  const getRpcData = jest.fn(() => {
    return {
      height: 0,
      bestblock: 'best-block-123456',
      transactions: 0,
      txouts: 0,
      bytes_serialized: 0,
      hash_serialized: '',
      total_amount: 0,
    }
  })

  const getChaintips = jest.fn(() => {
    return {
      height: 0,
      hash: 'chain-tips-hash-1234578',
      branchlen: 0,
      status: '',
    }
  })

  const getBlockSubSidy = jest.fn(() => {
    return {
      miner: 456789,
      masternode: 0,
      governance: 0,
    }
  })

  const getWalletInfo = jest.fn(() => {
    return {
      walletversion: 456789,
      balance: 0,
      unconfirmed_balance: 0,
      immature_balance: 0,
      txcount: 0,
      keypoololdest: 0,
      keypoolsize: 0,
      paytxfee: 0,
      seedfp: '',
    }
  })

  const listTransactions = jest.fn(() => {
    return {
      account: 'account-1',
      address: '',
      category: '',
      amount: 0,
      vout: 0,
      confirmations: 0,
      blockhash: 0,
      blockindex: 0,
      blocktime: 0,
      expiryheight: 0,
      txid: '',
      walletconflicts: [''],
      time: 0,
      timereceived: 0,
      vjoinsplit: [
        {
          vpub_old: 0,
          vpub_new: 0,
          anchor: '',
          nullifiers: [''],
          commitments: [''],
          onetimePubKey: '',
          randomSeed: '',
          macs: [''],
          proof: '',
          ciphertexts: [''],
        },
      ],
      size: 0,
      lastblock: '',
    }
  })

  const listUnspent = jest.fn(() => {
    return {
      txid: 'unspent-txid-123456789',
      vout: 0,
      generated: true,
      address: '',
      account: '',
      scriptPubKey: '',
      amount: 0,
      confirmations: 0,
      spendable: 0,
    }
  })

  const getTotalBalance = jest.fn(() => {
    return {
      transparent: 'totalbalance-transparent',
      private: '',
      total: '',
    }
  })

  const listAddresses = jest.fn(() => {
    return 'address1'
  })

  test('statistic data should fetch and store correctly', async () => {
    const info = getStatisticInfo()
    insertStatisticDataToDB(pastelDB.db, info.hashrate, info.difficult)
    const result = getDatafromDB('statisticinfo')
    expect(result[0].values[0]).toContainEqual('1.2345')
  })

  test('network info data should fetch and store correctly', async () => {
    const info = getNetworkInfo()
    insertNetworkInfotoDB(pastelDB.db, info)
    const result = getDatafromDB('networkinfo')
    expect(result[0].values[0]).toContainEqual('warnings')
  })

  test('net total info data should fetch and store correctly', async () => {
    const info = getNetTotals()
    insertNetTotalsToDB(pastelDB.db, info)
    const result = getDatafromDB('nettotals')
    expect(result[0].values[0]).toContainEqual(1)
  })

  test('mempool info data should fetch and store correctly', async () => {
    const info = getMempoolInfo()
    insertMempoolinfoToDB(pastelDB.db, info)
    const result = getDatafromDB('mempoolinfo')
    expect(result[0].values[0]).toContainEqual(100)
  })

  test('rawmempool info data should fetch and store correctly', async () => {
    const info = getRawMempool()
    insertRawMempoolinfoToDB(pastelDB.db, info)
    const result = getDatafromDB('rawmempoolinfo')
    expect(result[0].values[0]).toContainEqual('transactionid-12345678')
  })

  test('minginfo data should fetch and store correctly', async () => {
    const info = getMiningInfo()
    insertMiningInfoToDB(pastelDB.db, info)
    const result = getDatafromDB('mininginfo')
    expect(result[0].values[0]).toContainEqual('mininginfo-chain')
  })

  test('blockbyhash data should fetch and store correctly', async () => {
    const info = getBlockByHash()
    insertBlockInfoToDB(pastelDB.db, info)
    const result = getDatafromDB('blockinfo')
    expect(result[0].values[0]).toContainEqual('hash-12345678')
  })

  test('rawtransaction data should fetch and store correctly', async () => {
    const info = getRawTransaction()
    insertRawtransaction(pastelDB.db, info)
    const result = getDatafromDB('rawtransaction')
    expect(result[0].values[0]).toContainEqual('raw-transaction-hex-12345678')
  })

  test('txoutset data should fetch and store correctly', async () => {
    const info = getRpcData()
    insertTxoutsetinfo(pastelDB.db, info)
    const result = getDatafromDB('txoutsetinfo')
    expect(result[0].values[0]).toContainEqual('best-block-123456')
  })

  test('txoutset data should fetch and store correctly', async () => {
    const info = getChaintips()
    insertChaintips(pastelDB.db, info)
    const result = getDatafromDB('chaintips')
    expect(result[0].values[0]).toContainEqual('chain-tips-hash-1234578')
  })

  test('txoutset data should fetch and store correctly', async () => {
    const info = getBlockSubSidy()
    insertBlocksubsidy(pastelDB.db, info)
    const result = getDatafromDB('blocksubsidy')
    expect(result[0].values[0]).toContainEqual(456789)
  })

  test('wallet data should fetch and store correctly', async () => {
    const info = getWalletInfo()
    insertWalletinfo(pastelDB.db, info)
    const result = getDatafromDB('walletinfo')
    expect(result[0].values[0]).toContainEqual(456789)
  })

  test('transaction list should fetch and store correctly', async () => {
    const info = listTransactions()
    insertListTransactions(pastelDB.db, info)
    const result = getDatafromDB('listtransactions')
    expect(result[0].values[0]).toContainEqual('account-1')
  })

  test('unspent list should fetch and store correctly', async () => {
    const info = listUnspent()
    insertListunspent(pastelDB.db, info)
    const result = getDatafromDB('listunspent')
    expect(result[0].values[0]).toContainEqual('unspent-txid-123456789')
  })

  test('total balance data should fetch and store correctly', async () => {
    const info = getTotalBalance()
    insertTotalbalance(pastelDB.db, info)
    const result = getDatafromDB('totalbalance')
    expect(result[0].values[0]).toContainEqual('totalbalance-transparent')
  })

  test('address infos should fetch and store correctly', async () => {
    const info = listAddresses()
    insertListaddresses(pastelDB.db, info)
    const result = getDatafromDB('listaddresses')
    expect(result[0].values[0]).toContainEqual('address1')
  })
})
