import React, { useState, FormEvent } from 'react'
import shallow from 'zustand/shallow'
import { shell } from 'electron'

import Input from 'common/components/Inputs/Input'
import Checkbox from 'common/components/Checkbox/Checkbox'
import PasswordStrength, {
  PasswordStrengths,
} from 'common/components/PasswordStrength/PasswordStrength'
import { NextButton } from './Buttons'
import { calcPasswordStrength } from 'common/utils/passwords'
import Link from 'common/components/Link'
import InputPassword from 'common/components/Inputs/InputPassword'
import Tooltip from 'common/components/Tooltip'
import { Info } from 'common/components/Icons'
import { useRegisterStore } from './Register.store'

function validateUserName(val: string): boolean {
  const validationRe = /^[0-9a-z_]{3,}$/i
  return validationRe.test(val)
}

const StepRegister = (): JSX.Element => {
  const store = useRegisterStore(
    state => ({
      username: state.username,
      setUsername: state.setUsername,
      password: state.password,
      setPassword: state.setPassword,
      goToNextStep: state.goToNextStep,
      termsAgreed: state.termsAgreed,
      setTermsAgreed: state.setTermsAgreed,
    }),
    shallow,
  )
  const [usernameInvalid, setUsernameInvalid] = useState<boolean>(
    !validateUserName(store.username),
  )
  const [passwordStrength, setPasswordStrength] = useState<number>(
    calcPasswordStrength(store.password),
  )

  const updateUserName = (val: string) => {
    store.setUsername(val)
    setUsernameInvalid(!validateUserName(val))
  }

  const onUsernameChanged = (event: FormEvent<HTMLInputElement>) => {
    updateUserName(event.currentTarget.value)
  }

  const onPasswordChanged = (event: FormEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value
    store.setPassword(val)
    setPasswordStrength(calcPasswordStrength(val))
  }

  const getPasswordHint = (): string => {
    if (!store.password) {
      return ''
    }

    if (passwordStrength === PasswordStrengths.Excellent) {
      return 'Super secure password'
    }

    if (
      passwordStrength === PasswordStrengths.Good ||
      passwordStrength === PasswordStrengths.Moderate ||
      passwordStrength === PasswordStrengths.Weak
    ) {
      return 'Not strong enough'
    }

    return 'At least 8 characters and at least 2 numbers'
  }

  const nextActive =
    !usernameInvalid && passwordStrength >= 2 && store.termsAgreed

  let usernameIsValid = null
  if (store.username.length > 0 && usernameInvalid) {
    usernameIsValid = false
  }

  const hanleNextStep = async () => {
    store.goToNextStep()
  }

  const renderPasswordInput = () => (
    <InputPassword
      className='w-full'
      label={
        <div className='flex items-center'>
          <span className='mr-2'>Set your wallet password</span>
          <Tooltip
            classnames='font-medium py-2'
            content='This password is to the secure container that stores your PSL coins and NFTs on your own machine and is never sent over the network. Please keep this password secure and be sure to backup your secret data in the next step.'
            type='top'
            width={260}
            vPosPercent={100}
          >
            <Info size={17} />
          </Tooltip>
        </div>
      }
      value={store.password}
      onChange={onPasswordChanged}
      hint={getPasswordHint()}
    />
  )

  const handleOpenPrivacyPolicy = () => {
    shell.openExternal('https://pastel.network/privacy-policy/')
  }

  return (
    <div className='pt-[105px] flex flex-col h-full'>
      <form className='flex-grow'>
        <Input
          className='w-full'
          type='text'
          label='Choose your username to use on the Pastel Network'
          value={store.username}
          onChange={onUsernameChanged}
          ref={null}
          isValid={usernameIsValid}
          errorMessage={
            usernameInvalid && store.username
              ? 'Please enter a valid username'
              : null
          }
          hint='Only Latin Characters and Numbers Allowed'
          hintAsTooltip={true}
          appliedStyleValid={false}
        />
        <div className='mt-6'>{renderPasswordInput()}</div>
        {store.password && <PasswordStrength strength={passwordStrength} />}

        <div className='mt-6'>
          <Checkbox
            isChecked={store.termsAgreed}
            clickHandler={store.setTermsAgreed}
            className='items-start'
          >
            <span className='text-14px text-gray-a0'>
              I certify that I’m 18 years of age or older, and agree to the{' '}
              <Link
                onClick={handleOpenPrivacyPolicy}
                className='link'
                type='button'
              >
                User Agreement and Privacy Policy
              </Link>
            </span>
          </Checkbox>
        </div>
        {!store.username && (
          <div className='mt-6'>
            <p className='mb-0 text-sm font-normal text-gray-71'>
              Note: Your Pastel username is a user-friendly way to identify you
              to other users on Pastel Network, similar to a Twitter handle.
            </p>
            <p className='mb-0 mt-1 text-h6 leading-6 font-normal text-gray-71 italic'>
              Example: Banksy82
            </p>
          </div>
        )}
      </form>

      <div className='mt-7 flex justify-end'>
        <NextButton
          onClick={hanleNextStep}
          text='Next step'
          disabled={!nextActive}
        />
      </div>
    </div>
  )
}

export default StepRegister
