import React, { useState, useEffect, createRef } from 'react'
import { passwordStrength, IPasswordOption } from 'check-password-strength'
import generatePassword from 'generate-password'
import cn from 'classnames'

import Tooltip from '../../../common/components/Tooltip'
import { RefreshIcon, Eye } from 'common/components/Icons'

type TPassword = {
  newPassword: string
  confirmPassword: string
  setNewPassword: (pass: string) => void
  setConfirmPassword: (pass: string) => void
  isMatch: boolean
}

const passOptions: IPasswordOption[] = [
  {
    id: 0,
    value: 'Too weak',
    minDiversity: 0,
    minLength: 1,
  },
  {
    id: 1,
    value: 'Weak',
    minDiversity: 2,
    minLength: 6,
  },
  {
    id: 2,
    value: 'Medium',
    minDiversity: 3,
    minLength: 10,
  },
  {
    id: 3,
    value: 'Strong',
    minDiversity: 4,
    minLength: 12,
  },
]

const Password = (props: TPassword): JSX.Element => {
  const {
    newPassword,
    confirmPassword,
    setNewPassword,
    setConfirmPassword,
    isMatch,
  } = props

  const [newPasswordVisible, setNewPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [passStrength, setPassStrength] = useState<string[]>([])
  const inputRef = createRef<HTMLInputElement>()

  useEffect(() => {
    if (!newPassword) {
      setPassStrength([])
    }
  }, [newPassword, setPassStrength])

  const handleNewVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible)
  }

  const handleConfirmVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible)
  }

  const checkPasswordStrength = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPass = e.target.value
    setNewPassword(newPass)
    const validation = passwordStrength(newPass, passOptions)

    let status = [
      'bg-navigation opacity-20',
      'bg-navigation opacity-20',
      'bg-navigation opacity-20',
      'bg-navigation opacity-20',
    ]
    if (validation.id === 0) {
      status = [
        'bg-red-fe',
        'bg-navigation opacity-20',
        'bg-navigation opacity-20',
        'bg-navigation opacity-20',
      ]
    } else if (validation.id === 1) {
      status = [
        'bg-yellow-ff',
        'bg-yellow-ff',
        'bg-navigation opacity-20',
        'bg-navigation opacity-20',
      ]
    } else if (validation.id === 2) {
      status = [
        'bg-yellow-ff',
        'bg-yellow-ff',
        'bg-yellow-ff',
        'bg-navigation opacity-20',
      ]
    } else if (validation.id === 3) {
      status = ['bg-success', 'bg-success', 'bg-success', 'bg-success']
    }

    setPassStrength(status)
  }

  const handleConfirmPass = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPass = e.target.value
    setConfirmPassword(confirmPass)
  }

  const handleGenerateRandomPassword = () => {
    const newPass = generatePassword.generate({
      length: 12,
      numbers: true,
      symbols: true,
      lowercase: true,
      uppercase: true,
      strict: true,
    })
    setNewPassword(newPass)

    const setNativeValue = (element: HTMLInputElement, value: string) => {
      const valueSetter = Object.getOwnPropertyDescriptor(element, 'value')?.set
      const prototype = Object.getPrototypeOf(element)
      const prototypeValueSetter = Object.getOwnPropertyDescriptor(
        prototype,
        'value',
      )?.set

      if (valueSetter && valueSetter !== prototypeValueSetter) {
        prototypeValueSetter?.call(element, value)
      } else {
        valueSetter?.call(element, value)
      }
    }

    const event = new Event('input', { bubbles: true })
    const element = inputRef.current
    if (element) {
      setNativeValue(element, newPass)
      element.dispatchEvent(event)
    }
  }

  const getIconClassnames = (isRefresh: boolean) => {
    return `absolute top-3.5 cursor-pointer w-5 h-5 object-none flex justify-center items-center ${
      isRefresh ? 'right-12' : 'right-3'
    }`
  }

  const getInputClassnames = (hasRefresh: boolean) => {
    return `relative w-full h-10 mt-1 rounded border text-gray-2d
    border-solid ${
      isMatch ? 'border-input-border' : 'border-red-fe'
    }  outline-none focus:border-blue-3f box-border px-4 ${
      hasRefresh ? 'pr-20' : 'pr-10'
    }`
  }

  return (
    <>
      <div className='text-gray-71 font-medium text-lg'>New password</div>
      <div className='relative mb-6'>
        <input
          type={newPasswordVisible ? 'text' : 'password'}
          onChange={checkPasswordStrength}
          value={newPassword}
          className={getInputClassnames(true)}
          ref={inputRef}
        />
        {newPassword && (
          <>
            <Eye
              size={11}
              variant={newPasswordVisible ? 'hidden' : 'type1'}
              className={cn('text-gray-88', getIconClassnames(false))}
              onClick={() => handleNewVisibility()}
            />
            <div className={getIconClassnames(true)}>
              <Tooltip
                width={145}
                type='top'
                content='Generate a new secure 12-digit password'
                classnames='text-xs leading-4 pt-5px pb-1'
              >
                <RefreshIcon
                  size={18}
                  onClick={() => handleGenerateRandomPassword()}
                  className='text-blue-3f'
                />
              </Tooltip>
            </div>
          </>
        )}
      </div>

      <div className='text-gray-71 font-medium text-lg'>Confirm password</div>

      <div className='relative'>
        <input
          value={confirmPassword}
          type={confirmPasswordVisible ? 'text' : 'password'}
          onChange={handleConfirmPass}
          className={getInputClassnames(false)}
        />
        {confirmPassword && (
          <Eye
            size={19}
            variant={confirmPasswordVisible ? 'hidden' : 'type1'}
            className={cn('text-gray-88', getIconClassnames(false))}
            onClick={() => handleConfirmVisibility()}
          />
        )}
      </div>
      {passStrength && (
        <div className='grid grid-cols-4 gap-1 mt-5 mb-6'>
          {passStrength?.map((status: string, index: number) => {
            return <div className={`${status} h-1.5 rounded`} key={index} />
          })}
        </div>
      )}
    </>
  )
}

export default Password
