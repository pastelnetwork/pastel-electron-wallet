import React from 'react'
import { TAddNFTState, TImage } from '../AddNFT.state'
import { useFeePerKb, useImagePreview } from './PreviewStep.service'
import { useToggle } from 'react-use'
import Cropping from './Cropping'
import FullScreenImage from 'common/components/FullScreenImage/FullScreenImage'
import PreviewStepModal from './PreviewStepModal'

type TPreviewStepProps = {
  state: TAddNFTState
  image: TImage
  toggleCloseButton(): void
}

export default function PreviewStep({
  state,
  image,
  toggleCloseButton,
}: TPreviewStepProps): JSX.Element {
  const [croppedImage, setCroppedImage] = useImagePreview({ image })
  const [cropping, toggleCropping] = useToggle(false)
  const [fullScreen, toggleFullScreen] = useToggle(false)
  const feePerKb = useFeePerKb()

  const onCroppingToggle = () => {
    toggleCloseButton()
    toggleCropping()
  }

  const onFullScreenToggle = () => {
    toggleCloseButton()
    toggleFullScreen()
  }

  if (cropping && croppedImage) {
    return (
      <Cropping
        image={image}
        croppedImage={croppedImage}
        setCroppedImage={setCroppedImage}
        onClose={toggleCropping}
      />
    )
  }

  if (fullScreen) {
    return (
      <FullScreenImage image={image.displayUrl} onClose={onFullScreenToggle} />
    )
  }

  return (
    <PreviewStepModal
      state={state}
      image={image}
      feePerKb={feePerKb}
      croppedImage={croppedImage}
      toggleCropping={onCroppingToggle}
      toggleFullScreen={onFullScreenToggle}
    />
  )
}
