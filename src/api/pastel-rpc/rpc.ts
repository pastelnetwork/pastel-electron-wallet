import axios, { AxiosResponse } from 'axios'

export type TRPCConfig = {
  url: string
  username: string
  password: string
}

export async function rpc<T>(
  method: string,
  params: string[],
  rpcConfig: TRPCConfig,
): Promise<T> {
  const { url, username, password } = rpcConfig
  let response: AxiosResponse

  try {
    response = await axios(url, {
      data: {
        jsonrpc: '2.0',
        id: 'curltest',
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
      throw new Error(`api/pastel-rpc server error: ${err.response}`)
    }

    if (err.request) {
      // The request was made but no response was received
      throw new Error(`api/pastel-rpc no response error: ${err.request}`)
    }

    throw new Error('api/pastel-rpc error: can not connect to pastel id')
  }

  return response.data as T
}
