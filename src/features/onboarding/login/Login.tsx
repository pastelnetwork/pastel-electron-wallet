import React, { useState, FormEvent, useCallback } from 'react'

import Input from 'common/components/Inputs/Input'
import { Button } from 'common/components/Buttons'
import CloseButton from '../common/closeButton'
import Link from 'common/components/Link'
import { encode } from 'common/utils/encryption'

import * as ROUTES from 'common/utils/constants/routes'
import history from 'common/utils/history'
import { readUsersInfo, setAutoSignIn } from 'common/utils/User'
import { verifyPastelIdPassword } from 'api/pastel-rpc'
import { toast } from 'react-toastify'

export default function Login(): JSX.Element {
  const [isLoading, setLoading] = useState(false)
  const [isRestore, setRestore] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = useCallback(async () => {
    setLoading(true)
    setRestore(false)
    setErrorMessage('')
    const users = await readUsersInfo()
    if (!users.length) {
      setErrorMessage('Please restore your account from backup')
      setLoading(false)
      setRestore(true)
    } else {
      const user = users.find(
        u => u.username === username && u.newPassword === encode(password),
      )
      if (user) {
        try {
          const verify = await verifyPastelIdPassword({
            pastelId: user.pastelId,
            password: `${user.password}${user.username}`,
          })
          if (verify.signature) {
            setAutoSignIn({
              username: user.username,
              pastelId: user.pastelId,
            })
            setLoading(false)
            history.push(ROUTES.DASHBOARD)
          } else {
            setErrorMessage('Username or password is incorrect')
          }
        } catch (error) {
          toast(error.message, { type: 'error' })
          setLoading(false)
        }
      } else {
        setErrorMessage('Username or password is incorrect')
        setLoading(false)
      }
    }
  }, [username, password])

  const onUsernameChanged = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      setUsername(event.currentTarget.value)
    },
    [],
  )

  const onPasswordChanged = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      setPassword(event.currentTarget.value)
    },
    [],
  )

  const inValid = !username || !password ? true : false

  const renderRestoreAccountButton = () => {
    return (
      <div className='text-gray-71 text-h6 my-5'>
        Forgot your password?
        <Link className='text-link' to={ROUTES.PASSWORD_RECOVERY}>
          {' '}
          Restore access now
        </Link>
      </div>
    )
  }

  const renderErrorMessage = () => {
    if (isRestore) {
      return (
        <div className='link mb-2'>
          Please&nbsp;
          <Link to={`${ROUTES.PASSWORD_RECOVERY}?isRestore=true`}>
            restore account from backup
          </Link>
          &nbsp; before login.
        </div>
      )
    }

    if (errorMessage) {
      return <div className='text-red-fe mb-2'>{errorMessage}</div>
    }

    return null
  }

  return (
    <div className='w-[398px] my-9 mx-60px'>
      <CloseButton gotoUrl={ROUTES.WELCOME_PAGE} />
      <div className='text-h1-heavy text-gray-2d mb-3'>Login</div>
      <form className='flex flex-col mt-30px'>
        {renderErrorMessage()}
        <Input
          name='username'
          label='Username'
          placeholder='i.e banksy168'
          className='mt-4 mb-6'
          onChange={onUsernameChanged}
          value={username}
        />
        <Input
          type='password'
          name='password'
          label='Password'
          onChange={onPasswordChanged}
          value={password}
        />
        {renderRestoreAccountButton()}
        <Button
          className='w-full'
          type='button'
          onClick={onSubmit}
          disabled={isLoading || inValid}
        >
          Login
        </Button>
      </form>
      <div className='flex justify-center text-gray-a0 font-medium text-h6 mt-30px'>
        <span className='mr-1'>Don{"'"}t have an account?</span>
        <Link className='text-link' to={ROUTES.SIGN_UP}>
          Register on Pastel
        </Link>
      </div>
    </div>
  )
}

Login.defaultProps = {
  pastelId: undefined,
}
