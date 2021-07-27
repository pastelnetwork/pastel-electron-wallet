import React from 'react'
import {
  TNFTData,
  Step,
  TUseAddNFTProps,
  useAddNFTState,
  TImage,
} from './AddNFT.state'
import Modal from 'common/components/AnimatedModal'
import UploadStep from './uploadStep/UploadStep'
import AfterUploadStep from './afterUploadStep/AfterUploadStep'
import PreviewStep from './previewStep/PreviewStep'
import SubmitStep from './submitStep/SubmitStep'
import ApprovedStep from './approvedStep/ApprovedStep'
import InputNFTDataStep from './inputNFTDataStep/InputNFTDataStep'

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
  const { step } = state

  if (step === Step.inputData) {
    return <InputNFTDataStep state={state} />
  } else if (step === Step.upload) {
    return <UploadStep state={state} />
  }

  const image = state.image as TImage
  const nftData = state.nftData as TNFTData

  if (step === Step.afterUpload) {
    return <AfterUploadStep state={state} image={image} />
  } else if (step === Step.preview && state.image) {
    return <PreviewStep state={state} image={image} />
  }

  if (step === Step.submit) {
    return <SubmitStep state={state} image={image} nftData={nftData} />
  } else if (step === Step.approved) {
    return <ApprovedStep state={state} image={image} nftData={nftData} />
  }

  return null
}
