import { useEffect, useState } from 'react'
import { useMutation, UseMutationResult } from 'react-query'
import { TRegisterPastelID } from '../../pastelID'
import { createNewPastelID, transactionRPC } from '../../../api/pastel-rpc'

export enum Steps {
  Login = 1,
  Payment,
  Fee,
  Backup,
  ProcessingFee,
}

export enum BackupMethods {
  PDF,
  QR,
}

export enum PaymentMethods {
  CentralizedExchange,
  DecentralizedExchange,
  PslAddress,
  AirdropPromoCode,
  PastelPromoCode,
}

export type TCentralizedExchangeEntity = {
  name: string
}

const firstStep = Steps.Login
const lastStep = Steps.Backup
const stepsCount = Steps.Backup

export type TRegisterData = {
  username: string
  password: string
  paymentMethod: PaymentMethods
  promoCode: string
  exchangeAddress: string
}

type TCreatePastelIdQuery = UseMutationResult<
  TRegisterPastelID,
  Error,
  TCreatePastelIDVariables
>

export type TRegisterState = {
  step: Steps
  setStep(step: Steps): void
  stepsCount: number
  username: string
  setUsername(val: string): void
  password: string
  setPassword(val: string): void
  showPassword: boolean
  setShowPassword(val: boolean): void
  termsAgreed: boolean
  setTermsAgreed(val: boolean): void
  backupMethod: BackupMethods
  setBackupMethod(val: BackupMethods): void
  paymentMethod: PaymentMethods
  setPaymentMethod(val: PaymentMethods): void
  centralizedExchangeName: string | null
  setCentralizedExchangeName(val: string | null): void
  promoCode: string
  setPromoCode(val: string): void
  pastelPromoCode: string
  setPastelPromoCode(val: string): void
  exchangeAddress: string
  setExchangeAddress(val: string): void
  createPastelIdQuery: TCreatePastelIdQuery
  isPastelIdConfirmed: boolean
  goBack(): void
  goToNextStep(): void
}

export const useRegisterState = (): TRegisterState => {
  const [step, setStep] = useState<Steps>(Steps.Login)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [termsAgreed, setTermsAgreed] = useState<boolean>(false)
  const [backupMethod, setBackupMethod] = useState<BackupMethods>(
    BackupMethods.PDF,
  )
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>(
    PaymentMethods.CentralizedExchange,
  )
  const [centralizedExchangeName, setCentralizedExchangeName] = useState<
    string | null
  >(null)
  const [promoCode, setPromoCode] = useState<string>('')
  const [pastelPromoCode, setPastelPromoCode] = useState<string>('')
  const [exchangeAddress, setExchangeAddress] = useState<string>('')
  const [isPastelIdConfirmed, setPastelIdConfirmed] = useState(false)
  const createPastelIdQuery = useCreatePastelID({
    setStep,
    setPastelIdConfirmed,
  })

  return {
    stepsCount,
    step,
    setStep,
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    termsAgreed,
    setTermsAgreed,
    backupMethod,
    setBackupMethod,
    paymentMethod,
    setPaymentMethod,
    centralizedExchangeName,
    setCentralizedExchangeName,
    promoCode,
    setPromoCode,
    pastelPromoCode,
    setPastelPromoCode,
    exchangeAddress,
    setExchangeAddress,
    createPastelIdQuery,
    isPastelIdConfirmed,

    goBack() {
      if (step > firstStep) {
        setStep(step - 1)
      }
    },
    goToNextStep() {
      if (step < lastStep) {
        setStep(step + 1)
      }
    },
  }
}

const CHECK_PASTELID_CONFIRMATIONS_INTERVAL = 1000
const PASTELID_MIN_CONFIRMATIONS = 1

type TCreatePastelIDVariables = {
  password: string
  address: string
}

const useCreatePastelID = ({
  setStep,
  setPastelIdConfirmed,
}: {
  setStep(step: Steps): void
  setPastelIdConfirmed(value: boolean): void
}): TCreatePastelIdQuery => {
  const query: TCreatePastelIdQuery = useMutation(
    ({ password, address }: TCreatePastelIDVariables) =>
      createNewPastelID(password, address),
  )

  useEffect(() => {
    if (query.status === 'success') {
      setStep(Steps.ProcessingFee)
    }
  }, [query.status])

  useWaitForConfirmations({ data: query.data, setPastelIdConfirmed })

  return query
}

const useWaitForConfirmations = ({
  data,
  setPastelIdConfirmed,
}: {
  data?: { txid: string }
  setPastelIdConfirmed(value: boolean): void
}) => {
  useEffect(() => {
    if (!data) {
      return
    }

    const { txid } = data

    const interval = setInterval(async () => {
      const transaction = await transactionRPC.getTransaction(txid)
      if (transaction.confirmations >= PASTELID_MIN_CONFIRMATIONS) {
        setPastelIdConfirmed(true)
        clearInterval(interval)
      }
    }, CHECK_PASTELID_CONFIRMATIONS_INTERVAL)

    return () => clearInterval(interval)
  }, [data])
}
