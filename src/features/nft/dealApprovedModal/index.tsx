import React from 'react'
// Components
import Modal from '../../../common/components/Modal'

export interface DealApprovedModalProps {
  isOpen: boolean
  handleClose: React.MouseEventHandler<Element>
}

const DealApprovedModal: React.FC<DealApprovedModalProps> = ({
  isOpen,
  handleClose,
}) => {
  return (
    <Modal isOpen={isOpen} handleClose={handleClose} size='md'>
      <h2 className='mb-6 text-gray-2d'>Congratulations. deal approved!</h2>
      <p className='text-gray-a6'>
        SuperDealer23 has funded 1,000,000k PSL to your address
      </p>
    </Modal>
  )
}

export default DealApprovedModal
