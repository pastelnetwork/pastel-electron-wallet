import createContext from 'zustand/context'
import create, { UseStore } from 'zustand'
import { UseMutationResult } from 'react-query'
import { TRegisterPastelID } from '../../pastelID'

export const targetBalance = 1000

export const {
  Provider: RegisterStoreProvider,
  useStore: useRegisterStore,
} = createContext<TRegisterStore>()

export enum Steps {
  Login = 1,
  Payment,
  Fee,
  Backup,
  ProcessingFee,
}

const firstStep = Steps.Login
const lastStep = Steps.ProcessingFee
export const stepsCount = Steps.Backup

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
export type TRegisterStore = {
  createPastelIdQuery: TCreatePastelIdQuery
  step: Steps
  setStep(step: Steps): void
  username: string
  setUsername(value: string): void
  password: string
  setPassword(value: string): void
  paymentMethod: PaymentMethods
  setPaymentMethod(val: PaymentMethods): void
  centralizedExchangeName: string | null
  setCentralizedExchangeName(val: string | null): void
  promoCode: string
  setPromoCode(val: string): void
  pslAddressPrivateKey: string
  setPSLAddressPrivateKey(val: string): void
  exchangeAddress: string
  setExchangeAddress(val: string): void
  goBack(): void
  goToNextStep(): void
  termsAgreed: boolean
  setTermsAgreed(termsAgreed: boolean): void
  pastelId: string
  setPastelId(pastelId: string): void
}

export type TCreatePastelIdQuery = UseMutationResult<
  TRegisterPastelID,
  Error,
  {
    password: string
    address: string
    username: string
  }
>

export const createRegisterStore = ({
  step,
  createPastelIdQuery,
}: {
  step: Steps
  createPastelIdQuery: TCreatePastelIdQuery
}): UseStore<TRegisterStore> => {
  return create((set, get) => ({
    createPastelIdQuery,
    step,
    setStep: step => set({ step }),
    username: '',
    setUsername: username => set({ username }),
    password: '',
    setPassword: password => set({ password }),
    paymentMethod: PaymentMethods.CentralizedExchange,
    setPaymentMethod: paymentMethod => set({ paymentMethod }),
    centralizedExchangeName: null,
    setCentralizedExchangeName: centralizedExchangeName =>
      set({ centralizedExchangeName }),
    promoCode: '',
    setPromoCode: promoCode => set({ promoCode }),
    pslAddressPrivateKey: '',
    setPSLAddressPrivateKey: pslAddressPrivateKey =>
      set({ pslAddressPrivateKey }),
    exchangeAddress: '',
    setExchangeAddress: exchangeAddress => set({ exchangeAddress }),
    goBack() {
      const step = get().step
      if (step > firstStep) {
        set({ step: step - 1 })
      }
    },
    goToNextStep() {
      const step: number = get().step
      if (step < lastStep) {
        set({ step: step + 1 })
      }
    },
    termsAgreed: false,
    setTermsAgreed: termsAgreed => set({ termsAgreed }),
    pastelId: '',
    setPastelId: pastelId => set({ pastelId }),
  }))
}
