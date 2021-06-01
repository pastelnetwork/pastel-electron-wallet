import * as React from 'react'
import { Link } from 'react-router-dom'

import Input from '../../../common/components/Input/Input'
import Button from '../../../common/components/Button/Button'
import FormLoading from '../../../common/components/FormLoading/FormLoading'
import Typography from '../../../common/components/Typography/Typography'
import { colors } from '../../../common/theme/colors'
import * as ROUTES from '../../../common/utils/constants/routes'

import * as Styles from './NewPassword.styles'

interface NewPasswordFormInput {
  value: string
  hasError: boolean
  isTouched: boolean
}

const initialInputState = {
  value: '',
  hasError: false,
  isTouched: false,
}

const NewPassword: React.FC = () => {
  const [newPassword, setNewPassword] = React.useState<NewPasswordFormInput>(
    initialInputState,
  )
  const [
    repeatPassword,
    setRepeatPassword,
  ] = React.useState<NewPasswordFormInput>(initialInputState)

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <Styles.Container>
      <Typography variant='h1' weight={800}>
        Set new password
      </Typography>
      <Typography variant='body1' color={colors.text.secondary}>
        Copy-paste your keys to recover account
      </Typography>
      <Styles.Form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
          handleFormSubmit(event)
        }
      >
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
          hint='at least 8 characters and at least 2 numbers'
        />
        <Styles.LoadingContainer>
          <FormLoading background={colors.loader.red} />
          <FormLoading background={colors.loader.default} />
          <FormLoading background={colors.loader.default} />
          <FormLoading background={colors.loader.default} />
        </Styles.LoadingContainer>
        <Input
          type='password'
          label='Password'
          value={repeatPassword.value}
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setRepeatPassword({
              ...repeatPassword,
              value: event.currentTarget.value,
            })
          }
          ref={null}
          errorMessage={
            repeatPassword.hasError ? 'Please enter a valid password' : null
          }
        />
        <Link to={ROUTES.LOGIN}>
          <Button style={{ width: '100%' }}>Confirm</Button>
        </Link>
      </Styles.Form>
    </Styles.Container>
  )
}

export default NewPassword
