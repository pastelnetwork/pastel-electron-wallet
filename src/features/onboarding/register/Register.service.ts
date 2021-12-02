import { useMutation } from 'react-query'
import shallow from 'zustand/shallow'
import { UseStore } from 'zustand'
import { useEffect, useMemo } from 'react'

import {
  createNewPastelID,
  PASTELID_MIN_CONFIRMATIONS,
  TPastelIdWithTxIdAndConfirmed,
  transactionRPC,
  walletRPC,
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
  return useMutation(async ({ password, address, username }) =>
    createNewPastelID(password, address, username),
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

  const addUserInfo = async ({ pastelid }: { pastelid: string }) => {
    const addresses = await walletRPC.fetchAllAddresses()
    await writeUsersInfo(
      [
        {
          username,
          password: encode(password),
          newPassword: encode(password),
          pastelId: pastelid,
          pastelIds: [pastelid],
          addresses,
        },
      ],
      true,
    )
  }

  useEffect(() => {
    const saveData = async () => {
      if (createPastelIdQuery.isSuccess) {
        if (createPastelIdQuery.data?.pastelid) {
          setPastelId(createPastelIdQuery.data.pastelid)
          await addUserInfo({
            pastelid: createPastelIdQuery.data.pastelid,
          })
          const vPassword: string = encode(password) || ''
          const vUsername: string = username || ''
          walletNodeApi.userData.create({
            artist_pastelid: createPastelIdQuery.data.pastelid,
            artist_pastelid_passphrase: `${vPassword}${vUsername}`,
          })
        }
        setStep(Steps.Backup)
      }
    }

    saveData()
      .then(() => {
        // noop
      })
      .catch(() => {
        // noop
      })
      .finally(() => {
        // noop
      })
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
