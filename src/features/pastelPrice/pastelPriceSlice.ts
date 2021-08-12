import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import store from '../../redux/store'
import coinGeckoClient from './coingecko'
import log from 'electron-log'

export interface IPastelPriceState {
  price: number
  lastFetched: number | undefined
}

const initialState: IPastelPriceState = {
  price: 0,
  lastFetched: undefined,
}

export const pastelPriceSlice = createSlice({
  name: 'pastelPrice',
  initialState,
  reducers: {
    setPastelPrice(
      state: IPastelPriceState,
      action: PayloadAction<IPastelPriceState>,
    ) {
      state.price = action.payload.price
      state.lastFetched = action.payload.lastFetched
    },
  },
})

export const pastelPriceReducer = pastelPriceSlice.reducer

export const { setPastelPrice } = pastelPriceSlice.actions

export const fetchPastelPrice = async (): Promise<void> => {
  try {
    const resp = await coinGeckoClient.simple.price({
      ids: ['pastel'],
      vs_currencies: ['usd'],
    })

    if (!resp.data?.['pastel']?.['usd']) {
      throw new Error('pastelPrice fetchPastelPrice error: invalid response')
    }

    // set price
    store.dispatch(
      setPastelPrice({
        price: resp.data['pastel']['usd'],
        lastFetched: Date.now(),
      }),
    )
  } catch (err) {
    log.error(err.message)
  }
}
