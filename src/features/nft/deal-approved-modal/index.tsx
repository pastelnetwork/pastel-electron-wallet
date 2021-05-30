import React from 'react'
// Components
import Modal from '../../../common/components/modal'

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
      <h2 className='mb-6 font-roman'>Congratulations. deal approved!</h2>
      <p className='text-gray-500'>
        SuperDealer23 has funded 1,000,000k PSL to your address
      </p>
    </Modal>
  )
}

export default DealApprovedModal
