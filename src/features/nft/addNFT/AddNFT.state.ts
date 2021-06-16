import { useState } from 'react'
import tmpImage from 'common/assets/images/mock/add-nft-image.png'

export enum Step {
  upload,
  afterUpload,
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
  image?: string
  crop?: Crop
  setStep(step: Step): void
  setCrop(crop: Crop): void
  setImage(image: string): void
  goBack(): void
  goToNextStep(): void
}

export type TUseAddNFTProps = {
  onClose(): void
}

export const useAddNFTState = ({ onClose }: TUseAddNFTProps): TAddNFTState => {
  const [step, setStep] = useState<Step>(Step.approved)
  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0, width: 0, height: 0 })
  const [image, setImage] = useState<string>(tmpImage)

  return {
    step,
    stepsCount,
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
