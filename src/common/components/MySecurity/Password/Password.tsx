import React, { useState } from 'react'
import { passwordStrength, IPasswordOption } from 'check-password-strength'

import IconEye from '../../../assets/icons/ico-eye.svg'
import IconEyeHidden from '../../../assets/icons/ico-eye-hidden.svg'
import IconRefresh from '../../../assets/icons/ico-refresh-blue.svg'
import { Description } from '../Typography/Typography'

interface IPasswordProps {
  newPassword: string
  confirmPassword: string
  setNewPassword: (pass: string) => void
  setConfirmPassword: (pass: string) => void
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

const Password: React.FC<IPasswordProps> = ({
  newPassword,
  confirmPassword,
  setNewPassword,
  setConfirmPassword,
}) => {
  const [newPasswordVisible, setNewPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [passStrength, setPassStrength] = useState<string[]>([])

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
      'bg-loader-default',
      'bg-loader-default',
      'bg-loader-default',
      'bg-loader-default',
    ]
    if (validation.id === 0) {
      status = [
        'bg-loader-red',
        'bg-loader-default',
        'bg-loader-default',
        'bg-loader-default',
      ]
    } else if (validation.id === 1) {
      status = [
        'bg-loader-yellow',
        'bg-loader-yellow',
        'bg-loader-default',
        'bg-loader-default',
      ]
    } else if (validation.id === 2) {
      status = [
        'bg-loader-yellow',
        'bg-loader-yellow',
        'bg-loader-yellow',
        'bg-loader-default',
      ]
    } else if (validation.id === 3) {
      status = [
        'bg-loader-green',
        'bg-loader-green',
        'bg-loader-green',
        'bg-loader-green',
      ]
    }

    setPassStrength(status)
  }

  const handleConfirmPass = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPass = e.target.value
    setConfirmPassword(confirmPass)
  }

  const handleRefresh = () => {
    setNewPassword('')
    setConfirmPassword('')
    setPassStrength([])
  }

  return (
    <>
      <Description>New Password</Description>
      <div className='relative'>
        <input
          type={newPasswordVisible ? 'text' : 'password'}
          onChange={checkPasswordStrength}
          value={newPassword}
          className={`relative w-full shadow-input h-10 mt-2.5 rounded border 
          border-solid border-input-border outline-none focus:border-blue-450 box-border px-4 pr-20
          `}
        />
        {newPassword && (
          <>
            <img
              className='absolute top-5 right-3  hover: cursor-pointer w-5 h-5'
              onClick={handleNewVisibility}
              src={newPasswordVisible ? IconEye : IconEyeHidden}
            />
            <img
              className='absolute top-5 right-12  hover: cursor-pointer w-5 h-5'
              onClick={handleRefresh}
              src={IconRefresh}
            />
          </>
        )}
      </div>

      <Description>Confirm Password</Description>
      <div className='relative'>
        <input
          value={confirmPassword}
          type={confirmPasswordVisible ? 'text' : 'password'}
          onChange={handleConfirmPass}
          className={`relative w-full shadow-input h-10 mt-2.5 rounded border 
          border-solid border-input-border outline-none focus:border-blue-450 box-border px-4 pr-10
          `}
        />
        {confirmPassword && (
          <img
            className='absolute top-5 right-3  hover: cursor-pointer w-5 h-5'
            onClick={handleConfirmVisibility}
            src={confirmPasswordVisible ? IconEyeHidden : IconEye}
          />
        )}
      </div>
      {passStrength && (
        <div className='grid grid-cols-4 gap-1 mt-4 mb-6'>
          {passStrength?.map((status: string) => {
            return <div className={`${status} h-1.5 rounded`} />
          })}
        </div>
      )}
    </>
  )
}

export default Password
