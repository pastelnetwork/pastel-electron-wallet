import React from 'react'
import { TAddNFTState } from '../AddNFT.state'
import ModalLayout from 'features/nft/addNFT/modalLayout/ModalLayout'
import { ArrowSlim } from 'common/components/Icons/ArrowSlim'

type TSubmitStepProps = {
  state: TAddNFTState
}

export default function SubmitStep({
  state: { goBack, goToNextStep },
}: TSubmitStepProps): JSX.Element {
  return (
    <ModalLayout
      title='Submit NFT'
      titleClass='mb-3'
      subtitle='Description'
      step={4}
      leftColumnContent={null}
      rightColumnContent={
        <div className='flex-between'>
          <button
            type='button'
            className='rounded-full w-10 h-10 flex-center text-gray-b0 border border-gray-b0 transition duration-200 hover:text-gray-a0 hover:border-gray-a0'
            onClick={goBack}
          >
            <ArrowSlim to='left' size={14} />
          </button>
          <button
            type='button'
            className='btn-primary px-3'
            onClick={goToNextStep}
          >
            Submit and proceed to fee payment
          </button>
        </div>
      }
    />
  )
}
