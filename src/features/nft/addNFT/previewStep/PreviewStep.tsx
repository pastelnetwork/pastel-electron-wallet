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
  displayUrl: string
  toggleCloseButton(): void
}

export default function PreviewStep({
  state,
  image,
  displayUrl,
  toggleCloseButton,
}: TPreviewStepProps): JSX.Element {
  const [croppedImage, setCroppedImage] = useImagePreview({ image })
  const [cropping, toggleCropping] = useToggle(false)
  const [fullScreen, toggleFullScreen] = useToggle(false)

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
    return <FullScreenImage image={displayUrl} onClose={onFullScreenToggle} />
  }

  return (
    <PreviewStepModal
      state={state}
      image={image}
      displayUrl={displayUrl}
      croppedImage={croppedImage}
      toggleCropping={onCroppingToggle}
      toggleFullScreen={onFullScreenToggle}
    />
  )
}
