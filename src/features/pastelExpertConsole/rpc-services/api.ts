/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'

import store from '../../../redux/store'
import { APIMethods, METHODS } from './utils'

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

const apiMethods: any = {}

const api: APIMethods = METHODS.reduce(
  (obj, method) => ({
    ...obj,
    [method]: (params = []) => {
      const RPC = getRPCConfig()
      return new Promise((resolve, reject) => {
        axios(RPC.url, {
          method: 'POST',
          auth: {
            username: RPC.username,
            password: RPC.password,
          },
          data: {
            jsonrpc: '2.0',
            id: 'curltest',
            method,
            params,
          },
        })
          .then((data: any) => {
            console.log('[RPC CALL SUCCESS] -', method, data)
            resolve(data.data.result)
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
  }),
  apiMethods,
)

export default api
