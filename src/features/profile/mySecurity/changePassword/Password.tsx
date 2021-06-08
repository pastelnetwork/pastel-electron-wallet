import React, { useState, useEffect } from 'react'

import Button from '../components/Button/Button'
import Password from '../components/Password/Password'
import Card from '../components/Card/Card'

const ChangePassword = (): JSX.Element => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [noMatch, setNoMatch] = useState(false)

  const submitPassword = () => {
    setNoMatch(newPassword !== confirmPassword)
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
        <a
          href='https://www.lastpass.com/'
          target='_blank'
          className='underline text-blue-3f'
        >
          LastPass
        </a>
        <span> or </span>
        <a
          href='https://1password.com/'
          target='_blank'
          className='underline text-blue-3f'
        >
          1Password
        </a>
        <span>.</span>
      </div>
    </>
  )

  const footer = <Button onClick={submitPassword}>Submit new password</Button>

  return (
    <Card
      title='Change password'
      description='Must contain at least 1 letter, 1 number and 1 symbol. Minimum length is 12 characters.'
      content={content}
      footer={footer}
    />
  )
}

export default ChangePassword
