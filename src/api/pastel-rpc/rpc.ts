import axios, { AxiosResponse } from 'axios'
import { TRpcParam } from 'types/rpc'
import log from 'electron-log'
import { requireRpcConfig } from '../../features/rpcConfig'

export type TRPCConfig = {
  url: string
  username: string
  password: string
}

export async function rpc<T>(method: string, params: TRpcParam[]): Promise<T> {
  const { url, username, password } = requireRpcConfig()
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
  } catch ({ message, response, request }) {
    if (message) {
      log.error(
        `api/pastel-rpc server error. Response: ${JSON.stringify(
          response?.data,
        )}. Status code: ${JSON.stringify(response?.status)}`,
      )
      throw new Error(`api/pastel-rpc server error: ${message}`)
    }

    if (request) {
      // The request was made but no response was received
      log.error(
        `api/pastel-rpc no response error. Request: ${JSON.stringify(
          request,
        )}.`,
      )
      throw new Error(`api/pastel-rpc no response error: ${request}`)
    }

    log.error('api/pastel-rpc error: Cannot connect to Pasteld.')
    throw new Error('api/pastel-rpc error: Cannot connect to Pasteld')
  }

  return response.data as T
}
