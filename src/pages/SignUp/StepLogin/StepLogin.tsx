import * as React from 'react'

import * as Styles from './StepLogin.styles'

const StepLogin: React.FC<unknown> = () => (
  <>
    <Styles.LoginInput
      type='text'
      placeholder='i.e banksy168'
      label='User name'
    />
    <Styles.PasswordInput
      type='password'
      placeholder='•••••••'
      label='Password'
    />
    <Styles.PasswordHint>
      at least 8 characters and at least 2 numbers
    </Styles.PasswordHint>
  </>
)

export default StepLogin
