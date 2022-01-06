import React, { useState, useEffect, createRef, useCallback, memo } from 'react'
import { passwordStrength, IPasswordOption } from 'check-password-strength'
import cn from 'classnames'

import Tooltip from '../../../common/components/Tooltip'
import { randomPassword } from 'common/utils/passwords'
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

type TPassStrengthProps = {
  key: string
  value: string
}

const GenerateRandomPasswordButton = memo(
  function GenerateRandomPasswordButton({
    handleGenerateRandomPassword,
  }: {
    handleGenerateRandomPassword: () => void
  }): JSX.Element {
    const onClick = useCallback(() => {
      handleGenerateRandomPassword()
    }, [])

    return (
      <button type='button' onClick={onClick}>
        <RefreshIcon size={18} className='text-blue-3f' />
      </button>
    )
  },
)

export default function Password(props: TPassword): JSX.Element {
  const {
    newPassword,
    confirmPassword,
    setNewPassword,
    setConfirmPassword,
    isMatch,
  } = props

  const [newPasswordVisible, setNewPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [passStrength, setPassStrength] = useState<TPassStrengthProps[]>([])
  const inputRef = createRef<HTMLInputElement>()

  useEffect(() => {
    if (!newPassword) {
      setPassStrength([])
    }
  }, [newPassword, setPassStrength])

  const handleNewVisibility = useCallback(() => {
    setNewPasswordVisible(!newPasswordVisible)
  }, [newPasswordVisible])

  const handleConfirmVisibility = useCallback(() => {
    setConfirmPasswordVisible(!confirmPasswordVisible)
  }, [confirmPasswordVisible])

  const checkPasswordStrength = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPass = e.target.value
      setNewPassword(newPass)
      const validation = passwordStrength(newPass, passOptions)

      let status = [
        {
          key: 'line-1',
          value: 'bg-navigation opacity-20',
        },
        {
          key: 'line-2',
          value: 'bg-navigation opacity-20',
        },
        {
          key: 'line-3',
          value: 'bg-navigation opacity-20',
        },
        {
          key: 'line-4',
          value: 'bg-navigation opacity-20',
        },
      ]
      if (validation.id === 0) {
        status = [
          {
            key: 'line-1',
            value: 'bg-red-fe',
          },
          {
            key: 'line-2',
            value: 'bg-navigation opacity-20',
          },
          {
            key: 'line-3',
            value: 'bg-navigation opacity-20',
          },
          {
            key: 'line-4',
            value: 'bg-navigation opacity-20',
          },
        ]
      } else if (validation.id === 1) {
        status = [
          {
            key: 'line-1',
            value: 'bg-yellow-ff',
          },
          {
            key: 'line-2',
            value: 'bg-yellow-ff',
          },
          {
            key: 'line-3',
            value: 'bg-navigation opacity-20',
          },
          {
            key: 'line-4',
            value: 'bg-navigation opacity-20',
          },
        ]
      } else if (validation.id === 2) {
        status = [
          {
            key: 'line-1',
            value: 'bg-yellow-ff',
          },
          {
            key: 'line-2',
            value: 'bg-yellow-ff',
          },
          {
            key: 'line-3',
            value: 'bg-yellow-ff',
          },
          {
            key: 'line-4',
            value: 'bg-navigation opacity-20',
          },
        ]
      } else if (validation.id === 3) {
        status = [
          {
            key: 'line-1',
            value: 'bg-success',
          },
          {
            key: 'line-2',
            value: 'bg-success',
          },
          {
            key: 'line-3',
            value: 'bg-success',
          },
          {
            key: 'line-4',
            value: 'bg-success',
          },
        ]
      }

      setPassStrength(status)
    },
    [passStrength],
  )

  const handleConfirmPass = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const confirmPass = e.target.value
      setConfirmPassword(confirmPass)
    },
    [confirmPassword],
  )

  const handleGenerateRandomPassword = useCallback(() => {
    const newPass = randomPassword()
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
  }, [])

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

  const renderRefreshIcon = () => (
    <div className={getIconClassnames(true)}>
      <Tooltip
        width={145}
        type='top'
        content='Generate a new secure 12-digit password'
        classnames='text-xs leading-4 pt-5px pb-1'
      >
        <GenerateRandomPasswordButton
          handleGenerateRandomPassword={handleGenerateRandomPassword}
        />
      </Tooltip>
    </div>
  )

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
            <button type='button' onClick={handleNewVisibility}>
              <Eye
                size={11}
                variant={newPasswordVisible ? 'hidden' : 'type1'}
                className={cn('text-gray-88', getIconClassnames(false))}
              />
            </button>
            {renderRefreshIcon()}
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
          <button type='button' onClick={handleConfirmVisibility}>
            <Eye
              size={19}
              variant={confirmPasswordVisible ? 'hidden' : 'type1'}
              className={cn('text-gray-88', getIconClassnames(false))}
            />
          </button>
        )}
      </div>
      {passStrength && (
        <div className='grid grid-cols-4 gap-1 mt-5 mb-6'>
          {passStrength?.map((status: TPassStrengthProps) => {
            return (
              <div
                className={`${status.value} h-1.5 rounded`}
                key={status.key}
              />
            )
          })}
        </div>
      )}
    </>
  )
}
