import React, { useState, FormEvent } from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import { Input } from 'common/components/Inputs'
import Checkbox from 'common/components/Checkbox/Checkbox'
import { NextButton } from './Buttons'
import icoShowPwd from 'common/assets/icons/ico-show-pwd.svg'
import icoHidePwd from 'common/assets/icons/ico-hide-pwd.svg'

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

function calcPasswordStrength(pass: string): number {
  let score = 0
  if (!pass) {
    return score
  }

  // award every unique letter until 5 repetitions
  type Obj1 = {
    [key: string]: number
  }
  const letters: Obj1 = {}
  for (let i = 0; i < pass.length; i++) {
    letters[pass[i]] = (letters[pass[i]] || 0) + 1
    score += 5.0 / letters[pass[i]]
  }

  // bonus points for mixing it up
  type Obj2 = {
    [key: string]: boolean
  }
  const variations: Obj2 = {
    digits: /\d/.test(pass),
    lower: /[a-z]/.test(pass),
    upper: /[A-Z]/.test(pass),
    nonWords: /\W/.test(pass),
  }

  let variationCount = 0
  for (const check in variations) {
    variationCount += variations[check] == true ? 1 : 0
  }
  score += (variationCount - 1) * 10

  if (pass.replace(/[^0-9]/g, '').length < 2) {
    // numbers count
    score -= score > 50 ? 20 : 10
  }

  return Math.round(score / 25)
}

const StepRegister = (props: TStepRegisterProps): JSX.Element => {
  const [usernameInvalid, setUsernameInvalid] = useState<boolean>(
    !validateUserName(props.username),
  )
  const [passwordStrength, setPasswordStrength] = useState<number>(
    calcPasswordStrength(props.password),
  )

  const onAgreementClicked = (selected: boolean) => {
    props.setTermsAgreed(selected)
  }

  const onUsernameChanged = (event: FormEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value
    props.setUsername(val)
    setUsernameInvalid(!validateUserName(val))
  }

  const onPasswordChanged = (event: FormEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value
    props.setPassword(val)
    setPasswordStrength(calcPasswordStrength(val))
  }

  const passwordStrengthIndicator = () => {
    let cl = ''
    switch (
      passwordStrength // colors logic
    ) {
      case 0:
      case 1:
        cl = 'bg-orange-63'
        break

      case 2:
      case 3:
      case 4:
        cl = 'bg-green-00'
        break
    }

    const items: string[] = []

    for (let i = 0; i < 4; i++) {
      items.push(i < passwordStrength ? cl : 'bg-gray-a6 opacity-20')
    }

    return (
      <div className='mt-3 grid grid-cols-4 gap-x-1.5'>
        {items.map((e, i) => (
          <div key={i} className={cn('h-1.5 rounded-full ', e)}></div>
        ))}
      </div>
    )
  }

  console.log(
    `usernameInvalid=${usernameInvalid}, passwordStrength=${passwordStrength}, termsAgreed=${props.termsAgreed}`,
  )

  const nextActive =
    !usernameInvalid && passwordStrength >= 2 && props.termsAgreed

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
          isValid={props.username.length > 0 ? !usernameInvalid : null}
          errorMessage={
            usernameInvalid ? 'Please enter a valid username' : null
          }
          hint='Only Latin Characters and Numbers Allowed'
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

        {passwordStrengthIndicator()}

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
