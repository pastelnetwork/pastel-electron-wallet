import React from 'react'
// Components
import Modal from '../../../common/components/Modal'
import Button from '../../../common/components/Button'
import Select from '../../../common/components/Select/Select'
import ButtonAdd from '../../../common/components/ButtonAdd'

export interface ReassignTagModalProps {
  isOpen: boolean
  handleClose: React.MouseEventHandler<Element>
}

const ReassignTagModal: React.FC<ReassignTagModalProps> = ({
  isOpen,
  handleClose,
}) => {
  return (
    <Modal isOpen={isOpen} handleClose={handleClose} size='xl'>
      <h2 className='mb-6'>Change tag of “Diamonds in the sky”</h2>
      <div className='flex items-center mb-6'>
        <Select
          placeholder='No tag chosen'
          options={[
            { value: 'option 1', label: 'Option 1' },
            { value: 'option 2', label: 'Option 2' },
            { value: 'option 3', label: 'Option 3' },
            { value: 'option 4', label: 'Option 4' },
            { value: 'option 5', label: 'Option 5' },
          ]}
          className='mr-4 flex-1'
        />
        <ButtonAdd />
      </div>
      <Button variant='default' className='w-full'>
        Submit
      </Button>
    </Modal>
  )
}

export default ReassignTagModal
