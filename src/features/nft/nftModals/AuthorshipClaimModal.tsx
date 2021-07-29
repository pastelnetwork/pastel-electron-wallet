import React, { useState } from 'react'
import Modal from './modal'
import Button from 'common/components/Buttons/Button'

export type TAuthorshipClaimModal = {
  isOpen: boolean
  handleClose: () => void
}

const AuthorshipClaimModal = ({
  isOpen,
  handleClose,
}: TAuthorshipClaimModal): JSX.Element => {
  const data = {
    nftName: 'i.e banksy168',
    pastelId: 'i.e banksy168',
  }
  const [text, setText] = useState('')

  return (
    <Modal
      isOpen={isOpen}
      handleClose={() => handleClose()}
      size='690px'
      title={'Claim Petition'}
      titleClassName='font-extrabold text-3xl text-gray-2d'
      infoIcon={true}
    >
      <div className='md:w-[610px]'>
        <div className='flex space-x-50px text-base font-medium'>
          <div className='w-1/2'>
            <div className='mt-[6px] text-gray-71 leading-tight'>NFT name</div>
            <div className='mt-2'>{data.nftName}</div>
          </div>
          <div className='w-1/2'>
            <div className='mt-[6px] text-gray-71 leading-tight'>
              Current author’s PastelID
            </div>
            <div className='mt-2'>{data.pastelId}</div>
          </div>
        </div>
        <div>
          <div className='mt-30px text-gray-71 leading-tight text-base font-medium'>
            Claim Details
          </div>
          <div className='mt-[9px] h-[173px] border rounded border-gray-e7 flex items-center relative'>
            <div className='absolute bottom-2 right-2 text-gray-a0 text-sm'>
              {200 - text.length}/200
            </div>
            <textarea
              className='w-full h-full py-2 border-none rounded outline-none text-gray-a0 px-4 resize-none'
              value={text}
              onChange={e => setText(e.target.value)}
              maxLength={200}
            />
          </div>
        </div>
        <Button variant='default' className='w-full mt-[30px] mb-2'>
          <div className='flex items-center justify-center ml-6'>
            <span className='font-bold'>Ok</span>
          </div>
        </Button>
      </div>
    </Modal>
  )
}

export default AuthorshipClaimModal
