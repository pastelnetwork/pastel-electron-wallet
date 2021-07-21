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
  optimizedUrl?: string
  displayUrl: string
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
  qualityPercent: number
  isLossLess: boolean
  optimizedSizeKb?: number
  estimatedFee: number | undefined
  setStep(step: Step): void
  setNftData(data: TNFTData): void
  setCrop(crop: TCrop): void
  setImage(file: {
    url: string
    file: File
    width: number
    height: number
  }): void
  setOptimizedImageURL(url: string): void
  goBack(): void
  goToNextStep(): void
  setQualityPercent(value: number): void
  setIsLossLess(value: boolean): void
  setEstimatedFee(value: number | undefined): void
  setOptimizedSizeKb(value?: number): void
}

export type TUseAddNFTProps = {
  onClose(): void
}

export const useAddNFTState = ({ onClose }: TUseAddNFTProps): TAddNFTState => {
  const [step, setStep] = useState<Step>(Step.inputData)
  const [nftData, setNftData] = useState<TNFTData>()
  const [crop, setCrop] = useState<TCrop>()
  const [image, setImage] = useState<TImage>()
  const [qualityPercent, setQualityPercent] = useState(100)
  const [isLossLess, setIsLossLess] = useState(false)
  const [estimatedFee, setEstimatedFee] = useState<number>()
  const [optimizedSizeKb, setOptimizedSizeKb] = useState<number | undefined>()

  const updateDisplayUrl = (
    quality: number,
    isLossLess: boolean,
    optimizedUrl?: string,
  ) => {
    const lossLess = quality === 100 || isLossLess

    setImage(
      image =>
        image && {
          ...image,
          displayUrl: lossLess ? image.url : optimizedUrl || image.url,
        },
    )
  }

  return {
    step,
    stepsCount,
    nftData,
    setNftData,
    image,
    crop,
    qualityPercent,
    isLossLess,
    optimizedSizeKb,
    estimatedFee,
    setStep,
    setCrop,
    setOptimizedSizeKb,
    setEstimatedFee,
    setQualityPercent(qualityPercent) {
      setQualityPercent(qualityPercent)
      updateDisplayUrl(qualityPercent, isLossLess, image?.optimizedUrl)
    },
    setIsLossLess(isLossLess) {
      setIsLossLess(isLossLess)
      updateDisplayUrl(qualityPercent, isLossLess, image?.optimizedUrl)
    },
    setImage(params: {
      url: string
      width: number
      height: number
      file: File
    }) {
      const { url, width, height, file } = params
      const orientation = width < height ? 'portrait' : 'landscape'
      setImage({
        url,
        displayUrl: url,
        width,
        height,
        maxWidth: maxWidthByOrientation[orientation],
        file,
      })
    },
    setOptimizedImageURL(url: string | undefined) {
      setImage(image => image && { ...image, optimizedUrl: url })
      updateDisplayUrl(qualityPercent, isLossLess, url)
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
