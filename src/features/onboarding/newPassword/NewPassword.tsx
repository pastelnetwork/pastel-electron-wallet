import React, { useState, FormEvent } from 'react'
import shallow from 'zustand/shallow'

import { InputPassword, Input } from '../../../common/components/Inputs'
import { Button } from '../../../common/components/Buttons'
import CloseButton from '../common/closeButton'
import PasswordStrength, {
  PasswordStrengths,
} from 'common/components/PasswordStrength/PasswordStrength'
import * as ROUTES from '../../../common/utils/constants/routes'
import { calcPasswordStrength, randomPassword } from 'common/utils/passwords'
import { readUsersInfo, writeUsersInfo } from 'common/utils/User'
import {
  useRegisterStore,
  RegisterStoreProvider,
} from '../register/Register.store'
import { useInitializeRegister } from '../register/Register.service'

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

function NewPasswordContent(): JSX.Element {
  const store = useRegisterStore(
    state => ({
      pastelId: state.pastelId,
    }),
    shallow,
  )
  const [newPassword, setNewPassword] = useState<NewPasswordFormInput>(
    initialInputState,
  )
  const [repeatPassword, setRepeatPassword] = useState<NewPasswordFormInput>(
    initialInputState,
  )
  const [showPassword, setShowPassword] = useState(false)
  const [isSuccess, setSuccess] = useState(false)

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

  const handleGeneratePassword = () => {
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
  }

  const handleChangePassword = async () => {
    const uers = await readUsersInfo()
    const user = uers.find(u => u.pastelId === store.pastelId)
    if (user) {
      user.newPassword = newPassword.value
      writeUsersInfo([user], true)
      setSuccess(true)
    }
  }

  return (
    <div className='my-9 mx-60px'>
      {isSuccess ? <CloseButton gotoUrl={ROUTES.LOGIN} /> : null}
      <div className='text-h1-heavy text-gray-2d'>Set New Password</div>
      <div className='mt-1'>
        <div className='text-text-77 text-h4'>
          Make sure to save your password in a password manager!
        </div>
      </div>
      <form
        className='mt-7'
        onSubmit={(event: FormEvent<HTMLFormElement>) =>
          handleFormSubmit(event)
        }
      >
        <InputPassword
          type='password'
          label='New Password'
          labelClassName='text-lg font-medium text-gray-71 pb-1.5'
          value={newPassword.value}
          onChange={(event: FormEvent<HTMLInputElement>) => {
            setShowPassword(false)
            setNewPassword({
              ...newPassword,
              value: event.currentTarget.value,
            })
          }}
          showPassword={showPassword}
          ref={null}
          errorMessage={
            newPassword.hasError ? 'Please enter a valid password' : null
          }
          hintClassName='mt-3 text-sm font-medium'
          hint={getPasswordHint()}
        />
        <PasswordStrength strength={pwdStrength} />
        <Input
          type='password'
          label='Repeat New Password'
          labelClassName='text-lg font-medium text-gray-71 pb-1.5 mt-[25px]'
          value={repeatPassword.value}
          onChange={(event: FormEvent<HTMLInputElement>) =>
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
        <Button
          className='w-full mt-[30px] font-semibold'
          onClick={handleChangePassword}
        >
          Confirm
        </Button>
        <div className='mt-[18px] mb-66px text-center'>
          <button
            type='button'
            className='text-link font-medium text-base bg-transparent border-none'
            onClick={handleGeneratePassword}
          >
            Generate a Secure Password for Me (recommended!)
          </button>
        </div>
      </form>
    </div>
  )
}

export default function NewPassword(): JSX.Element {
  const store = useInitializeRegister({})
  return (
    <RegisterStoreProvider createStore={() => store}>
      <NewPasswordContent />
    </RegisterStoreProvider>
  )
}
