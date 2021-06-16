import { useState } from 'react'
import image from 'common/assets/images/mock/add-nft-image.png'

export enum Step {
  upload,
  preview,
  submit,
  approved,
}

const firstStep = Step.upload
const lastStep = Step.approved
const stepsCount = lastStep + 1

export type Crop = {
  x: number
  y: number
  width: number
  height: number
}

export type TAddNFTState = {
  step: Step
  stepsCount: number
  image: string
  crop?: Crop
  setStep(step: Step): void
  setCrop(crop: Crop): void
  goBack(): void
  goToNextStep(): void
}

export type TUseAddNFTProps = {
  onClose(): void
}

export const useAddNFTState = ({ onClose }: TUseAddNFTProps): TAddNFTState => {
  const [step, setStep] = useState<Step>(Step.preview)
  const [crop, setCrop] = useState<Crop>()

  return {
    step,
    stepsCount,
    image,
    crop,
    setStep,
    setCrop,
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
