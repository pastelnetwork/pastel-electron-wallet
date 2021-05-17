import * as React from 'react';
import { useForm, SubmitHandler, Controller, SubmitErrorHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import * as ROUTES from '../../utils/constants/routes';

import * as Styles from './Login.styles';

interface Inputs {
  login: string;
  password: string;
}

interface LoginFormInput {
  value: string;
  hasError: boolean;
  isTouched: boolean;
}

const initialInputState = {
  value: '',
  hasError: false,
  isTouched: false,
};

const Login: React.FC = () => {
  const { control, handleSubmit } = useForm();
  const [username, setUsername] = React.useState<LoginFormInput>(initialInputState);
  const [password, setPassword] = React.useState<LoginFormInput>(initialInputState);

  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data);
  };

  const onError: SubmitErrorHandler<Inputs> = error => {
    console.log(error);
  };

  return (
    <Styles.Container>
      <Styles.Title>Login</Styles.Title>
      <Styles.Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Controller
          name='username'
          control={control}
          defaultValue={username.value}
          rules={{ required: true, minLength: 2 }}
          render={({ field }) => (
            <Input
              type='text'
              label='User name'
              placeholder='i.e banksy168'
              {...field}
              ref={null}
              errorMessage={username.hasError ? 'Please enter a valid username' : null}
            />
          )}
        />
        <Controller
          name='password'
          control={control}
          defaultValue={password.value}
          rules={{ required: true, minLength: 8 }}
          render={({ field }) => (
            <Input
              type='password'
              label='Password'
              {...field}
              ref={null}
              errorMessage={password.hasError ? 'Please enter a valid password' : null}
            />
          )}
        />
        <Styles.FooterText>
          Forgot your password?
          <Styles.FooterLink to={ROUTES.PASSWORD_RECOVERY}> Restore access now</Styles.FooterLink>
        </Styles.FooterText>
        <Styles.Button type='submit'>Submit</Styles.Button>
      </Styles.Form>
      <Link to={ROUTES.SIGN_UP}>
        <Button variant='transparent'>Don't have an account? Sign up</Button>
      </Link>
    </Styles.Container>
  );
};

export default Login;
