import React, { useState, useEffect } from 'react'

import Link from '../../../../common/components/Link'
import { Button } from '../../../../common/components/Buttons'
import Password from '../../components/Password'
import Card from '../../components/Card'
import { SecurityPasswordModal } from '../mySecurityModals'

const ChangePassword = (): JSX.Element => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [noMatch, setNoMatch] = useState(false)
  const [securityPassword, setSecurityPassword] = useState(false)

  const submitPassword = () => {
    setNoMatch(newPassword !== confirmPassword)
    setSecurityPassword(true)
  }

  useEffect(() => {
    if (newPassword === confirmPassword && !newPassword && !confirmPassword) {
      setNoMatch(false)
    }
  }, [newPassword, confirmPassword, setNoMatch])

  const content = (
    <>
      <Password
        newPassword={newPassword}
        confirmPassword={confirmPassword}
        setNewPassword={setNewPassword}
        setConfirmPassword={setConfirmPassword}
        isMatch={!noMatch}
      />
      <div className='text-gray-a0 text-h6 leading-relaxed'>
        {noMatch && <div className='text-red-fe'>Passwords must match</div>}
        <span>
          We strongly suggest that you save your password in a password manager
          such as{' '}
        </span>
        <Link
          href='https://www.lastpass.com/'
          target='_blank'
          className='underline italic'
          variant='gray-a0'
          useATag
        >
          LastPass
        </Link>
        <span> or </span>
        <Link
          href='https://1password.com/'
          target='_blank'
          className='underline italic'
          variant='gray-a0'
          useATag
        >
          1Password
        </Link>
        <span>.</span>
      </div>
    </>
  )

  const footer = (
    <Button
      variant='secondary'
      className='w-full font-extrabold'
      onClick={submitPassword}
    >
      Submit New Password
    </Button>
  )

  return (
    <>
      <Card
        title='Change Password'
        description='Password must contain at least 1 letter, 1 number, and 1 symbol. Minimum length is 12 characters.'
        content={content}
        footer={footer}
      />
      <SecurityPasswordModal
        isOpen={securityPassword}
        handleClose={() => setSecurityPassword(false)}
      ></SecurityPasswordModal>
    </>
  )
}

export default ChangePassword
