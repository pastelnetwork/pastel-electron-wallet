import * as React from 'react'
import { Link } from 'react-router-dom'

import { InputPassword, Input } from '../../../common/components/Inputs'
import { Button } from '../../../common/components/Buttons'
import CloseButton from '../common/closeButton'
import Typography from '../../../common/components/Typography/Typography'
import PasswordStrength from 'common/components/PasswordStrength/PasswordStrength'
import { colors } from '../../../common/theme/colors'
import * as ROUTES from '../../../common/utils/constants/routes'
import { calcPasswordStrength } from 'common/utils/passwords'

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

  const pwdStrength = calcPasswordStrength(newPassword.value)

  return (
    <div className='my-9 mx-60px'>
      <CloseButton gotoUrl={ROUTES.WELCOME_PAGE} />
      <Typography variant='h1' color='#2D3748' weight={800}>
        Set New Password
      </Typography>
      <div className='mt-1'>
        <Typography variant='body1' color={colors.text.secondary}>
          Make sure to save your password in a password manager!
        </Typography>
      </div>
      <form
        className='mt-7'
        onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
          handleFormSubmit(event)
        }
      >
        <InputPassword
          type='password'
          label='New Password'
          labelClassName='text-base text-medium text-gray-71 pb-2.5'
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
          hintClassName='mt-3 text-sm font-medium'
          hint='at least 8 characters and at least 2 numbers'
        />
        <PasswordStrength strength={pwdStrength} />
        <Input
          type='password'
          label='Repeat New Password'
          labelClassName='text-base text-medium text-gray-71 pb-2.5 mt-[25px]'
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
          <Button className='w-full mt-[30px] font-semibold'>Confirm</Button>
        </Link>
        <div className='text-link text-center mt-[18px] font-medium text-base underline mb-66px'>
          Generate a Secure Password for Me (recommended!)
        </div>
      </form>
    </div>
  )
}

export default NewPassword
