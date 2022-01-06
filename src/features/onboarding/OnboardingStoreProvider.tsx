import React, { useCallback } from 'react'

import { TPastelIdWithTxIdAndConfirmed } from 'api/pastel-rpc'
import { useInitializeRegister } from './register/Register.service'
import { RegisterStoreProvider } from './register/Register.store'

type TOnboardingStoreProvider = {
  children: React.ReactNode
  fetchedPastelId?: TPastelIdWithTxIdAndConfirmed
}

export default function OnboardingStoreProvider({
  children,
  fetchedPastelId,
}: TOnboardingStoreProvider): JSX.Element {
  const store = useInitializeRegister({ fetchedPastelId })

  const createStore = useCallback(() => store, [])

  return (
    <RegisterStoreProvider createStore={createStore}>
      {children}
    </RegisterStoreProvider>
  )
}

OnboardingStoreProvider.defaultProps = {
  fetchedPastelId: undefined,
}
