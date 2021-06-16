import React from 'react'
import { TAddNFTState } from '../AddNFT.state'
import ModalLayout from '../modalLayout/ModalLayout'
import { ArrowSlim } from 'common/components/Icons/ArrowSlim'
import { Button } from 'common/components/Buttons'

type TUploadStepProps = {
  state: TAddNFTState
}

export default function UploadStep({
  state: { goBack, goToNextStep },
}: TUploadStepProps): JSX.Element {
  return (
    <ModalLayout
      title='Upload Image'
      titleClass='mb-3'
      subtitle='Description'
      step={2}
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
          <Button className='font-extrabold px-6' onClick={goToNextStep}>
            Go to Optimization
          </Button>
        </div>
      }
    />
  )
}
