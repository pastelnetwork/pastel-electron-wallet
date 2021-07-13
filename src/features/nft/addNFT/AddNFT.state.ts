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
  file: File
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
  optimizeImageToKb: number
  estimatedFee: number
  setStep(step: Step): void
  setNftData(data: TNFTData): void
  setCrop(crop: TCrop): void
  setImage(file: { url: string; width: number; height: number }): void
  goBack(): void
  goToNextStep(): void
  setOptimizeImageToKb(val: number): void
  setEstimatedFee(val: number): void
}

export type TUseAddNFTProps = {
  onClose(): void
}

export const useAddNFTState = ({ onClose }: TUseAddNFTProps): TAddNFTState => {
  const [step, setStep] = useState<Step>(Step.inputData)
  const [nftData, setNftData] = useState<TNFTData>()
  const [crop, setCrop] = useState<TCrop>()
  const [image, setImage] = useState<TImage>()
  const [optimizeImageToKb, setOptimizeImageToKb] = useState<number>(0)
  const [estimatedFee, setEstimatedFee] = useState<number>(1)

  return {
    step,
    stepsCount,
    nftData,
    setNftData,
    image,
    crop,
    optimizeImageToKb,
    estimatedFee,
    setStep,
    setCrop,
    setImage(params: TImage) {
      const { url, width, height, file } = params
      const orientation = width < height ? 'portrait' : 'landscape'
      setImage({
        url,
        width,
        height,
        maxWidth: maxWidthByOrientation[orientation],
        file,
      })
      setOptimizeImageToKb(Math.round(file.size / 1024))
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
    setOptimizeImageToKb,
    setEstimatedFee,
  }
}
