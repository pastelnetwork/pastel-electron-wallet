import React, { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'

import Link from 'common/components/Link'
import { Button } from 'common/components/Buttons'
import { calcPasswordStrength } from 'common/utils/passwords'
import {
  readUsersInfo,
  getCurrentAccount,
  writeUsersInfo,
} from 'common/utils/User'
import { changePastelIdPassword } from 'api/pastel-rpc'
import { encode } from 'common/utils/encryption'
import Password from '../../components/Password'
import Card from '../../components/Card'
import { SecurityPasswordModal } from '../mySecurityModals'
import { translate } from 'features/app/translations'

export default function ChangePassword({
  qrcodeData,
}: {
  qrcodeData: string[]
}): JSX.Element {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [noMatch, setNoMatch] = useState(false)
  const [securityPassword, setSecurityPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')

  const submitPassword = useCallback(() => {
    setNoMatch(false)
    if (newPassword !== confirmPassword) {
      setNoMatch(newPassword !== confirmPassword)
      return
    }

    setSecurityPassword(true)
  }, [noMatch, securityPassword, newPassword, confirmPassword])

  useEffect(() => {
    if (newPassword === confirmPassword && !newPassword && !confirmPassword) {
      setNoMatch(false)
    }
  }, [newPassword, confirmPassword])

  const handleConfirmChangePassword = useCallback(async () => {
    setStatus('loading')
    setError('')
    const currentUser = getCurrentAccount()
    const users = await readUsersInfo()
    const user = users.find(
      u =>
        u.pastelId === currentUser?.pastelId &&
        u.username === currentUser?.username,
    )
    if (user) {
      const newPassword = encode(currentPassword)
      if (newPassword !== user.password) {
        setError(translate('passwordIsIncorrect'))
        setStatus('')
        return
      }

      try {
        const newUsers = []
        for (const user of users) {
          const username: string = user.username
          await changePastelIdPassword({
            pastelId: user.pastelId,
            oldPassphrase: `${user.password}${username}`,
            newPassphrase: `${newPassword}${username}`,
          })
          user.newPassword = newPassword
          user.password = newPassword
          newUsers.push(user)
        }
        await writeUsersInfo(newUsers, false)
        setStatus('success')
        setNewPassword('')
        setConfirmPassword('')
      } catch (error) {
        toast(error.message, { type: 'error' })
        setStatus('')
      }
    }
  }, [currentPassword])

  const handleClose = useCallback(() => {
    setSecurityPassword(false)
    setStatus('')
  }, [])

  const renderSuggestPasswordContent = () => (
    <div className='text-gray-a0 text-h6 leading-relaxed'>
      <span>{translate('WeStronglySuggestThatYouSaveYourPassword')} </span>
      <Link
        to='https://www.lastpass.com/'
        target='_blank'
        className='underline italic'
        variant='gray-a0'
        useATag
      >
        {translate('lastPass')}
      </Link>
      <span> {translate('or')} </span>
      <Link
        to='https://1password.com/'
        target='_blank'
        className='underline italic'
        variant='gray-a0'
        useATag
      >
        {translate('1Password')}
      </Link>
      <span>.</span>
    </div>
  )

  const content = (
    <>
      <Password
        newPassword={newPassword}
        confirmPassword={confirmPassword}
        setNewPassword={setNewPassword}
        setConfirmPassword={setConfirmPassword}
        isMatch={!noMatch}
      />
      <div className='mt-[20px]'>
        {noMatch && (
          <div className='text-red-fe'>{translate('passwordsMustMatch')}</div>
        )}
        {renderSuggestPasswordContent()}
      </div>
    </>
  )

  const footer = (
    <Button
      variant='secondary'
      className='w-full font-extrabold'
      onClick={submitPassword}
      disabled={!newPassword || calcPasswordStrength(newPassword) < 2}
    >
      {translate('submitNewPassword')}
    </Button>
  )

  return (
    <>
      <Card
        title={translate('changePassword')}
        description={translate('changePasswordDescription')}
        content={content}
        footer={footer}
      />
      <SecurityPasswordModal
        isOpen={securityPassword}
        handleConfirm={handleConfirmChangePassword}
        setCurrentPassword={setCurrentPassword}
        error={error}
        status={status}
        handleClose={handleClose}
        qrcodeData={qrcodeData.join('')}
      />
    </>
  )
}
