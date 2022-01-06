import { useState } from 'react'
import {
  TImageOptimizationService,
  useImageOptimizationService,
} from './imageOptimization/ImageOptimization.service'
import { TImageType } from './AddNft.constants'

export enum Step {
  inputData,
  select,
  afterSelect,
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

export type TImage = {
  type: TImageType
  name: string
  size: number
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
  isImageCrop?: boolean
  isLossLess: boolean
  estimatedFee: number | undefined
  optimizationService: TImageOptimizationService
  thumbnail: string
  setStep(step: Step): void
  setNftData(data: TNFTData): void
  setCrop(crop: TCrop): void
  setImageCrop(status: boolean): void
  setImage(image: TImage): void
  goBack(): void
  goToNextStep(): void
  setIsLossLess(value: boolean): void
  setEstimatedFee(value: number | undefined): void
  setThumbnail(val: string): void
  percentage: number
  setPercentage(val: number): void
}

export type TUseAddNFTProps = {
  onClose(): void
}

export const useAddNFTState = ({ onClose }: TUseAddNFTProps): TAddNFTState => {
  const [step, setStep] = useState<Step>(Step.inputData)
  const [nftData, setNftData] = useState<TNFTData>()
  const [crop, setCrop] = useState<TCrop>()
  const [isImageCrop, setImageCrop] = useState<boolean>(false)
  const [image, setImage] = useState<TImage>()
  const [isLossLess, setIsLossLess] = useState(true)
  const [estimatedFee, setEstimatedFee] = useState<number>()
  const [thumbnail, setThumbnail] = useState<string>('')
  const [percentage, setPercentage] = useState<number>(0)
  const optimizationService = useImageOptimizationService()
  const vStep: number = step || 0
  return {
    step,
    stepsCount,
    nftData,
    setNftData,
    image,
    setImage,
    crop,
    isImageCrop,
    thumbnail,
    setThumbnail,
    isLossLess,
    estimatedFee,
    setStep,
    setCrop,
    setImageCrop,
    setEstimatedFee,
    optimizationService,
    setIsLossLess,
    goBack() {
      if (step > firstStep) {
        setStep(vStep - 1)
      } else {
        onClose()
      }
    },
    goToNextStep() {
      if (step < lastStep) {
        setStep(vStep + 1)
      } else {
        onClose()
      }
    },
    percentage,
    setPercentage,
  }
}
