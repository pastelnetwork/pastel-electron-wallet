import React from 'react'
// Components
import Modal from '../../../common/components/Modal'
import Alert from '../../../common/components/Alert'

export interface InReviewModalProps {
  isOpen: boolean
  handleClose: React.MouseEventHandler<Element>
}

const InReviewModal: React.FC<InReviewModalProps> = ({
  isOpen,
  handleClose,
}) => {
  return (
    <Modal isOpen={isOpen} handleClose={handleClose} size='md'>
      <h2 className='mb-6 text-gray-2d'>“Diamonds in the sky” is in review</h2>
      <Alert variant='success'>
        Please wait. Ususally it atkes 5-15 minutes
      </Alert>
    </Modal>
  )
}

export default InReviewModal
