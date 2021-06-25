import { useState } from 'react'
// import * as ROUTES from 'common/utils/constants/routes'

export enum Steps {
  Login = 1,
  Backup,
  Payment,
  Fee,
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
}

const firstStep = Steps.Login
const lastStep = Steps.Fee
const stepsCount = Steps.Fee

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

    goBack() {
      if (step > firstStep) {
        setStep(step - 1)
      }
    },
    goToNextStep() {
      if (step < lastStep) {
        setStep(step + 1)
      } else {
        // save user data here
        // go to ROUTES.REGISTER_PENDING
      }
    },
  }
}
