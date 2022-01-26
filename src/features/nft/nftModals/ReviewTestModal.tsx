import React from 'react'
import parse from 'html-react-parser'

import { Modal } from 'common/components/Modal'
import Progressbar from 'common/components/Progressbar'
import { translate } from 'features/app/translations'

export type TReviewTestModal = {
  content?: string
  isOpen: boolean
  handleClose?: () => void
}

function ReviewTestModal({
  isOpen,
  handleClose,
}: TReviewTestModal): JSX.Element {
  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      className='w-[416px] px-10'
    >
      <div className='text-gray-2d text-22px font-extrabold mr-8 mb-[26px]'>
        {parse(
          translate('reviewTestContent', { title: 'Diamonds in the sky' }),
        )}
      </div>
      <Progressbar width={336} percent={59} />
      <div className='text-center text-gray-71 font-normal text-sm mt-[14px]'>
        {translate('waitReview')}
      </div>
    </Modal>
  )
}

export default ReviewTestModal
