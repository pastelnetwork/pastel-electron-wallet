import React from 'react'
// Components
import Modal from '../../../../common/components/Modal'
import { Button } from '../../../../common/components/Buttons'
import { InputPassword } from '../../../../common/components/Inputs'
import Link from '../../../../common/components/Link'

export type TSecurityPasswordModal = {
  isOpen: boolean
  handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const SecurityPasswordModal = ({
  isOpen,
  handleClose,
}: TSecurityPasswordModal): JSX.Element => {
  return (
    <Modal isOpen={isOpen} handleClose={handleClose} size='lg'>
      <h2 className='mb-2'>Re-enter your password</h2>
      <span className='text-gray-77 inline-block mb-4 text-h4'>
        to get access to security settings
      </span>
      <div className='mb-6'>
        <InputPassword label='Your Password' className='mb-4' />
        <div className='flex justify-center'>
          <Link>I&apos;ve forgot my password</Link>
        </div>
      </div>
      <Button variant='default' onClick={handleClose} fluid>
        Confirm
      </Button>
    </Modal>
  )
}

export default SecurityPasswordModal
