import React from 'react'
import { TAddNFTState, TImage } from '../AddNFT.state'
import { useImagePreview } from './PreviewStep.service'
import { useToggle } from 'react-use'
import Cropping from './Cropping'
import FullScreenImage from 'common/components/FullScreenImage/FullScreenImage'
import PreviewStepModal from './PreviewStepModal'

type TPreviewStepProps = {
  state: TAddNFTState
  image: TImage
}

export default function PreviewStep({
  state,
  image,
}: TPreviewStepProps): JSX.Element {
  const [croppedImage, setCroppedImage] = useImagePreview({ image })
  const [cropping, toggleCropping] = useToggle(false)
  const [fullScreen, toggleFullScreen] = useToggle(false)

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
      <FullScreenImage image={image.displayUrl} onClose={toggleFullScreen} />
    )
  }

  return (
    <PreviewStepModal
      state={state}
      image={image}
      croppedImage={croppedImage}
      toggleCropping={toggleCropping}
      toggleFullScreen={toggleFullScreen}
    />
  )
}
