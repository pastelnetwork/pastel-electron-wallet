import initSqlJs, { Database } from 'sql.js'

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

describe('PastelDBThread', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const loadDatabase = jest.fn(async () => {
    const SQL = await initSqlJs()
    const db: Database = new SQL.Database()
    return db
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
      transactionid: 'id',
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
      chain: '',
      generate: true,
    }
  })

  const getBlockByHash = jest.fn(() => {
    return {
      hash: '',
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
      hex: '',
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
      bestblock: '',
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
      hash: '',
      branchlen: 0,
      status: '',
    }
  })

  const getBlockSubSidy = jest.fn(() => {
    return {
      miner: 0,
      masternode: 0,
      governance: 0,
    }
  })

  const getWalletInfo = jest.fn(() => {
    return {
      walletversion: 0,
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
      account: '',
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
      txid: '',
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
      transparent: '',
      private: '',
      total: '',
    }
  })

  const listAddresses = jest.fn(() => {
    return ''
  })

  test('statistic data should fetch and store correctly', async () => {
    const db = await loadDatabase()
    const info = getStatisticInfo()
    expect(db).not.toBeNull()

    db.exec(createStatisticinfo)
    const result = insertStatisticDataToDB(db, info.hashrate, info.difficult)
    expect(result).not.toBeNull()
  })

  test('network info data should fetch and store correctly', async () => {
    const db = await loadDatabase()
    const info = getNetworkInfo()
    expect(db).not.toBeNull()

    db.exec(createNetworkinfo)
    const result = insertNetworkInfotoDB(db, info)
    expect(result).not.toBeNull()
  })

  test('net total info data should fetch and store correctly', async () => {
    const db = await loadDatabase()
    const info = getNetTotals()
    expect(db).not.toBeNull()

    db.exec(createNettotals)
    const result = insertNetTotalsToDB(db, info)
    expect(result).not.toBeNull()
  })

  test('mempool info data should fetch and store correctly', async () => {
    const db = await loadDatabase()
    const info = getMempoolInfo()
    expect(db).not.toBeNull()

    db.exec(createMempoolinfo)
    const result = insertMempoolinfoToDB(db, info)
    expect(result).not.toBeNull()
  })

  test('rawmempool info data should fetch and store correctly', async () => {
    const db = await loadDatabase()
    const info = getRawMempool()
    expect(db).not.toBeNull()

    db.exec(createRawmempoolinfo)
    const result = insertRawMempoolinfoToDB(db, info)
    expect(result).not.toBeNull()
  })

  test('rawmempool data should fetch and store correctly', async () => {
    const db = await loadDatabase()
    const info = getMiningInfo()
    expect(db).not.toBeNull()

    db.exec(createMininginfo)
    const result = insertMiningInfoToDB(db, info)
    expect(result).not.toBeNull()
  })

  test('blockbyhash data should fetch and store correctly', async () => {
    const db = await loadDatabase()
    const info = getBlockByHash()
    expect(db).not.toBeNull()

    db.exec(createBlock)
    const result = insertBlockInfoToDB(db, info)
    expect(result).not.toBeNull()
  })

  test('rawtransaction data should fetch and store correctly', async () => {
    const db = await loadDatabase()
    const info = getRawTransaction()
    expect(db).not.toBeNull()

    db.exec(createRawtransaction)
    const result = insertRawtransaction(db, info)
    expect(result).not.toBeNull()
  })

  test('txoutset data should fetch and store correctly', async () => {
    const db = await loadDatabase()
    const info = getRpcData()
    expect(db).not.toBeNull()

    db.exec(createTxoutsetinfo)
    const result = insertTxoutsetinfo(db, info)
    expect(result).not.toBeNull()
  })

  test('txoutset data should fetch and store correctly', async () => {
    const db = await loadDatabase()
    const info = getChaintips()
    expect(db).not.toBeNull()

    db.exec(createChaintips)
    const result = insertChaintips(db, info)
    expect(result).not.toBeNull()
  })

  test('txoutset data should fetch and store correctly', async () => {
    const db = await loadDatabase()
    const info = getBlockSubSidy()
    expect(db).not.toBeNull()

    db.exec(createBlocksubsidy)
    const result = insertBlocksubsidy(db, info)
    expect(result).not.toBeNull()
  })

  test('wallet data should fetch and store correctly', async () => {
    const db = await loadDatabase()
    const info = getWalletInfo()
    expect(db).not.toBeNull()

    db.exec(createWalletinfo)
    const result = insertWalletinfo(db, info)
    expect(result).not.toBeNull()
  })

  test('wallet data should fetch and store correctly', async () => {
    const db = await loadDatabase()
    const info = getWalletInfo()
    expect(db).not.toBeNull()

    db.exec(createWalletinfo)
    const result = insertWalletinfo(db, info)
    expect(result).not.toBeNull()
  })

  test('transaction list should fetch and store correctly', async () => {
    const db = await loadDatabase()
    const info = listTransactions()
    expect(db).not.toBeNull()

    db.exec(createListtransactions)
    const result = insertListTransactions(db, info)
    expect(result).not.toBeNull()
  })

  test('unspent list should fetch and store correctly', async () => {
    const db = await loadDatabase()
    const info = listUnspent()
    expect(db).not.toBeNull()

    db.exec(createListunspent)
    const result = insertListunspent(db, info)
    expect(result).not.toBeNull()
  })

  test('unspent list should fetch and store correctly', async () => {
    const db = await loadDatabase()
    const info = getTotalBalance()
    expect(db).not.toBeNull()

    db.exec(createTotalbalance)
    const result = insertTotalbalance(db, info)
    expect(result).not.toBeNull()
  })

  test('unspent list should fetch and store correctly', async () => {
    const db = await loadDatabase()
    const info = listAddresses()
    expect(db).not.toBeNull()

    db.exec(createListaddresses)
    const result = insertListaddresses(db, info)
    expect(result).not.toBeNull()
  })
})
