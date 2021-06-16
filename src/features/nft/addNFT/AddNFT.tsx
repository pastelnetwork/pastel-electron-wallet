import React from 'react'
import { Step, TUseAddNFTProps, useAddNFTState } from './AddNFT.state'
import Modal from 'common/components/AnimatedModal'
import UploadStep from './uploadStep/UploadStep'
import AfterUploadStep from './afterUploadStep/AfterUploadStep'
import PreviewStep from './previewStep/PreviewStep'
import SubmitStep from './submitStep/SubmitStep'
import ApprovedStep from './approvedStep/ApprovedStep'

export type TAddNFTProps = { open: boolean } & TUseAddNFTProps

export default function AddNFT({ open, ...props }: TAddNFTProps): JSX.Element {
  return (
    <Modal
      open={open}
      onClose={props.onClose}
      closeButton
      render={() => <AddNFTContent {...props} />}
    />
  )
}

const AddNFTContent = (props: TUseAddNFTProps) => {
  const state = useAddNFTState(props)
  const { step, image } = state

  if (step === Step.upload) {
    return <UploadStep state={state} />
  }

  // image is set on upload step
  if (!image) {
    return null
  }

  if (step === Step.afterUpload) {
    return <AfterUploadStep state={state} image={image} />
  } else if (step === Step.preview && state.image) {
    return <PreviewStep state={state} image={state.image} />
  }

  if (step === Step.submit) {
    return <SubmitStep state={state} image={image} />
  } else if (step === Step.approved) {
    return <ApprovedStep state={state} image={image} />
  }

  return null
}
