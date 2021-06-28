import axios, { AxiosResponse } from 'axios'
import { TRpcParam } from 'types/rpc'

export type TRPCConfig = {
  url: string
  username: string
  password: string
}

export async function rpc<T>(
  method: string,
  params: TRpcParam[],
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
  } catch ({ message, response, request }) {
    if (message) {
      throw new Error(`api/pastel-rpc server error: ${message}`)
    }

    if (request) {
      // The request was made but no response was received
      throw new Error(`api/pastel-rpc no response error: ${request}`)
    }

    throw new Error('api/pastel-rpc error: can not connect to pastel id')
  }

  return response.data as T
}
