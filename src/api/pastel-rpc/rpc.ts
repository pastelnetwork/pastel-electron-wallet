import axios, { AxiosResponse } from 'axios'
import log from 'electron-log'

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
  let response: AxiosResponse
  try {
    response = await axios(url, {
      data: {
        jsonrpc: '2.0',
        id: method,
        method,
        params,
      },
      method: 'POST',
      auth: {
        username,
        password,
      },
    })
  } catch (err) {
    if (err.response) {
      log.error(
        `api/pastel-rpc server error. Response: ${JSON.stringify(
          err.response?.data,
        )}. Status code: ${JSON.stringify(err.response?.status)}`,
      )
      throw new Error(`api/pastel-rpc server error: ${err.message}`)
    }

    if (err.request) {
      // The request was made but no response was received
      log.error(
        `api/pastel-rpc no response error. Request: ${JSON.stringify(
          err.request,
        )}.`,
      )
      throw new Error(`api/pastel-rpc no response error: ${err.request}`)
    }

    log.error(
      `api/pastel-rpc error: Cannot connect to Pasteld. Error: ${JSON.stringify(
        err,
      )}`,
    )
    throw new Error('api/pastel-rpc error: Cannot connect to Pasteld')
  }

  return response.data as T
}
