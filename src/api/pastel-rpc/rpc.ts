import log from 'electron-log'
import { RPC as RPCRequest } from 'rpc-request'

export type TRPCConfig = {
  url: string
  username: string
  password: string
}

export async function rpc<T>(
  method: string,
  params: (string | boolean | number)[],
  rpcConfig: TRPCConfig,
): Promise<T> {
  const { url, username, password } = rpcConfig
  let response: T
  try {
    const client = new RPCRequest({
      baseUrl: url,
      timeout: 10000,
      json: true,
      auth: {
        user: username,
        pass: password,
      },
    })
    response = await client.post({
      body: {
        method,
        params,
        jsonrpc: '2.0',
        id: method,
      },
      uri: '/',
    })
  } catch (err) {
    if (err?.error?.code !== 'ECONNREFUSED') {
      log.error(
        `legacy/rpc response error. Response: ${JSON.stringify(
          err.error?.error?.message,
        )}. Status code: ${err.statusCode}`,
      )
      throw new Error(`api/pastel-rpc no response error: ${err.request}`)
    }
    log.error(`legacy/rpc no connection. Error: ${JSON.stringify(err.message)}`)
    throw new Error('api/pastel-rpc error: Cannot connect to Pasteld')
  }

  return response as T
}
