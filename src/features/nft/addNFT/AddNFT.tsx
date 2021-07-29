import React from 'react'
import {
  TNFTData,
  Step,
  TUseAddNFTProps,
  useAddNFTState,
  TImage,
} from './AddNFT.state'
import Modal from 'common/components/AnimatedModal'
import SelectImageStep from './selectImageStep/SelectImageStep'
import AfterUploadStep from './afterSelectStep/AfterSelectStep'
import PreviewStep from './previewStep/PreviewStep'
import SubmitStep from './submitStep/SubmitStep'
import ApprovedStep from './approvedStep/ApprovedStep'
import InputNFTDataStep from './inputNFTDataStep/InputNFTDataStep'
import { useToggle } from 'react-use'

export type TAddNFTProps = { open: boolean } & TUseAddNFTProps

export default function AddNFT({ open, ...props }: TAddNFTProps): JSX.Element {
  const [showCloseButton, toggleCloseButton] = useToggle(true)

  return (
    <Modal
      open={open}
      onClose={props.onClose}
      closeButton={showCloseButton}
      render={() => (
        <AddNFTContent {...props} toggleCloseButton={toggleCloseButton} />
      )}
    />
  )
}

const AddNFTContent = (
  props: TUseAddNFTProps & { toggleCloseButton(): void },
) => {
  const state = useAddNFTState(props)
  const { step } = state

  if (step === Step.inputData) {
    return <InputNFTDataStep state={state} />
  } else if (step === Step.select) {
    return <SelectImageStep state={state} />
  }

  const image = state.image as TImage
  const nftData = state.nftData as TNFTData

  const { selectedFile } = state.optimizationState
  const displayUrl =
    state.isLossLess || !selectedFile ? image.url : selectedFile.fileUrl

  if (step === Step.afterSelect) {
    return (
      <AfterUploadStep state={state} image={image} displayUrl={displayUrl} />
    )
  } else if (step === Step.preview && state.image) {
    return (
      <PreviewStep
        state={state}
        image={image}
        displayUrl={displayUrl}
        toggleCloseButton={props.toggleCloseButton}
      />
    )
  }

  if (step === Step.submit) {
    return (
      <SubmitStep
        state={state}
        image={image}
        displayUrl={displayUrl}
        nftData={nftData}
        toggleCloseButton={props.toggleCloseButton}
      />
    )
  } else if (step === Step.approved) {
    return (
      <ApprovedStep
        state={state}
        image={image}
        displayUrl={displayUrl}
        nftData={nftData}
      />
    )
  }

  return null
}
