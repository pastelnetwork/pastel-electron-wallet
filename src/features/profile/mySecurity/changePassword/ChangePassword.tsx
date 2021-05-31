import React from 'react'

import Password from '../../../../common/components/MySecurity/Password/Password'
import {
  Title,
  Description,
  Hint,
} from '../../../../common/components/MySecurity/Typography/Typography'
import Button from '../../../../common/components/MySecurity/Button/Button'

import { DescriptionContainer, BodyContainer } from '../MySecurity.style'

const ChangePassword: React.FC = () => {
  const [newPassword, setNewPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [noMatch, setNoMatch] = React.useState(false)

  const submitPassword = () => {
    if (newPassword !== confirmPassword) {
      setNoMatch(true)
    }
  }

  React.useEffect(() => {
    if (newPassword === confirmPassword && !newPassword && !confirmPassword) {
      setNoMatch(false)
    }
  }, [newPassword, confirmPassword, setNoMatch])

  return (
    <>
      <Title>Change password</Title>
      <DescriptionContainer>
        <Description>
          Contain at least 1 letter, 1 number and 1 symbol. Minimum length is 12
          characters
        </Description>
      </DescriptionContainer>
      <BodyContainer>
        <Password
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          setNewPassword={setNewPassword}
          setConfirmPassword={setConfirmPassword}
        />
        {noMatch && <Hint color='text-loader-red'>No Match</Hint>}
        <Hint>
          We strongly suggest that you save your password in a password manager
          such as LastPase or 1Password (the underlined parts should be
          clickable links that open a web browser to the sites for these
          products)
        </Hint>
      </BodyContainer>
      <Button onClick={submitPassword}>Submit new password</Button>
    </>
  )
}

export default ChangePassword
