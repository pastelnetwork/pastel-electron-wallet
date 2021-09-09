import {
  createNewPastelID,
  PASTELID_MIN_CONFIRMATIONS,
  TPastelIdWithTxIdAndConfirmed,
  transactionRPC,
  useFirstIdPastelWithTxIdConfirmed,
} from '../../api/pastel-rpc'
import history from '../../common/utils/history'
import { ROUTES } from '../../common/constants/routes'
import {
  useOnboardingStore,
  useOnPastelIdConfirmedChange,
  useOnPastelIdTxIdChange,
} from './Onboarding.store'
import { useMutation, UseMutationResult } from 'react-query'

const CHECK_PASTELID_CONFIRMATIONS_INTERVAL = 1000

export const useInitializeOnboarding = (): { isLoadingPastelId: boolean } => {
  const setPastelId = useOnboardingStore(store => store.setPastelId)
  const setPastelIdLoadingError = useOnboardingStore(
    store => store.setPastelIdLoadingError,
  )
  const setPastelIdConfirmed = useOnboardingStore(
    store => store.setIsPastelIdConfirmed,
  )

  const { isLoading: isLoadingPastelId } = useFirstIdPastelWithTxIdConfirmed({
    onSuccess(pastelId) {
      setPastelId(pastelId)
      history.push(pastelId?.isConfirmed ? ROUTES.LOGIN : ROUTES.WELCOME_PAGE)
    },
    onError: setPastelIdLoadingError,
  })

  useOnPastelIdTxIdChange(txid => {
    const interval = setInterval(async () => {
      const transaction = await transactionRPC.getTransaction(txid)
      if (transaction.confirmations >= PASTELID_MIN_CONFIRMATIONS) {
        setPastelIdConfirmed(true)
        clearInterval(interval)
      }
    }, CHECK_PASTELID_CONFIRMATIONS_INTERVAL)

    return () => clearInterval(interval)
  })

  useOnPastelIdConfirmedChange(() => {
    history.push(ROUTES.DASHBOARD)
  })

  return { isLoadingPastelId }
}

type TCreatePastelIdQuery = UseMutationResult<
  TPastelIdWithTxIdAndConfirmed,
  Error,
  {
    password: string
    address: string
  }
>

export const useCreatePastelId = (): TCreatePastelIdQuery => {
  const setPastelId = useOnboardingStore(store => store.setPastelId)

  return useMutation(
    async ({ password, address }) => {
      const result = await createNewPastelID(password, address)
      return { ...result, isConfirmed: false }
    },
    {
      onSuccess: setPastelId,
    },
  )
}
