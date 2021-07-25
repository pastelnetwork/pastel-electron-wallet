import React from 'react'
// Components
import { Modal } from 'common/components/Modal'
import { Button } from 'common/components/Buttons'
import { InputPassword } from 'common/components/Inputs'

export type TSecurityPasswordModal = {
  isOpen: boolean
  handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const SecurityPasswordModal = ({
  isOpen,
  handleClose,
}: TSecurityPasswordModal): JSX.Element => {
  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      className='max-w-lg'
      overlayClassName='bg-background-modal bg-opacity-60'
    >
      <h2 className='mb-2'>Re-enter your password</h2>
      <span className='text-gray-77 inline-block mb-4 text-h4'>
        To get access to security settings
      </span>
      <div className='mb-[26px]'>
        <InputPassword
          labelClassName='text-gray-71 font-medium text-lg mb-1.5'
          label='Your Password'
        />
      </div>
      <Button variant='default' onClick={handleClose} className='w-full'>
        Confirm
      </Button>
    </Modal>
  )
}

export default SecurityPasswordModal
