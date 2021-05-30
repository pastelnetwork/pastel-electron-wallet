import React from 'react'
import PropTypes from 'prop-types'
// Components
import Modal from '../../../common/components/modal'
import Button from '../../../common/components/button'
import Select from '../../../common/components/select'
import Input from '../../../common/components/input'
import Link from '../../../common/components/link'

export interface ChangeStatusModalProps {
  isOpen: boolean
  handleClose?: any
  children?: any
}

const ChangeStatusModal: React.FC<ChangeStatusModalProps> = ({
  isOpen,
  handleClose,
}) => {
  return (
    <Modal isOpen={isOpen} handleClose={handleClose} size='lg'>
      <h2 className='mb-6 font-roman'>
        Change status of “Diamonds in the sky”
      </h2>
      <div className='mb-6'>
        <Select
          placeholder='Listed'
          options={[
            { value: 'option 1', label: 'Option 1' },
            { value: 'option 2', label: 'Option 2' },
            { value: 'option 3', label: 'Option 3' },
            { value: 'option 4', label: 'Option 4' },
            { value: 'option 5', label: 'Option 5' },
          ]}
          className='flex-1 mb-6'
        />
        <Select
          placeholder='Buy-it-now'
          options={[
            { value: 'option 1', label: 'Option 1' },
            { value: 'option 2', label: 'Option 2' },
            { value: 'option 3', label: 'Option 3' },
            { value: 'option 4', label: 'Option 4' },
            { value: 'option 5', label: 'Option 5' },
          ]}
          className='flex-1 mb-6'
        />
        <Input type='text' placeholder='Fixed minimum price' className='mb-6' />
        <Link>Change copies pricing plan</Link>
      </div>
      <Button variant='primary' onClick={handleClose} fluid>
        Submit
      </Button>
    </Modal>
  )
}

export default ChangeStatusModal
