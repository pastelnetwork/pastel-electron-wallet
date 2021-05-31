import React from 'react'
import { passwordStrength, IPasswordOption } from 'check-password-strength'

import IconEye from '../../../assets/icons/ico-eye.svg'
import IconEyeHidden from '../../../assets/icons/ico-eye-hidden.svg'
import IconRefresh from '../../../assets/icons/ico-refresh-blue.svg'
import { Description } from '../Typography/Typography'
import * as Styles from './Password.style'

interface PasswordProps {
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

const Password: React.FC<PasswordProps> = ({
  newPassword,
  confirmPassword,
  setNewPassword,
  setConfirmPassword,
}) => {
  const [newPasswordVisible, setNewPasswordVisible] = React.useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = React.useState(
    false,
  )
  const [passStrength, setPassStrength] = React.useState<string[]>([])

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
      <Styles.InputContainer>
        <Styles.Input
          type={newPasswordVisible ? 'text' : 'password'}
          onChange={checkPasswordStrength}
          value={newPassword}
          color={'pr-20'}
        />
        {newPassword && (
          <>
            <Styles.IconButton
              onClick={handleNewVisibility}
              src={newPasswordVisible ? IconEyeHidden : IconEye}
            />
            <Styles.IconRefreshButton
              onClick={handleRefresh}
              src={IconRefresh}
            />
          </>
        )}
      </Styles.InputContainer>
      <Styles.Spacer />
      <Description>Confirm Password</Description>
      <Styles.InputContainer>
        <Styles.Input
          value={confirmPassword}
          type={confirmPasswordVisible ? 'text' : 'password'}
          onChange={handleConfirmPass}
        />
        {confirmPassword && (
          <Styles.IconButton
            onClick={handleConfirmVisibility}
            src={confirmPasswordVisible ? IconEyeHidden : IconEye}
          />
        )}
      </Styles.InputContainer>
      {passStrength && (
        <Styles.LoadContainer>
          {passStrength?.map((status: string) => {
            return <div className={`${status} h-1.5 rounded`} />
          })}
        </Styles.LoadContainer>
      )}
    </>
  )
}

export default Password
