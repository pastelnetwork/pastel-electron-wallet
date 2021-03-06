import React from 'react'
// Components
import { Modal } from '../../../common/components/Modal'
import Alert from '../../../common/components/Alert'
import { translate } from 'features/app/translations'

export type TReviewModal = {
  title?: string
  content?: string
  isOpen: boolean
  handleClose?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

function ReviewModal({
  title,
  content,
  isOpen,
  handleClose,
}: TReviewModal): JSX.Element {
  return (
    <Modal isOpen={isOpen} handleClose={handleClose} className='max-w-md'>
      <h2 className='mb-6 text-gray-2d'>
        “{title}” {translate('isInReview')}
      </h2>
      <Alert variant='success'>{content}</Alert>
    </Modal>
  )
}

export default ReviewModal
