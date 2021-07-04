import { useState } from 'react'
import tmpImage from 'common/assets/images/img-astronaut.png'

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

export type TCrop = {
  x: number
  y: number
  width: number
  height: number
}

export type TImageOrientation = 'portrait' | 'landscape'

const maxWidthByOrientation: Record<TImageOrientation, number> = {
  portrait: 320,
  landscape: 463,
}

export type TImage = {
  url: string
  width: number
  height: number
  maxWidth: number
}

export type TAddNFTState = {
  step: Step
  stepsCount: number
  nftData?: TNFTData
  image?: TImage
  crop?: TCrop
  setStep(step: Step): void
  setNftData(data: TNFTData): void
  setCrop(crop: TCrop): void
  setImage(file: { url: string; width: number; height: number }): void
  goBack(): void
  goToNextStep(): void
}

export type TUseAddNFTProps = {
  onClose(): void
}

export const useAddNFTState = ({ onClose }: TUseAddNFTProps): TAddNFTState => {
  const [step, setStep] = useState<Step>(Step.preview)
  const [nftData, setNftData] = useState<TNFTData>()
  const [crop, setCrop] = useState<TCrop>()
  const [image, setImage] = useState<TImage>({
    url: tmpImage,
    width: 770,
    height: 770,
    maxWidth: maxWidthByOrientation.portrait,
  })

  return {
    step,
    stepsCount,
    nftData,
    setNftData,
    image,
    crop,
    setStep,
    setCrop,
    setImage({ url, width, height }) {
      const orientation = width < height ? 'portrait' : 'landscape'
      setImage({
        url,
        width,
        height,
        maxWidth: maxWidthByOrientation[orientation],
      })
    },
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
