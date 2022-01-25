import React, { useState, FormEvent, useCallback } from 'react'
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
import { checkPastelIdUsername } from 'api/pastel-rpc'
import { readUsersInfo } from 'common/utils/User'
import { translate } from 'features/app/translations'

function validateUserName(val: string): boolean {
  const validationRe = /^[0-9a-z_]{3,}$/i
  return validationRe.test(val)
}

export default function StepRegister(): JSX.Element {
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
  const [errorMsg, setErrorMsg] = useState('')

  const updateUserName = (val: string) => {
    store.setUsername(val)
    setUsernameInvalid(!validateUserName(val))
  }

  const onUsernameChanged = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      updateUserName(event.currentTarget.value)
    },
    [usernameInvalid, store],
  )

  const onPasswordChanged = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const val = event.currentTarget.value
      store.setPassword(val)
      setPasswordStrength(calcPasswordStrength(val))
    },
    [passwordStrength, store],
  )

  const getPasswordHint = (): string => {
    if (!store.password) {
      return ''
    }

    if (passwordStrength === PasswordStrengths.Excellent) {
      return translate('superSecurePassword')
    }

    if (
      passwordStrength === PasswordStrengths.Good ||
      passwordStrength === PasswordStrengths.Moderate ||
      passwordStrength === PasswordStrengths.Weak
    ) {
      return translate('notStrongEnough')
    }

    return translate('atLeast8CharactersAndAtLeast2numbers')
  }

  const nextActive =
    !usernameInvalid && passwordStrength >= 2 && store.termsAgreed

  let usernameIsValid = null
  if (store.username.length > 0 && usernameInvalid) {
    usernameIsValid = false
  }

  const hanleNextStep = useCallback(async () => {
    setErrorMsg('')
    setUsernameInvalid(false)
    const validation = await checkPastelIdUsername({ username: store.username })
    if (validation.isBad) {
      setErrorMsg(validation.validationError)
      setUsernameInvalid(true)
      return
    }
    const users = await readUsersInfo()
    const user = users.find(u => u.username === store.username)
    if (user) {
      setErrorMsg(translate('usernameAlreadyInUse'))
      setUsernameInvalid(true)
      return
    }
    store.goToNextStep()
  }, [store])

  const renderPasswordInput = () => (
    <InputPassword
      className='w-full'
      label={
        <div className='flex items-center'>
          <span className='mr-2'>{translate('setYourWalletPassword')}</span>
          <Tooltip
            classnames='font-medium py-2'
            content={translate('setYourWalletPasswordTooltip')}
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

  const handleOpenPrivacyPolicy = useCallback((e: MouseEvent) => {
    e.stopPropagation()
    shell.openExternal('https://pastel.network/privacy-policy/')
  }, [])

  const renderCheckboxPrivacyPolicy = () => {
    return (
      <Checkbox
        isChecked={store.termsAgreed}
        clickHandler={store.setTermsAgreed}
        className='items-start'
      >
        <span className='text-14px text-gray-a0'>
          {translate('iCertifyThatIm18YearsOfAge')}{' '}
          <Link
            onClick={handleOpenPrivacyPolicy}
            className='link'
            type='button'
          >
            {translate('userAgreementAndPrivacyPolicy')}
          </Link>
        </span>
      </Checkbox>
    )
  }

  return (
    <div className='pt-[105px] flex flex-col h-full'>
      <form className='flex-grow'>
        <Input
          className='w-full'
          type='text'
          label={translate('chooseYourUsernameToUseOnThePastelNetwork')}
          value={store.username}
          onChange={onUsernameChanged}
          ref={null}
          isValid={usernameIsValid}
          errorMessage={
            usernameInvalid && store.username
              ? errorMsg || translate('pleaseEnterAValidUserName')
              : null
          }
          hint={translate('onlyLatinCharactersAndNumbersAllowed')}
          hintAsTooltip
          appliedStyleValid={false}
        />
        <div className='mt-6'>{renderPasswordInput()}</div>
        {store.password && <PasswordStrength strength={passwordStrength} />}

        <div className='mt-6'>{renderCheckboxPrivacyPolicy()}</div>
        {!store.username && (
          <div className='mt-6'>
            <p className='mb-0 text-sm font-normal text-gray-71'>
              {translate('stepRegisterNote')}
            </p>
            <p className='mb-0 mt-1 text-h6 leading-6 font-normal text-gray-71 italic'>
              {translate('example')}: Banksy82
            </p>
          </div>
        )}
      </form>

      <div className='mt-7 flex justify-end'>
        <NextButton
          onClick={hanleNextStep}
          text={translate('nextStep')}
          disabled={!nextActive}
        />
      </div>
    </div>
  )
}
