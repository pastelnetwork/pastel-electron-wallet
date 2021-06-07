import * as React from 'react'

import Input from '../../../../common/components/Input/Input'
import Checkbox from '../../../../common/components/Checkbox/Checkbox'
import FormLoading from '../../../../common/components/FormLoading/FormLoading'

import { colors } from '../../../../common/theme/colors'

import * as Styles from './RegisterSteps.styles'

interface LoginFormInput {
  value: string
  hasError: boolean
  isTouched: boolean
}

const initialInputState = {
  value: '',
  hasError: false,
  isTouched: false,
}

const StepLogin: React.FC = () => {
  const [username, setUsername] = React.useState<LoginFormInput>(
    initialInputState,
  )
  const [password, setPassword] = React.useState<LoginFormInput>(
    initialInputState,
  )
  const [isChecked, setIsChecked] = React.useState(false)

  const handleCheckboxClick = (
    event: React.MouseEvent<HTMLLabelElement, MouseEvent>,
  ) => {
    if ((event?.target as HTMLElement).tagName === 'LABEL') {
      return
    }
    setIsChecked(previousValue => !previousValue)
  }

  return (
    <Styles.Container>
      <Input
        type='text'
        label='User name'
        placeholder='i.e banksy168'
        value={username.value}
        onChange={(event: React.FormEvent<HTMLInputElement>) =>
          setUsername({
            ...username,
            value: event.currentTarget.value,
            hasError: true,
          })
        }
        ref={null}
        errorMessage={
          username.hasError ? 'Please enter a valid username' : null
        }
      />
      <Input
        type='password'
        label='Password'
        value={password.value}
        onChange={(event: React.FormEvent<HTMLInputElement>) =>
          setPassword({
            ...password,
            value: event.currentTarget.value,
          })
        }
        ref={null}
        errorMessage={
          password.hasError ? 'Please enter a valid password' : null
        }
        hint='at least 8 characters and at least 2 numbers'
      />
      <Styles.LoadingContainer>
        <FormLoading
          background={
            password.value ? colors.success.default : colors.loader.red
          }
        />
        <FormLoading
          background={
            password.value ? colors.success.default : colors.loader.default
          }
        />
        <FormLoading
          background={
            password.value ? colors.success.default : colors.loader.default
          }
        />
        <FormLoading background={colors.loader.default} />
      </Styles.LoadingContainer>
      <Styles.CheckboxContainer>
        <Checkbox isChecked={isChecked} clickHandler={handleCheckboxClick}>
          I certify that I’m 18 years of age or older, and agree to the User
          Agreement and Privacy Policy
        </Checkbox>
      </Styles.CheckboxContainer>
    </Styles.Container>
  )
}

export default StepLogin
