import { Factory } from 'fishery'
import PastelDB from '../database'
import { insertNetworkInfo, TDbNetworkInfo } from './networkInfo.repo'

export const networkInfoFactory = Factory.define<TDbNetworkInfo>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      insertNetworkInfo(db, params)
      return params
    })

    return {
      id: sequence,
      version: 1.0,
      subversion: '1.0',
      protocolversion: 1,
      localservices: '',
      timeoffset: 0,
      connections: 0,
      networks: 'networks',
      relayfee: 0,
      localaddresses: 'localaddresses',
      warnings: 'warnings',
      createdAt: Date.now() + sequence,
    }
  },
)
