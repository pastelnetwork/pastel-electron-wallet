import React, { useState, useEffect } from 'react'

import Card from '../../../../common/components/MySecurity/Card'
import Button from '../../../../common/components/MySecurity/Button/Button'
import Password from '../../../../common/components/MySecurity/Password/Password'
import { Hint } from '../../../../common/components/MySecurity/Typography/Typography'

const ChangePassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [noMatch, setNoMatch] = useState(false)

  const submitPassword = () => {
    if (newPassword !== confirmPassword) {
      setNoMatch(true)
    }
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
      />
      {noMatch && <Hint color='text-loader-red'>No Match</Hint>}
      <Hint>
        We strongly suggest that you save your password in a password manager
        such as LastPase or 1Password
      </Hint>
    </>
  )

  const footer = <Button onClick={submitPassword}>Submit new password</Button>

  return (
    <Card
      title='Change password'
      description='Contain at least 1 letter, 1 number and 1 symbol. Minimum length is 12 characters'
      content={content}
      footer={footer}
    />
  )
}

export default ChangePassword
