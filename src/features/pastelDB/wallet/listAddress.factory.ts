import { Factory } from 'fishery'
import PastelDB from '../database'
import { insertListAddress, TDbListAddress } from './listAddress.repo'

export const listAddressFactory = Factory.define<TDbListAddress>(
  ({ sequence, onCreate }) => {
    onCreate(async params => {
      const db = await PastelDB.getDatabaseInstance()
      insertListAddress(db, params)
      return params
    })
    const now: number = Date.now()
    const vSequence: number = sequence
    return {
      id: sequence,
      address: 'address',
      createdAt: now + vSequence,
    }
  },
)
