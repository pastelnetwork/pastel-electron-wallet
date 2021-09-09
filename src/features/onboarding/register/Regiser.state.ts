import { useState } from 'react'

export enum Steps {
  Login = 1,
  Payment,
  Fee,
  Backup,
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
