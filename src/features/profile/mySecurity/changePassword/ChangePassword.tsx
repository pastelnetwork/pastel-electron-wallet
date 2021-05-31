import React, { useState } from 'react'

import Input from '../../../../common/components/Input/Input'
import FormLoading from '../../../../common/components/FormLoading/FormLoading'
import Typography from '../../../../common/components/Typography/Typography'
import Button from '../../../../common/components/Button/Button'
import { colors } from '../../../../common/theme/colors'

import * as Styles from './ChangePassword.style'
import { DescriptionContainer, BodyContainer } from '../MySecurity.style'

interface IPassword {
  value: string
  hasError: boolean
}

const initialState = {
  value: '',
  hasError: false,
}

const ChangePassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState<IPassword>(initialState)
  const [confirmPassword, setConfirmPassword] = useState<IPassword>(
    initialState,
  )

  return (
    <>
      <Typography variant='h3' weight={800} lineHeight={40}>
        Change password
      </Typography>
      <DescriptionContainer>
        <Typography
          color={colors.text.secondary}
          lineHeight={26}
          variant='body2'
          weight={500}
        >
          Contain at least 1 letter, 1 number and 1 symbol. Minimum lenght is 12
          characters
        </Typography>
      </DescriptionContainer>
      <BodyContainer>
        <Input
          type='password'
          label='New password'
          value={newPassword.value}
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setNewPassword({
              ...newPassword,
              value: event.currentTarget.value,
            })
          }
          ref={null}
          errorMessage={
            newPassword.hasError ? 'Please enter a valid password' : null
          }
        />
        <Input
          type='password'
          label='Confirm password'
          value={confirmPassword.value}
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setConfirmPassword({
              ...confirmPassword,
              value: event.currentTarget.value,
            })
          }
          ref={null}
          errorMessage={
            confirmPassword.hasError ? 'Please enter a valid password' : null
          }
          style={{ marginTop: 6 }}
        />
        <Styles.LoadingContainer>
          <FormLoading background={colors.loader.red} />
          <FormLoading background={colors.loader.default} />
          <FormLoading background={colors.loader.default} />
          <FormLoading background={colors.loader.default} />
        </Styles.LoadingContainer>

        <Typography
          color={colors.text.secondary}
          lineHeight={22}
          variant='body3'
          weight={500}
        >
          We strinhly suggest tath you save your password in a password manager
          such as LastPase or 1Password (the underlined parts should be
          clickable links that open a web browser to the sites for these
          products)
        </Typography>
      </BodyContainer>
      <Button variant='transparent' style={{ width: '100%' }}>
        Submit new password
      </Button>
    </>
  )
}

export default ChangePassword
