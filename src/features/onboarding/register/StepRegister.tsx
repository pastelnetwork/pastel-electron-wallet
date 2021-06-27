import React, { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Input } from 'common/components/Inputs'
import Checkbox from 'common/components/Checkbox/Checkbox'
import PasswordStrength from 'common/components/PasswordStrength/PasswordStrength'
import { NextButton } from './Buttons'
import icoShowPwd from 'common/assets/icons/ico-show-pwd.svg'
import icoHidePwd from 'common/assets/icons/ico-hide-pwd.svg'
import { calcPasswordStrength } from 'common/utils/passwords'

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

  const nextActive =
    !usernameInvalid && passwordStrength >= 2 && props.termsAgreed

  let usernameIsValid = null
  if (props.username.length > 0 && usernameInvalid) {
    usernameIsValid = false
  }

  return (
    <div className='pt-12 flex flex-col h-full'>
      <form className='flex-grow'>
        <Input
          className='w-full'
          type='text'
          label='User name'
          placeholder='i.e banksy168'
          value={props.username}
          onChange={onUsernameChanged}
          ref={null}
          isValid={usernameIsValid}
          errorMessage={
            usernameInvalid ? 'Please enter a valid username' : null
          }
          hint='Only Latin Characters and Numbers Allowed'
          hintAsTooltip={true}
        />
        <div className='mt-6'>
          <Input
            className='w-full'
            type={props.showPassword ? 'text' : 'password'}
            label='Password'
            value={props.password}
            onChange={onPasswordChanged}
            ref={null}
            hint='at least 8 characters and at least 2 numbers'
            append={
              <img
                className='cursor-pointer'
                src={props.showPassword ? icoShowPwd : icoHidePwd}
                onClick={() => props.setShowPassword(!props.showPassword)}
              />
            }
          />
        </div>

        <PasswordStrength strength={passwordStrength} />

        <div className='mt-6'>
          <Checkbox
            isChecked={props.termsAgreed}
            clickHandler={onAgreementClicked}
          >
            I certify that I’m 18 years of age or older, and agree to the{' '}
            <Link to='#' className='link'>
              User Agreement and Privacy Policy
            </Link>
          </Checkbox>
        </div>
      </form>

      <div className='mt-7 flex justify-end'>
        <NextButton
          onClick={() => props.goToNextStep()}
          text='Next step 2'
          active={nextActive}
        />
      </div>
    </div>
  )
}

export default StepRegister
