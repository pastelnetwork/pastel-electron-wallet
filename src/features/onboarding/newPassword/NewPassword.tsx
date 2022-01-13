import React, { useState, FormEvent, useCallback } from 'react'

import { InputPassword } from 'common/components/Inputs'
import { Button } from 'common/components/Buttons'
import CloseButton from '../common/closeButton'
import PasswordStrength, {
  PasswordStrengths,
} from 'common/components/PasswordStrength/PasswordStrength'
import Link from 'common/components/Link'
import * as ROUTES from 'common/utils/constants/routes'
import { encode } from 'common/utils/encryption'
import { calcPasswordStrength, randomPassword } from 'common/utils/passwords'
import { readUsersInfo, writeUsersInfo } from 'common/utils/User'
import { changePastelIdPassword } from 'api/pastel-rpc'

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

export default function NewPassword(): JSX.Element {
  const [newPassword, setNewPassword] = useState<NewPasswordFormInput>(
    initialInputState,
  )
  const [repeatPassword, setRepeatPassword] = useState<NewPasswordFormInput>(
    initialInputState,
  )
  const [showPassword, setShowPassword] = useState(false)
  const [isSuccess, setSuccess] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const pwdStrength = calcPasswordStrength(newPassword.value)

  const getPasswordHint = (): string => {
    if (!newPassword.value) {
      return ''
    }

    if (
      pwdStrength === PasswordStrengths.Good ||
      pwdStrength === PasswordStrengths.Excellent
    ) {
      return 'Super secure password'
    }

    return 'At least 8 characters and at least 2 numbers'
  }

  const handleGeneratePassword = useCallback(() => {
    const password = randomPassword()
    setNewPassword({
      ...newPassword,
      value: password,
    })
    setRepeatPassword({
      ...repeatPassword,
      value: password,
    })

    setShowPassword(true)
  }, [])

  const handleChangePassword = useCallback(async () => {
    setErrorMessage('')
    if (newPassword.value !== repeatPassword.value) {
      setErrorMessage("The passwords don't match.")
      return
    }
    setLoading(true)
    const users = await readUsersInfo()
    const newUsers = []
    for (const user of users) {
      const password: string = user.password
      const username: string = user.username
      const vNewPassword: string = encode(newPassword.value) || ''
      await changePastelIdPassword({
        pastelId: user.pastelId,
        oldPassphrase: `${password}${username}`,
        newPassphrase: `${vNewPassword}${username}`,
      })
      user.newPassword = vNewPassword
      user.password = vNewPassword

      newUsers.push(user)
    }
    await writeUsersInfo(newUsers, false)
    setSuccess(true)
    setLoading(false)
  }, [newPassword, repeatPassword])

  const handleNewPasswordChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      setShowPassword(false)
      setNewPassword({
        ...newPassword,
        value: event.currentTarget.value,
      })
    },
    [],
  )

  const handleRepeatNewPasswordChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      setRepeatPassword({
        ...repeatPassword,
        value: event.currentTarget.value,
      })
    },
    [],
  )

  const onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    handleFormSubmit(event)
  }, [])

  const renderGenerateSecurePasswordButton = () => {
    return (
      <div className='mt-[18px] mb-66px text-center'>
        <button
          type='button'
          className='text-link font-medium text-base bg-transparent border-none'
          onClick={handleGeneratePassword}
        >
          Generate a Secure Password for Me (recommended!)
        </button>
      </div>
    )
  }

  const renderLoginButton = () => {
    return (
      <div className='mt-6'>
        <Link className='text-link' to={ROUTES.LOGIN}>
          <Button className='w-full'>Login</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className='my-9 mx-60px'>
      {isSuccess ? <CloseButton gotoUrl={ROUTES.LOGIN} /> : null}
      <div className='text-h1-heavy text-gray-2d'>Set New Password</div>
      {isSuccess ? (
        <div className='mt-8'>
          <div className='text-text-77 text-h4'>
            Your password has been reset successfully.
          </div>
          {renderLoginButton()}
        </div>
      ) : (
        <>
          <div className='mt-1'>
            <div className='text-text-77 text-h4'>
              Make sure to save your password in a password manager!
            </div>
          </div>
          <form className='mt-7' onSubmit={onSubmit}>
            {errorMessage ? (
              <div className='text-red-fe mb-2'>{errorMessage}</div>
            ) : null}
            <InputPassword
              type='password'
              label='New Password'
              labelClassName='text-lg font-medium text-gray-71 pb-1.5'
              value={newPassword.value}
              onChange={handleNewPasswordChange}
              showPassword={showPassword}
              ref={null}
              errorMessage={
                newPassword.hasError ? 'Please enter a valid password' : null
              }
              hintClassName='mt-3 text-sm font-medium'
              hint={getPasswordHint()}
            />
            <PasswordStrength strength={pwdStrength} />
            <InputPassword
              type='password'
              label='Repeat New Password'
              labelClassName='text-lg font-medium text-gray-71 pb-1.5 mt-[25px]'
              value={repeatPassword.value}
              onChange={handleRepeatNewPasswordChange}
              ref={null}
              errorMessage={
                repeatPassword.hasError ? 'Please enter a valid password' : null
              }
            />
            <Button
              className='w-full mt-[30px] font-semibold'
              onClick={handleChangePassword}
              type='button'
              disabled={
                !newPassword.value ||
                !repeatPassword.value ||
                pwdStrength < 2 ||
                isLoading
              }
            >
              Confirm
            </Button>
            {renderGenerateSecurePasswordButton()}
          </form>
        </>
      )}
    </div>
  )
}
