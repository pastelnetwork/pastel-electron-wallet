import log from 'electron-log'
import { RPCClient } from 'rpc-bitcoin'

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
    const newUrl = url.split(':')
    const client = new RPCClient({
      url: `${newUrl[0]}:${newUrl[1]}`,
      port: Number(newUrl[2]),
      timeout: 10000,
      user: username,
      pass: password,
    })
    response = await client.batch({ method, params })
  } catch (err) {
    if (err?.error?.code !== 'ECONNREFUSED') {
      log.error(
        `legacy/rpc error. Error: ${JSON.stringify(
          err.message,
        )}. Status code: ${JSON.stringify(err.error?.errno)}`,
      )
    } else {
      log.error(
        `legacy/rpc no connection. Error: ${JSON.stringify(err?.message)}`,
      )
    }
    throw new Error('api/pastel-rpc error: Cannot connect to Pasteld')
  }

  return response as T
}
