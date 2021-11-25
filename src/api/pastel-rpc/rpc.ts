import axios, { AxiosResponse } from 'axios'
import { TRpcParam } from 'types/rpc'
import log from 'electron-log'
import { requireRpcConfig } from '../../features/rpcConfig'

export type TRPCConfig = {
  url: string
  username: string
  password: string
}

export async function rpc<T>(
  method: string,
  params: TRpcParam[],
  options?: { throw?: boolean },
): Promise<T> {
  const { url, username, password } = requireRpcConfig()
  let response: AxiosResponse = {
    data: {},
    status: 0,
    statusText: '',
    headers: {},
    config: {},
    request: null,
  }
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

    if (options?.throw) {
      if (response.data.error) {
        throw new Error(response.data.error)
      }

      return response.data.result
    }

    return response.data
  } catch ({ message, response, request }) {
    if (message) {
      const strData: string = JSON.stringify(response?.data) || ''
      const responseStatus: string = JSON.stringify(response?.status) || ''
      log.error(
        `api/pastel-rpc server error. Response: ${strData}${
          response?.status ? `. Status code: ${responseStatus}` : ''
        }`,
      )
      const strMessage: string = message?.toString()
      throw new Error(`api/pastel-rpc server error: ${strMessage}`)
    }

    if (request) {
      const strRequest: string = JSON.stringify(request)
      // The request was made but no response was received
      log.error(`api/pastel-rpc no response error. Request: ${strRequest}.`)
      throw new Error(`api/pastel-rpc no response error: ${strRequest}`)
    }

    log.error('api/pastel-rpc error: Cannot connect to Pasteld.')
    throw new Error('api/pastel-rpc error: Cannot connect to Pasteld')
  }
}
