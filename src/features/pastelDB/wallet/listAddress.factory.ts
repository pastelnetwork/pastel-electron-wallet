import { Factory } from 'fishery'
import { insertListaddressesQuery, TDbListAddress } from '../constants'
import PastelDB from '../database'

export const listAddressFactory = Factory.define<TDbListAddress>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      db.prepare(insertListaddressesQuery).run(params)
      return params
    })

    return {
      id: sequence,
      address: 'address',
      createdAt: Date.now() + sequence,
    }
  },
)
