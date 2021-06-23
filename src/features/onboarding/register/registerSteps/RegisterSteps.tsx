import * as React from 'react'

import { Input } from '../../../../common/components/Inputs'
import Checkbox from '../../../../common/components/Checkbox/Checkbox'
import FormLoading from '../../../../common/components/FormLoading/FormLoading'

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

const StepLogin = (): JSX.Element => {
  const [username, setUsername] = React.useState<LoginFormInput>(
    initialInputState,
  )
  const [password, setPassword] = React.useState<LoginFormInput>(
    initialInputState,
  )
  const [isChecked, setIsChecked] = React.useState(false)

  const handleCheckboxClick = (selected: boolean) => {
    setIsChecked(selected)
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
        <FormLoading className='h-[6px] w-full bg-red-fe' />
        <FormLoading className='h-[6px] w-full bg-gray-a6' />
        <FormLoading className='h-[6px] w-full bg-gray-a6' />
        <FormLoading className='h-[6px] w-full bg-gray-a6' />
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
