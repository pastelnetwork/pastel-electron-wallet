import { useMutation } from 'react-query'
import shallow from 'zustand/shallow'
import { UseStore } from 'zustand'
import { useEffect, useMemo } from 'react'

import {
  createNewPastelID,
  PASTELID_MIN_CONFIRMATIONS,
  TPastelIdWithTxIdAndConfirmed,
  transactionRPC,
} from '../../../api/pastel-rpc'
import { walletNodeApi } from 'api/walletNode/walletNode.api'
import {
  createRegisterStore,
  Steps,
  TCreatePastelIdQuery,
  TRegisterStore,
} from './Register.store'
import history from '../../../common/utils/history'
import { ROUTES } from '../../../common/constants/routes'
import { writeUsersInfo } from 'common/utils/User'
import { encode } from 'common/utils/encryption'

const CHECK_PASTELID_CONFIRMATIONS_INTERVAL = 1000

const useCheckPastelIdConfirmationsInterval = ({
  step,
  txid,
  onConfirmed,
}: {
  step: Steps
  txid?: string
  onConfirmed(): void
}) => {
  useEffect(() => {
    if (step !== Steps.ProcessingFee || !txid) {
      return
    }

    const interval = setInterval(async () => {
      const transaction = await transactionRPC.getTransaction(txid)
      if (transaction.confirmations >= PASTELID_MIN_CONFIRMATIONS) {
        onConfirmed()
        clearInterval(interval)
      }
    }, CHECK_PASTELID_CONFIRMATIONS_INTERVAL)

    return () => clearInterval(interval)
  }, [step, txid])
}

const useCreatePastelId = (): TCreatePastelIdQuery => {
  return useMutation(async ({ password, address }) =>
    createNewPastelID(password, address),
  )
}

export const useInitializeRegister = ({
  fetchedPastelId,
}: {
  fetchedPastelId?: TPastelIdWithTxIdAndConfirmed
}): UseStore<TRegisterStore> => {
  const createPastelIdQuery = useCreatePastelId()
  const useStore = useMemo(
    () =>
      createRegisterStore({
        createPastelIdQuery,
        step:
          fetchedPastelId?.isConfirmed === false
            ? Steps.ProcessingFee
            : Steps.Login,
      }),
    [],
  )
  const [step, setStep, username, password, setPastelId] = useStore(
    state => [
      state.step,
      state.setStep,
      state.username,
      state.password,
      state.setPastelId,
    ],
    shallow,
  )

  useEffect(() => {
    if (createPastelIdQuery.isSuccess) {
      if (createPastelIdQuery.data?.pastelid) {
        setPastelId(createPastelIdQuery.data.pastelid)
        writeUsersInfo(
          [
            {
              username,
              password: encode(password),
              newPassword: encode(password),
              pastelId: createPastelIdQuery.data.pastelid,
            },
          ],
          true,
        )
        walletNodeApi.userData
          .create({
            artist_pastelid: createPastelIdQuery.data.pastelid,
            artist_pastelid_passphrase: `${password}${username}`,
          })
          .then(() => {
            // noop
          })
          .catch(() => {
            // noop
          })
          .finally(() => {
            // noop
          })
      }
      setStep(Steps.Backup)
    }
  }, [createPastelIdQuery.status])

  useCheckPastelIdConfirmationsInterval({
    step,
    txid: createPastelIdQuery.data?.txid,
    onConfirmed() {
      setStep(Steps.Backup)
    },
  })

  return useStore
}

export const finish = (): void => {
  history.push(ROUTES.LOGIN)
}
