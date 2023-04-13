import axios, { CancelTokenSource } from 'axios'

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

        axios(url, {
          method: 'POST',
          auth: { username, password },
          data: {
            jsonrpc: '2.0',
            id: method,
            method,
            params,
          },
          cancelToken: source.token,
        })
          .then(data => {
            console.log('[RPC CALL SUCCESS] -', method, data?.data?.result)
            resolve(data?.data?.result)
          })
          .catch(error => {
            console.log('[RPC CALL ERROR] - ', { ...error })
            const { response = {}, status: statusCode = 500 } = { ...error }
            const { message: msg } = response.data?.error || {}
            const message =
              msg ||
              getMessage(statusCode, (msg || '').indexOf('ECONNREFUSED') !== -1)

            reject({
              message,
              statusCode: statusCode,
            })
          })
      })
    },
  }
})

export default apiMethods

export { apiRequests }
