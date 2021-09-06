import { Database } from 'better-sqlite3'

import * as pastelRPC from '../../../api/pastel-rpc/rpc'
import coinGeckoClient from '../../pastelPrice/coingecko'
import * as pastelDBLib from '../pastelDBLib'
import * as pastelDBThread from '../pastelDBThread'
import { setRpcConfig } from '../../rpcConfig'
import { useTestDb } from '../../../common/utils/test-utils'
import * as statisticInfoRepo from '../statistic/statisticInfo.repo'
import * as networkInfoRepo from '../network/networkInfo.repo'
import * as netTotalsRepo from '../network/netTotals.repo'
import * as memPoolInfoRepo from '../blockchain/memPoolInfo.repo'
import * as txOutSentInfoRepo from '../blockchain/txOutSetInfo.repo'
import * as chainTipsRepo from '../blockchain/chainTips.repo'
import * as blockSubsidyRepo from '../mining/blockSubsidy.repo'
import * as walletInfoRepo from '../wallet/walletInfo.repo'
import * as listAddressRepo from '../wallet/listAddress.repo'

jest.mock('../../pastelPrice/coingecko', () => ({
  simple: {
    price: jest.fn(),
  },
}))

describe('PastelDBThread', () => {
  const mockConfig = {
    username: 'pastelwallet',
    password: 'kizvmu1tmvf',
    url: 'http://127.0.0.1:9932',
  }

  let db: Database
  useTestDb(value => (db = value))

  beforeAll(async () => {
    setRpcConfig(mockConfig)
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
      createdAt: '',
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

  const mockListAddresses = ['address']

  const mockBlockChainInfo = {
    result: {
      bestblockhash: '1023655ase41252455',
      blocks: 60524,
      chain: '',
      chainwork: '',
      commitments: 1,
      consensus: {
        chaintip: '',
        nextblock: '',
      },
      difficulty: 0.26125444544,
      headers: 1,
      pruned: true,
      softforks: [
        {
          enforce: {
            found: 0,
            required: 0,
            status: true,
            window: 0,
          },
          id: 0,
          reject: {
            found: 0,
            required: 0,
            status: true,
            window: 0,
          },
          version: 1,
        },
      ],
      upgrades: {
        index1: {
          activationheight: 0,
          info: '',
          name: '',
          status: '',
        },
      },
      valuePools: [
        {
          chainValue: 0,
          chainValueZat: 0,
          id: '',
          monitored: true,
        },
      ],
      verificationprogress: 0,
    },
  }

  test('fetchStatisticInfo works', async () => {
    // Arrange
    const rpcSpy = jest.spyOn(pastelRPC, 'rpc').mockImplementation(method =>
      Promise.resolve({
        result: method === 'getnetworkhashps' ? 10000 : 12345.234,
      }),
    )
    const insertStatisticDataToDBSpy = jest
      .spyOn(statisticInfoRepo, 'insertStatisticInfo')
      .mockImplementation()

    // Act
    await pastelDBThread.fetchStatisticInfo({
      pastelDB: db,
    })

    // Assert
    expect(rpcSpy).toHaveBeenCalledWith('getnetworkhashps', [])
    expect(rpcSpy).toHaveBeenCalledWith('getdifficulty', [])
    expect(insertStatisticDataToDBSpy).toHaveBeenCalledWith(db, {
      difficulty: 12345.234,
      solutions: 10000,
    })
  })

  test('fetchNetworkInfo works', async () => {
    // Arrange
    const rpcSpy = jest
      .spyOn(pastelRPC, 'rpc')
      .mockResolvedValue(mockNetworkInfo)
    const insertNetworkInfoToDBSpy = jest
      .spyOn(networkInfoRepo, 'insertNetworkInfo')
      .mockImplementation()

    // Act
    await pastelDBThread.fetchNetworkInfo({
      pastelDB: db,
    })

    // Assert
    expect(rpcSpy).toHaveBeenCalledWith('getnetworkinfo', [])
    expect(insertNetworkInfoToDBSpy).toHaveBeenCalledWith(db, {
      connections: 0,
      createdAt: '',
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
      .spyOn(netTotalsRepo, 'insertNetTotals')
      .mockImplementation()

    // Act
    await pastelDBThread.fetchNettotals({
      pastelDB: db,
    })

    // Assert
    expect(rpcSpy).toHaveBeenCalledWith('getnettotals', [])
    expect(insertNetTotalsToDBSpy).toHaveBeenCalledWith(db, {
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
      .spyOn(memPoolInfoRepo, 'insertMemPoolInfo')
      .mockImplementation()

    // Act
    await pastelDBThread.fetchMempoolInfo({
      pastelDB: db,
    })

    // Assert
    expect(rpcSpy).toHaveBeenCalledWith('getmempoolinfo', [])
    expect(insertMempoolInfoToDBSpy).toHaveBeenCalledWith(db, {
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
      pastelDB: db,
    })

    // Assert
    expect(rpcSpy).toHaveBeenCalledWith('getmininginfo', [])
    expect(insertMiningInfoToDBSpy).toHaveBeenCalledWith(db, {
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
      pastelDB: db,
    })

    // Assert
    expect(rpcSpy).toHaveBeenCalledWith('getbestblockhash', [])
    expect(insertBlockInfoToDBSpy).toHaveBeenCalledWith(db, {
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
      .spyOn(txOutSentInfoRepo, 'insertTxOutSentInfo')
      .mockImplementation()

    // Act
    await pastelDBThread.fetchTxoutsetInfo({
      pastelDB: db,
    })

    // Assert
    expect(rpcSpy).toHaveBeenCalledWith('gettxoutsetinfo', [])
    expect(insertTxoutsetinfoSpy).toHaveBeenCalledWith(db, {
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
      .spyOn(chainTipsRepo, 'insertChainTips')
      .mockImplementation()

    // Act
    await pastelDBThread.fetchChaintips({
      pastelDB: db,
    })

    // Assert
    expect(rpcSpy).toHaveBeenCalledWith('getchaintips', [])
    expect(insertChaintipsSpy).toHaveBeenCalledWith(db, {
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
      .spyOn(blockSubsidyRepo, 'insertBlockSubsidy')
      .mockImplementation()

    // Act
    await pastelDBThread.fetchBlocksubsidy({
      pastelDB: db,
    })

    // Assert
    expect(rpcSpy).toHaveBeenCalledWith('getblocksubsidy', [])
    expect(insertBlocksubsidySpy).toHaveBeenCalledWith(db, {
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
      .spyOn(walletInfoRepo, 'insertWalletInfo')
      .mockImplementation()

    // Act
    await pastelDBThread.fetchWalletInfo({
      pastelDB: db,
    })

    // Assert
    expect(rpcSpy).toHaveBeenCalledWith('getwalletinfo', [])
    expect(insertWalletinfoSpy).toHaveBeenCalledWith(db, {
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

  test('fetchTotalBalance works', async () => {
    // Arrange
    const rpcSpy = jest
      .spyOn(pastelRPC, 'rpc')
      .mockResolvedValue(mockTotalBalance)
    const insertTotalbalanceSpy = jest
      .spyOn(pastelDBLib, 'insertTotalbalance')
      .mockImplementation()

    // Act
    await pastelDBThread.fetchTotalBalance({
      pastelDB: db,
    })

    // Assert
    expect(rpcSpy).toHaveBeenCalledWith('z_gettotalbalance', [])
    expect(insertTotalbalanceSpy).toHaveBeenCalledWith(db, {
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
      .spyOn(listAddressRepo, 'insertListAddress')
      .mockImplementation()

    // Act
    await pastelDBThread.fetchListaddresses({
      pastelDB: db,
    })

    // Assert
    expect(rpcSpy).toHaveBeenCalledWith('z_listaddresses', [], { throw: true })
    expect(insertListaddressesSpy).toHaveBeenCalledWith(db, {
      address: 'address',
    })
  })

  test('fetchBlockChainInfo works', async () => {
    // Arrange
    const rpcSpy = jest
      .spyOn(pastelRPC, 'rpc')
      .mockResolvedValue(mockBlockChainInfo)
    const insertBlockChainInfoSpy = jest
      .spyOn(pastelDBLib, 'insertBlockChainInfoToDb')
      .mockImplementation()

    // Act
    await pastelDBThread.fetchBlockChainInfo({
      pastelDB: db,
    })

    // Assert
    expect(rpcSpy).toHaveBeenCalledWith('getblockchaininfo', [])
    expect(insertBlockChainInfoSpy).toHaveBeenCalledWith(db, {
      bestblockhash: '1023655ase41252455',
      blocks: 60524,
      chain: '',
      chainwork: '',
      commitments: 1,
      consensus: {
        chaintip: '',
        nextblock: '',
      },
      difficulty: 0.26125444544,
      headers: 1,
      pruned: true,
      softforks: [
        {
          enforce: {
            found: 0,
            required: 0,
            status: true,
            window: 0,
          },
          id: 0,
          reject: {
            found: 0,
            required: 0,
            status: true,
            window: 0,
          },
          version: 1,
        },
      ],
      upgrades: {
        index1: {
          activationheight: 0,
          info: '',
          name: '',
          status: '',
        },
      },
      valuePools: [
        {
          chainValue: 0,
          chainValueZat: 0,
          id: '',
          monitored: true,
        },
      ],
      verificationprogress: 0,
    })
  })

  test('fetchPastelPrices works', async () => {
    // Arrange
    const coingeckoSpy = jest
      .spyOn(coinGeckoClient.simple, 'price')
      .mockResolvedValue({
        success: true,
        message: 'string',
        code: 200,
        data: {
          pastel: {
            usd: 10,
          },
        },
      })
    const insertPastelPriceSpy = jest
      .spyOn(pastelDBLib, 'insertPastelPrice')
      .mockImplementation()

    // Act
    await pastelDBThread.fetchPastelPrices({
      pastelDB: db,
    })

    // Assert
    expect(coingeckoSpy).toHaveBeenCalledWith({
      ids: ['pastel'],
      vs_currencies: ['usd'],
    })
    expect(insertPastelPriceSpy).toBeCalledTimes(1)
  })
})
