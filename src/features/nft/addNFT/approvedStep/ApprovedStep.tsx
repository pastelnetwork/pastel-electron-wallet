import React from 'react'
import { TAddNFTState } from '../AddNFT.state'
import ModalLayout from 'features/nft/addNFT/modalLayout/ModalLayout'
import { Button } from 'common/components/Buttons'

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
        <Button
          type='button'
          className='font-extrabold w-full'
          onClick={goToNextStep}
        >
          Proceed to final registration fee payment
        </Button>
      }
    />
  )
}
