import { Congratulation } from 'common/components/Icons/Congratulation'
import React from 'react'
// Components
import { Modal } from 'common/components/Modal'

export type TDealApprovedModal = {
  content?: string
  isOpen: boolean
  handleClose?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const DealApprovedModal = ({
  content,
  isOpen,
  handleClose,
}: TDealApprovedModal): JSX.Element => {
  return (
    <Modal isOpen={isOpen} handleClose={handleClose} className='max-w-md'>
      <div className='text-center'>
        <div className='flex justify-center'>
          <div className='w-[50px] h-[50px] bg-blue-e7 flex items-center justify-center rounded-full'>
            <Congratulation size={24} className='text-gray-2d' />
          </div>
        </div>

        <h2 className='mb-2 text-gray-2d'>
          Congratulations! <br /> Your NFT Trade was Finalized!
        </h2>
        <p className='text-gray-71 text-lg'>{content}</p>
      </div>
    </Modal>
  )
}

export default DealApprovedModal
