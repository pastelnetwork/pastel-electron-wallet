import React, { useState } from 'react'

import Input from 'common/components/Form/Input'
import { Button } from 'common/components/Buttons'
import CloseButton from '../common/closeButton'
import Link from 'common/components/Link'

import * as ROUTES from 'common/utils/constants/routes'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  TPastelIdWithTxIdAndConfirmed,
  useVerifyPastelIdPassword,
} from '../../../api/pastel-rpc'
import history from '../../../common/utils/history'

const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
})

type TSchema = ReturnType<typeof schema.validateSync>

const Login = ({
  pastelId,
}: {
  pastelId?: TPastelIdWithTxIdAndConfirmed
}): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState('')
  const form = useForm<TSchema>({
    resolver: yupResolver(schema),
  })

  const verifyPassword = useVerifyPastelIdPassword({
    onSuccess() {
      history.push(ROUTES.DASHBOARD)
    },
  })

  const onSubmit = () => {
    history.push(ROUTES.DASHBOARD)
    setErrorMessage('')
    if (!pastelId) {
      setErrorMessage('Account does not exist')
      return
    }

    const { password, username } = form.getValues()
    verifyPassword.mutate({
      pastelId: pastelId.pastelid,
      password: `${password}${username}`,
    })
  }

  return (
    <div className='w-[398px] my-9 mx-60px'>
      <CloseButton gotoUrl={ROUTES.ONBOARDING} />
      <div className='text-h1-heavy text-gray-2d mb-3'>Login</div>
      <form
        className='flex flex-col mt-30px'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {verifyPassword.error && (
          <div className='text-red-fe mb-2'>
            Username or password is incorrect
          </div>
        )}
        {errorMessage ? (
          <div className='text-red-fe mb-2'>{errorMessage}</div>
        ) : null}
        <Input
          form={form}
          name='username'
          label='Username'
          labelClass='inline-block text-gray-71 text-h4 pb-2.5 font-medium'
          placeholder='i.e banksy168'
          className='mt-4 mb-6'
        />
        <Input
          form={form}
          type='password'
          name='password'
          label='Password'
          labelClass='inline-block text-gray-71 text-h4 pb-2.5 font-medium'
        />
        <div className='text-gray-71 text-h6 my-5'>
          Forgot your password?
          <Link className='text-link' to={ROUTES.PASSWORD_RECOVERY}>
            {' '}
            Restore access now
          </Link>
        </div>
        <Button className='w-full' type='submit'>
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

export default Login
