import { TPastelIdWithTxIdAndConfirmed } from '../../api/pastel-rpc'
import create from 'zustand'
import { useEffect } from 'react'

export type TOnboardingStore = {
  pastelId?: TPastelIdWithTxIdAndConfirmed
  setPastelId(pastelId?: TPastelIdWithTxIdAndConfirmed): void
  pastelIdLoadingError?: Error
  setPastelIdLoadingError(error?: Error): void
  setIsPastelIdConfirmed(isConfirmed: boolean): void
}

export const useOnboardingStore = create<TOnboardingStore>(set => ({
  setPastelId(pastelId) {
    set(state => ({ ...state, pastelId }))
  },
  setPastelIdLoadingError(error) {
    set(state => ({ ...state, pastelIdLoadingError: error }))
  },
  setIsPastelIdConfirmed(isConfirmed) {
    set(state => ({
      ...state,
      pastelId: state.pastelId && { ...state.pastelId, isConfirmed },
    }))
  },
}))

export const useOnPastelIdTxIdChange = (
  handler: (txid: string) => () => void,
): void => {
  const txid = useOnboardingStore(store => store.pastelId?.txid)

  useEffect(() => {
    if (!txid) {
      return
    }

    const dispose = handler(txid)
    return () => {
      dispose?.()
    }
  }, [txid])
}

export const useOnPastelIdConfirmedChange = (handler: () => void): void => {
  const isConfirmed = useOnboardingStore(store => store.pastelId?.isConfirmed)

  useEffect(() => {
    if (isConfirmed) {
      handler()
    }
  }, [isConfirmed])
}
