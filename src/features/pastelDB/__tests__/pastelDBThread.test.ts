import initSqlJs, { Database } from 'sql.js'

import * as pastelRPC from '../../../api/pastel-rpc/rpc'
import PastelDB from '../../../features/pastelDB/database'
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
} from '../constants'
import * as pastelDBLib from '../pastelDBLib'
import * as pastelDBThread from '../pastelDBThread'

type Databaseinstance = {
  db: Database
}

describe('PastelDBThread', () => {
  const loadDatabase = jest.fn(async () => {
    const SQL = await initSqlJs()
    const db: Database = new SQL.Database()
    return db
  })

  const pastelDB: Databaseinstance = {
    db: {} as Database,
  }

  const mockConfig = {
    username: 'pastelwallet',
    password: 'kizvmu1tmvf',
    url: 'http://127.0.0.1:9932',
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

  const mockNetworkInfo = {
    result: {
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
    },
  }

  const mockNetTotals = {
    result: {
      totalbytesrecv: 0,
      totalbytessent: 0,
      timemillis: 0,
    },
  }

  const mockMempoolInfo = {
    result: {
      size: 0,
      bytes: 100,
      usage: 10,
    },
  }

  const mockMiningInfo = {
    result: {
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
    },
  }

  const mockBlockByHash = {
    result: {
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
    },
  }

  const mockTxoutsetinfo = {
    result: {
      height: 0,
      bestblock: 'best-block-123456',
      transactions: 0,
      txouts: 0,
      bytes_serialized: 0,
      hash_serialized: '',
      total_amount: 0,
    },
  }

  const mockChaintips = {
    result: [
      {
        height: 0,
        hash: 'chain-tips-hash-1234578',
        branchlen: 0,
        status: '',
      },
    ],
  }

  const mockBlockSubSidy = {
    result: {
      miner: 456789,
      masternode: 0,
      governance: 0,
    },
  }

  const mockWalletInfo = {
    result: {
      walletversion: 456789,
      balance: 0,
      unconfirmed_balance: 0,
      immature_balance: 0,
      txcount: 0,
      keypoololdest: 0,
      keypoolsize: 0,
      paytxfee: 0,
      seedfp: '',
    },
  }

  const mockTotalBalance = {
    result: {
      transparent: 'totalbalance-transparent',
      private: '',
      total: '',
    },
  }

  const mockListAddresses = {
    result: ['address'],
  }

  test('fetchStatisticInfo works', async () => {
    // Arrange
    const rpcSpy = jest.spyOn(pastelRPC, 'rpc').mockResolvedValue({
      result: { hashrate: 10000, difficult: 12345.234 },
    })
    const insertStatisticDataToDBSpy = jest
      .spyOn(pastelDBLib, 'insertStatisticDataToDB')
      .mockImplementation()

    // Act
    await pastelDBThread.fetchStatisticInfo({
      pastelDB: pastelDB.db,
      rpcConfig: mockConfig,
    })

    // Assert
    expect(rpcSpy).toHaveBeenCalledWith('getnetworkhashps', [], mockConfig)
    expect(rpcSpy).toHaveBeenCalledWith('getdifficulty', [], mockConfig)
    expect(insertStatisticDataToDBSpy).toHaveBeenCalledWith(
      pastelDB.db,
      { difficult: 12345.234, hashrate: 10000 },
      { difficult: 12345.234, hashrate: 10000 },
    )
  })

  test('fetchNetworkInfo works', async () => {
    // Arrange
    const rpcSpy = jest
      .spyOn(pastelRPC, 'rpc')
      .mockResolvedValue(mockNetworkInfo)
    const insertNetworkInfoToDBSpy = jest
      .spyOn(pastelDBLib, 'insertNetworkInfoToDB')
      .mockImplementation()

    // Act
    await pastelDBThread.fetchNetworkInfo({
      pastelDB: pastelDB.db,
      rpcConfig: mockConfig,
    })

    // Assert
    expect(rpcSpy).toHaveBeenCalledWith('getnetworkinfo', [], mockConfig)
    expect(insertNetworkInfoToDBSpy).toHaveBeenCalledWith(pastelDB.db, {
      connections: 0,
      create_timestamp: '',
      localaddresses: [{ address: '', port: 0, score: 0 }],
      localservices: '',
      networks: [{ limited: true, name: '', proxy: '', reachable: true }],
      protocolversion: 1,
      relayfee: 0,
      subversion: '1.0',
      timeoffset: 0,
      version: 1,
      warnings: 'warnings',
    })
  })

  test('fetchNettotals works', async () => {
    // Arrange
    const rpcSpy = jest.spyOn(pastelRPC, 'rpc').mockResolvedValue(mockNetTotals)
    const insertNetTotalsToDBSpy = jest
      .spyOn(pastelDBLib, 'insertNetTotalsToDB')
      .mockImplementation()

    // Act
    await pastelDBThread.fetchNettotals({
      pastelDB: pastelDB.db,
      rpcConfig: mockConfig,
    })

    // Assert
    expect(rpcSpy).toHaveBeenCalledWith('getnettotals', [], mockConfig)
    expect(insertNetTotalsToDBSpy).toHaveBeenCalledWith(pastelDB.db, {
      timemillis: 0,
      totalbytesrecv: 0,
      totalbytessent: 0,
    })
  })

  test('fetchMempoolInfo works', async () => {
    // Arrange
    const rpcSpy = jest
      .spyOn(pastelRPC, 'rpc')
      .mockResolvedValue(mockMempoolInfo)
    const insertMempoolInfoToDBSpy = jest
      .spyOn(pastelDBLib, 'insertMempoolInfoToDB')
      .mockImplementation()

    // Act
    await pastelDBThread.fetchMempoolInfo({
      pastelDB: pastelDB.db,
      rpcConfig: mockConfig,
    })

    // Assert
    expect(rpcSpy).toHaveBeenCalledWith('getmempoolinfo', [], mockConfig)
    expect(insertMempoolInfoToDBSpy).toHaveBeenCalledWith(pastelDB.db, {
      bytes: 100,
      size: 0,
      usage: 10,
    })
  })

  test('fetchMiningInfo works', async () => {
    // Arrange
    const rpcSpy = jest
      .spyOn(pastelRPC, 'rpc')
      .mockResolvedValue(mockMiningInfo)
    const insertMiningInfoToDBSpy = jest
      .spyOn(pastelDBLib, 'insertMiningInfoToDB')
      .mockImplementation()

    // Act
    await pastelDBThread.fetchMiningInfo({
      pastelDB: pastelDB.db,
      rpcConfig: mockConfig,
    })

    // Assert
    expect(rpcSpy).toHaveBeenCalledWith('getmininginfo', [], mockConfig)
    expect(insertMiningInfoToDBSpy).toHaveBeenCalledWith(pastelDB.db, {
      blocks: 0,
      chain: 'mininginfo-chain',
      currentblocksize: 0,
      currentblocktx: 0,
      difficulty: 0,
      errors: '',
      generate: true,
      genproclimit: 0,
      localsolps: 0,
      networkhashps: 0,
      networksolps: 0,
      newId: 1,
      pooledtx: 0,
      testnet: 0,
    })
  })

  test('fetchBlock works', async () => {
    // Arrange
    const rpcSpy = jest
      .spyOn(pastelRPC, 'rpc')
      .mockResolvedValue(mockBlockByHash)
    const insertBlockInfoToDBSpy = jest
      .spyOn(pastelDBLib, 'insertBlockInfoToDB')
      .mockImplementation()

    // Act
    await pastelDBThread.fetchBlock({
      pastelDB: pastelDB.db,
      rpcConfig: mockConfig,
    })

    // Assert
    expect(rpcSpy).toHaveBeenCalledWith('getblockhash', [1000], mockConfig)
    expect(insertBlockInfoToDBSpy).toHaveBeenCalledWith(pastelDB.db, {
      anchor: '',
      bits: '',
      chainwork: '',
      confirmations: 0,
      difficulty: 0,
      finalsaplingroot: '',
      hash: 'hash-12345678',
      height: 0,
      merkleroot: '',
      nextblockhash: '',
      nonce: '',
      previousblockhash: '',
      size: 0,
      solution: '',
      time: 0,
      tx: '',
      valuePools: '',
      version: 0,
    })
  })

  test('fetchTxoutsetInfo works', async () => {
    // Arrange
    const rpcSpy = jest
      .spyOn(pastelRPC, 'rpc')
      .mockResolvedValue(mockTxoutsetinfo)
    const insertTxoutsetinfoSpy = jest
      .spyOn(pastelDBLib, 'insertTxoutsetinfo')
      .mockImplementation()

    // Act
    await pastelDBThread.fetchTxoutsetInfo({
      pastelDB: pastelDB.db,
      rpcConfig: mockConfig,
    })

    // Assert
    expect(rpcSpy).toHaveBeenCalledWith('gettxoutsetinfo', [], mockConfig)
    expect(insertTxoutsetinfoSpy).toHaveBeenCalledWith(pastelDB.db, {
      bestblock: 'best-block-123456',
      bytes_serialized: 0,
      hash_serialized: '',
      height: 0,
      total_amount: 0,
      transactions: 0,
      txouts: 0,
    })
  })

  test('fetchChaintips works', async () => {
    // Arrange
    const rpcSpy = jest.spyOn(pastelRPC, 'rpc').mockResolvedValue(mockChaintips)
    const insertChaintipsSpy = jest
      .spyOn(pastelDBLib, 'insertChaintips')
      .mockImplementation()

    // Act
    await pastelDBThread.fetchChaintips({
      pastelDB: pastelDB.db,
      rpcConfig: mockConfig,
    })

    // Assert
    expect(rpcSpy).toHaveBeenCalledWith('getchaintips', [], mockConfig)
    expect(insertChaintipsSpy).toHaveBeenCalledWith(pastelDB.db, {
      branchlen: 0,
      hash: 'chain-tips-hash-1234578',
      height: 0,
      status: '',
    })
  })

  test('fetchBlocksubsidy works', async () => {
    // Arrange
    const rpcSpy = jest
      .spyOn(pastelRPC, 'rpc')
      .mockResolvedValue(mockBlockSubSidy)
    const insertBlocksubsidySpy = jest
      .spyOn(pastelDBLib, 'insertBlocksubsidy')
      .mockImplementation()

    // Act
    await pastelDBThread.fetchBlocksubsidy({
      pastelDB: pastelDB.db,
      rpcConfig: mockConfig,
    })

    // Assert
    expect(rpcSpy).toHaveBeenCalledWith('getblocksubsidy', [], mockConfig)
    expect(insertBlocksubsidySpy).toHaveBeenCalledWith(pastelDB.db, {
      governance: 0,
      masternode: 0,
      miner: 456789,
    })
  })

  test('fetchWalletInfo works', async () => {
    // Arrange
    const rpcSpy = jest
      .spyOn(pastelRPC, 'rpc')
      .mockResolvedValue(mockWalletInfo)
    const insertWalletinfoSpy = jest
      .spyOn(pastelDBLib, 'insertWalletinfo')
      .mockImplementation()

    // Act
    await pastelDBThread.fetchWalletInfo({
      pastelDB: pastelDB.db,
      rpcConfig: mockConfig,
    })

    // Assert
    expect(rpcSpy).toHaveBeenCalledWith('getwalletinfo', [], mockConfig)
    expect(insertWalletinfoSpy).toHaveBeenCalledWith(pastelDB.db, {
      balance: 0,
      immature_balance: 0,
      keypoololdest: 0,
      keypoolsize: 0,
      paytxfee: 0,
      seedfp: '',
      txcount: 0,
      unconfirmed_balance: 0,
      walletversion: 456789,
    })
  })

  test('fetchTotalbalance works', async () => {
    // Arrange
    const rpcSpy = jest
      .spyOn(pastelRPC, 'rpc')
      .mockResolvedValue(mockTotalBalance)
    const insertTotalbalanceSpy = jest
      .spyOn(pastelDBLib, 'insertTotalbalance')
      .mockImplementation()

    // Act
    await pastelDBThread.fetchTotalbalance({
      pastelDB: pastelDB.db,
      rpcConfig: mockConfig,
    })

    // Assert
    expect(rpcSpy).toHaveBeenCalledWith('z_gettotalbalance', [], mockConfig)
    expect(insertTotalbalanceSpy).toHaveBeenCalledWith(pastelDB.db, {
      private: '',
      total: '',
      transparent: 'totalbalance-transparent',
    })
  })

  test('fetchListaddresses works', async () => {
    // Arrange
    const rpcSpy = jest
      .spyOn(pastelRPC, 'rpc')
      .mockResolvedValue(mockListAddresses)
    const insertListaddressesSpy = jest
      .spyOn(pastelDBLib, 'insertListaddresses')
      .mockImplementation()

    // Act
    await pastelDBThread.fetchListaddresses({
      pastelDB: pastelDB.db,
      rpcConfig: mockConfig,
    })

    // Assert
    expect(rpcSpy).toHaveBeenCalledWith('z_listaddresses', [], mockConfig)
    expect(insertListaddressesSpy).toHaveBeenCalledWith(pastelDB.db, 'address')
  })

  test('patelDBThread works', async () => {
    // Arrange
    const pastelDBSpy = jest
      .spyOn(PastelDB, 'getDatabaseInstance')
      .mockResolvedValue(pastelDB.db)
    const fetchStatisticInfoSpy = jest
      .spyOn(pastelDBThread, 'fetchStatisticInfo')
      .mockResolvedValue()
    const fetchNetworkInfo = jest
      .spyOn(pastelDBThread, 'fetchNetworkInfo')
      .mockResolvedValue()
    const fetchNettotalsSpy = jest
      .spyOn(pastelDBThread, 'fetchNettotals')
      .mockResolvedValue()
    const fetchMempoolInfoSpy = jest
      .spyOn(pastelDBThread, 'fetchMempoolInfo')
      .mockResolvedValue()
    const fetchRawMempoolInfoSpy = jest
      .spyOn(pastelDBThread, 'fetchRawMempoolInfo')
      .mockResolvedValue()
    const fetchMiningInfoSpy = jest
      .spyOn(pastelDBThread, 'fetchMiningInfo')
      .mockResolvedValue()
    const fetchBlockSpy = jest
      .spyOn(pastelDBThread, 'fetchBlock')
      .mockResolvedValue()
    const fetchRawtransactionSpy = jest
      .spyOn(pastelDBThread, 'fetchRawtransaction')
      .mockResolvedValue()
    const fetchTransactionSpy = jest
      .spyOn(pastelDBThread, 'fetchTransaction')
      .mockResolvedValue()
    const fetchTxoutsetInfoSpy = jest
      .spyOn(pastelDBThread, 'fetchTxoutsetInfo')
      .mockResolvedValue()
    const fetchChaintipsSpy = jest
      .spyOn(pastelDBThread, 'fetchChaintips')
      .mockResolvedValue()
    const fetchBlocksubsidySpy = jest
      .spyOn(pastelDBThread, 'fetchBlocksubsidy')
      .mockResolvedValue()
    const fetchWalletInfoSpy = jest
      .spyOn(pastelDBThread, 'fetchWalletInfo')
      .mockResolvedValue()
    const fetchListTransactionsSpy = jest
      .spyOn(pastelDBThread, 'fetchListTransactions')
      .mockResolvedValue()
    const fetchListunspentSpy = jest
      .spyOn(pastelDBThread, 'fetchListunspent')
      .mockResolvedValue()
    const fetchTotalbalanceSpy = jest
      .spyOn(pastelDBThread, 'fetchTotalbalance')
      .mockResolvedValue()
    const fetchListaddressesSpy = jest
      .spyOn(pastelDBThread, 'fetchListaddresses')
      .mockResolvedValue()

    try {
      // Act
      await pastelDBThread.PastelDBThread(mockConfig)

      // Assert
      expect(pastelDBSpy).toHaveBeenCalled()
      expect(fetchStatisticInfoSpy).toHaveBeenCalled()
      expect(fetchNetworkInfo).toHaveBeenCalled()
      expect(fetchNettotalsSpy).toHaveBeenCalled()
      expect(fetchMempoolInfoSpy).toHaveBeenCalled()
      expect(fetchRawMempoolInfoSpy).toHaveBeenCalled()
      expect(fetchMiningInfoSpy).toHaveBeenCalled()
      expect(fetchBlockSpy).toHaveBeenCalled()
      expect(fetchRawtransactionSpy).toHaveBeenCalled()
      expect(fetchTransactionSpy).toHaveBeenCalled()
      expect(fetchTxoutsetInfoSpy).toHaveBeenCalled()
      expect(fetchChaintipsSpy).toHaveBeenCalled()
      expect(fetchBlocksubsidySpy).toHaveBeenCalled()
      expect(fetchWalletInfoSpy).toHaveBeenCalled()
      expect(fetchListTransactionsSpy).toHaveBeenCalled()
      expect(fetchListunspentSpy).toHaveBeenCalled()
      expect(fetchTotalbalanceSpy).toHaveBeenCalled()
      expect(fetchListaddressesSpy).toHaveBeenCalled()
    } catch (e) {
      expect(e.message).toEqual(
        'pastelDBThread fetchRawMempoolInfo error: undefined',
      )
    }
  })
})
