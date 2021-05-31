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

  return (
    <>
      <Title>Change password</Title>
      <DescriptionContainer>
        <Description>
          Contain at least 1 letter, 1 number and 1 symbol. Minimum lenght is 12
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

        <Hint>
          We strinhly suggest tath you save your password in a password manager
          such as LastPase or 1Password (the underlined parts should be
          clickable links that open a web browser to the sites for these
          products)
        </Hint>
      </BodyContainer>
      <Button>Submit new password</Button>
    </>
  )
}

export default ChangePassword
