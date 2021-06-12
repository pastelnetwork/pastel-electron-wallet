import React from 'react'
import { Step, TUseAddNFTProps, useAddNFTState } from './AddNFT.state'
import Modal from 'common/components/AnimatedModal'
import PreviewStep from './previewStep/PreviewStep'
import UploadStep from './uploadStep/UploadStep'
import SubmitStep from './submitStep/SubmitStep'
import ApprovedStep from './approvedStep/ApprovedStep'

export type TAddNFTProps = { open: boolean } & TUseAddNFTProps

export default function AddNFT({ open, ...props }: TAddNFTProps): JSX.Element {
  return <Modal open={open} render={() => <AddNFTContent {...props} />} />
}

const AddNFTContent = (props: TUseAddNFTProps) => {
  const state = useAddNFTState(props)
  const { step } = state

  if (step === Step.upload) {
    return <UploadStep state={state} />
  } else if (step === Step.preview) {
    return <PreviewStep state={state} />
  } else if (step === Step.submit) {
    return <SubmitStep state={state} />
  } else if (step === Step.approved) {
    return <ApprovedStep state={state} />
  }

  return null
}
