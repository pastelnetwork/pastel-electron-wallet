import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TStep = 'GeneralInfo' | 'ImageSelection' | 'Optimization' | 'Submission'

export interface IArtRegFormData {
  title: string
  copies: number
  file: string
  category: string
  externalProfile: string
  description: string
  pastelID: string
  address: string
  compensation: number
}

export type IArtRegFormState = IArtRegFormData & {
  step: TStep
}

const initialState: IArtRegFormState = {
  step: 'GeneralInfo',
  title: '',
  copies: 0,
  file: '',
  category: '',
  externalProfile: '',
  description: '',
  pastelID: '',
  address: '',
  compensation: 0,
}

export const artRegFormSlice = createSlice({
  name: 'argRegForm',
  initialState,
  reducers: {
    setStep(state: IArtRegFormState, action: PayloadAction<TStep>) {
      state.step = action.payload
    },
    setFormData(
      state: IArtRegFormState,
      action: PayloadAction<IArtRegFormData>,
    ) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const artRegFormReducer = artRegFormSlice.reducer

export const { setStep, setFormData } = artRegFormSlice.actions
