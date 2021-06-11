import React from 'react'
import { TAddNFTState } from '../AddNFT.state'
import ModalLayout from 'features/nft/addNFT/modalLayout/ModalLayout'

type TApprovedStepProps = {
  state: TAddNFTState
}

export default function ApprovedStep({
  state: { goToNextStep },
}: TApprovedStepProps): JSX.Element {
  return (
    <ModalLayout
      title='NFT approved: “Diamonds in the sky”'
      titleClass='mb-3'
      leftColumnContent={null}
      rightColumnContent={
        <button
          type='button'
          className='btn-primary w-full'
          onClick={goToNextStep}
        >
          Proceed to final registration fee payment
        </button>
      }
    />
  )
}
