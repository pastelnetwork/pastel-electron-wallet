import React, { useState, FormEvent } from 'react'

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

export type TStepRegisterProps = {
  username: string
  setUsername(val: string): void
  password: string
  setPassword(val: string): void
  showPassword: boolean
  setShowPassword(val: boolean): void
  termsAgreed: boolean
  setTermsAgreed(val: boolean): void
  goToNextStep(): void
}

function validateUserName(val: string): boolean {
  const validationRe = /^[0-9a-z_]{3,}$/i
  return validationRe.test(val)
}

const StepRegister = (props: TStepRegisterProps): JSX.Element => {
  const [usernameInvalid, setUsernameInvalid] = useState<boolean>(
    !validateUserName(props.username),
  )
  const [passwordStrength, setPasswordStrength] = useState<number>(
    calcPasswordStrength(props.password),
  )

  const updateUserName = (val: string) => {
    props.setUsername(val)
    setUsernameInvalid(!validateUserName(val))
  }

  const onAgreementClicked = (selected: boolean) => {
    props.setTermsAgreed(selected)
  }

  const onUsernameChanged = (event: FormEvent<HTMLInputElement>) => {
    updateUserName(event.currentTarget.value)
  }

  const onPasswordChanged = (event: FormEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value
    props.setPassword(val)
    setPasswordStrength(calcPasswordStrength(val))
  }

  const getPasswordHint = (): string => {
    if (!props.password) {
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
    !usernameInvalid && passwordStrength >= 2 && props.termsAgreed

  let usernameIsValid = null
  if (props.username.length > 0 && usernameInvalid) {
    usernameIsValid = false
  }

  return (
    <div className='pt-[105px] flex flex-col h-full'>
      <form className='flex-grow'>
        <Input
          className='w-full'
          type='text'
          label='Choose your username to use on the Pastel Network'
          value={props.username}
          onChange={onUsernameChanged}
          ref={null}
          isValid={usernameIsValid}
          errorMessage={
            usernameInvalid && props.username
              ? 'Please enter a valid username'
              : null
          }
          hint='Only Latin Characters and Numbers Allowed'
          hintAsTooltip={true}
          appliedStyleValid={false}
        />
        <div className='mt-6'>
          <InputPassword
            className='w-full'
            type={props.showPassword ? 'text' : 'password'}
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
            value={props.password}
            onChange={onPasswordChanged}
            hint={getPasswordHint()}
          />
        </div>
        {props.password && <PasswordStrength strength={passwordStrength} />}

        <div className='mt-6'>
          <Checkbox
            isChecked={props.termsAgreed}
            clickHandler={onAgreementClicked}
            className='items-start'
          >
            <span className='text-14px text-gray-a0'>
              I certify that I’m 18 years of age or older, and agree to the{' '}
              <Link to='#' className='link'>
                User Agreement and Privacy Policy
              </Link>
            </span>
          </Checkbox>
        </div>
        {!props.username && (
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
          onClick={() => props.goToNextStep()}
          text='Next step'
          disabled={!nextActive}
        />
      </div>
    </div>
  )
}

export default StepRegister
