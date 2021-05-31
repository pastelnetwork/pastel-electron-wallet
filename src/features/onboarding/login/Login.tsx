import * as React from 'react'
import { Link } from 'react-router-dom'

import Input from '../../../common/components/Input/Input'
import Button from '../../../common/components/Button/Button'
import Typography from '../../../common/components/Typography/Typography'

import * as ROUTES from '../../../common/utils/constants/routes'

import * as Styles from './Login.styles'

interface LoginFormInput {
  value: string
  hasError: boolean
  isTouched: boolean
}

export interface LoginProps {
  setUser: React.Dispatch<React.SetStateAction<boolean>>
}

const initialInputState = {
  value: '',
  hasError: false,
  isTouched: false,
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const [username, setUsername] = React.useState<LoginFormInput>(
    initialInputState,
  )
  const [password, setPassword] = React.useState<LoginFormInput>(
    initialInputState,
  )

  return (
    <Styles.Container>
      <Typography variant='h1' weight={800}>
        Login
      </Typography>
      <Styles.Form>
        <Input
          type='text'
          label='User name'
          placeholder='i.e banksy168'
          value={username.value}
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
        />
        <Input
          type='password'
          label='Password'
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
        <Styles.FooterText>
          Forgot your password?
          <Styles.FooterLink to={ROUTES.PASSWORD_RECOVERY}>
            {' '}
            Restore access now
          </Styles.FooterLink>
        </Styles.FooterText>
        <Styles.Button type='submit' onClick={() => setUser(true)}>
          Submit
        </Styles.Button>
      </Styles.Form>
      <Link to={ROUTES.SIGN_UP}>
        <Button variant='transparent' style={{ width: '100%' }}>
          Don't have an account? Sign up
        </Button>
      </Link>
    </Styles.Container>
  )
}

export default Login
