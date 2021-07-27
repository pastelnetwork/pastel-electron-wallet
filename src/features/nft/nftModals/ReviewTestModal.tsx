import React from 'react'

import { Modal } from 'common/components/Modal'
import Progressbar from 'common/components/Progressbar'

export type TReviewTestModal = {
  content?: string
  isOpen: boolean
  handleClose?: () => void
}

const ReviewTestModal = ({
  isOpen,
  handleClose,
}: TReviewTestModal): JSX.Element => {
  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      className='w-[416px] px-10'
    >
      <div className='text-gray-2d text-22px font-extrabold mr-8 mb-[26px]'>
        Your NFT "Diamonds in the sky" is being processed by the Network
      </div>
      <Progressbar width={336} percent={59} />
      <div className='text-center text-gray-71 font-normal text-sm mt-[14px]'>
        Please wait. Usually this takes 5 to 15 minutes
      </div>
    </Modal>
  )
}

export default ReviewTestModal
