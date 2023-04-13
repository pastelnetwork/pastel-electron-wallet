import axios, { CancelTokenSource } from 'axios'
import { RPC as RPCRequest } from 'rpc-request'

import store from '../../../redux/store'
import { METHODS } from './utils'

const getRPCConfig = () => {
  const state = store.getState()
  const { pastelConf } = state

  return pastelConf || {}
}

const getMessage = (statusCode: number, isECONNREFUSED: boolean) => {
  if (isECONNREFUSED) {
    return 'Pastel could not find a daemon running, please check the logs!'
  }

  switch (statusCode) {
    case 401:
      return 'Not authorized to access RPC, please check your rpcuser and rpcpassword'
    default:
      return 'Something went wrong'
  }
}

const apiRequests: CancelTokenSource[] = []

type possibleMethods = typeof METHODS[number]
type dynamicAPI = {
  [x in possibleMethods]: <T>(params: string[]) => Promise<T>
}

let apiMethods = {} as dynamicAPI

METHODS.forEach((method: string) => {
  apiMethods = {
    ...apiMethods,
    [method]: <T>(params: string[]): Promise<T> => {
      const { url, username, password } = getRPCConfig()
      return new Promise((resolve, reject) => {
        const CancelToken = axios.CancelToken
        const source = CancelToken.source()

        apiRequests.push(source)

        const client = new RPCRequest({
          baseUrl: url,
          timeout: 10000,
          json: true,
          auth: {
            user: username,
            pass: password,
          },
        })
        client
          .post({
            body: {
              method,
              params,
              jsonrpc: '2.0',
              id: method,
            },
            uri: '/',
          })
          .then(r => resolve(r?.result))
          .catch(error => {
            console.log('[RPC CALL ERROR] - ', { ...error })
            const msg = error.error?.error?.message
            const message =
              msg ||
              getMessage(
                error.statusCode,
                (error?.error?.code || '').indexOf('ECONNREFUSED') !== -1,
              )
            reject({
              message,
              statusCode: error.statusCode,
            })
          })
      })
    },
  }
})

export default apiMethods

export { apiRequests }
