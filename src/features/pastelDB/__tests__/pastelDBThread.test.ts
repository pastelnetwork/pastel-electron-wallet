import initSqlJs, { Database } from 'sql.js'

import {
  createBlock,
  createMempoolinfo,
  createMininginfo,
  createNettotals,
  createNetworkinfo,
  createRawmempoolinfo,
  createStatisticinfo,
} from '../constants'
import {
  insertBlockInfoToDB,
  insertMempoolinfoToDB,
  insertMiningInfoToDB,
  insertNetTotalsToDB,
  insertNetworkInfotoDB,
  insertRawMempoolinfoToDB,
  insertStatisticDataToDB,
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
})
