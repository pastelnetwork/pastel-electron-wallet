import * as React from 'react'
import { useHistory } from 'react-router-dom'

import { Input, InputPassword } from 'common/components/Inputs'
import { Button } from 'common/components/Buttons'
import CloseButton from '../common/closeButton'
import Link from 'common/components/Link'
import Typography, {
  TypographyVariant,
} from 'common/components/Typography/Typography'

import * as ROUTES from 'common/utils/constants/routes'

interface ILoginFormInput {
  value: string
  hasError: boolean
  isTouched: boolean
}

const initialInputState = {
  value: '',
  hasError: false,
  isTouched: false,
}

const Login = (): JSX.Element => {
  const history = useHistory()

  const [username, setUsername] = React.useState<ILoginFormInput>(
    initialInputState,
  )
  const [password, setPassword] = React.useState<ILoginFormInput>(
    initialInputState,
  )

  return (
    <div className='w-[398px] my-9 mx-60px'>
      <CloseButton gotoUrl={ROUTES.WELCOME_PAGE} />
      <Typography
        variant={TypographyVariant.h1}
        customColor='text-gray-2d'
        customFontWeight='font-extrabold'
      >
        Login
      </Typography>
      <form className='flex flex-col mt-30px'>
        <Input
          type='text'
          label='Username'
          placeholder='i.e banksy168'
          value={username.value}
          labelClassName='inline-block text-gray-71 text-h4 pb-2.5 font-medium'
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setUsername({
              ...username,
              value: event.currentTarget.value,
            })
          }
          ref={null}
          errorMessage={
            username.hasError ? 'Please enter a valid username' : null
          }
          className='mb-6'
        />
        <InputPassword
          type='password'
          label='Password'
          labelClassName='inline-block text-gray-71 text-h4 pb-2.5 font-medium'
          value={password.value}
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setPassword({
              ...password,
              value: event.currentTarget.value,
            })
          }
          ref={null}
          errorMessage={
            password.hasError ? 'Please enter a valid password' : null
          }
        />
        <div className='text-gray-71 text-h6 my-5'>
          Forgot your password?
          <Link className='text-link' href={ROUTES.PASSWORD_RECOVERY}>
            {' '}
            Restore access now
          </Link>
        </div>
        <Button
          className='w-full'
          type='submit'
          onClick={() => {
            history.push(ROUTES.DASHBOARD)
          }}
        >
          Login
        </Button>
      </form>
      <div className='flex justify-center text-gray-a0 font-medium text-h6 mt-30px'>
        <span className='mr-1'>Don't have an account?</span>
        <Link className='text-link' href={ROUTES.SIGN_UP}>
          Sign Up
        </Link>
      </div>
    </div>
  )
}

export default Login
