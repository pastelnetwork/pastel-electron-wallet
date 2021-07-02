import { useState } from 'react'

export enum Step {
  inputData,
  upload,
  afterUpload,
  preview,
  submit,
  approved,
}

const firstStep = Step.inputData
const lastStep = Step.approved
const stepsCount = lastStep + 1

export type TNFTData = {
  title: string
  hashtags: string[]
  series?: string
  copies: number
  royalty: number
  website?: string
  video?: string
  green: boolean
  description?: string
}

export type Crop = {
  x: number
  y: number
  width: number
  height: number
}

export type TAddNFTState = {
  step: Step
  stepsCount: number
  nftData?: TNFTData
  image?: string
  crop?: Crop
  setStep(step: Step): void
  setNftData(data: TNFTData): void
  setCrop(crop: Crop): void
  setImage(image: string): void
  goBack(): void
  goToNextStep(): void
}

export type TUseAddNFTProps = {
  onClose(): void
}

export const useAddNFTState = ({ onClose }: TUseAddNFTProps): TAddNFTState => {
  const [step, setStep] = useState<Step>(Step.inputData)
  const [nftData, setNftData] = useState<TNFTData>()
  const [crop, setCrop] = useState<Crop>()
  const [image, setImage] = useState<string>()

  return {
    step,
    stepsCount,
    nftData,
    setNftData,
    image,
    crop,
    setStep,
    setCrop,
    setImage,
    goBack() {
      if (step > firstStep) {
        setStep(step - 1)
      } else {
        onClose()
      }
    },
    goToNextStep() {
      if (step < lastStep) {
        setStep(step + 1)
      } else {
        onClose()
      }
    },
  }
}
