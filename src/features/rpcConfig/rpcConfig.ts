import fs from 'fs'
import ini from 'ini'

import { TRPCConfig } from '../../api/pastel-rpc'

let rpcConfig: TRPCConfig | undefined

export const getRpcConfig = (): TRPCConfig | undefined => {
  return rpcConfig
}

export const requireRpcConfig = (): TRPCConfig => {
  if (!rpcConfig) {
    throw new Error('Tried to invoke rpc before loading config')
  }

  return rpcConfig
}

export const setRpcConfig = (config: TRPCConfig): void => {
  rpcConfig = config
}

export const readRpcConfig = async (
  pastelConfigFilePath: string,
): Promise<TRPCConfig> => {
  const content = await fs.promises.readFile(pastelConfigFilePath, {
    encoding: 'utf-8',
  })

  const { rpcuser, rpcpassword, testnet, rpcbind, rpcport } = ini.parse(content)

  if (!rpcuser || !rpcpassword) {
    throw new Error('pastel.conf if missing rpcuser or rpcpassword')
  }

  const isTestnet = testnet === '1'
  const server = rpcbind || '127.0.0.1'
  const port = rpcport || (isTestnet ? '19932' : '9932')
  const url = `http://${server}:${port}`

  return {
    username: rpcuser,
    password: rpcpassword,
    url,
  }
}
