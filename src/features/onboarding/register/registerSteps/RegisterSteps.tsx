import React, { useState, FormEvent } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import { Input } from '../../../../common/components/Inputs'
import Checkbox from '../../../../common/components/Checkbox/Checkbox'
import { NextButton } from '../Buttons'

type TFormData = {
  username: string
  password: string
}

export type TForm = UseFormReturn<TFormData>

interface LoginFormInput {
  value: string
  hasError: boolean
  isTouched: boolean
}

const initialInputState = {
  value: '',
  hasError: false,
  isTouched: false,
}

const usernameMinLength = 4
const passMinLength = 8

const schema = yup.object().shape({
  username: yup.string().label('User Name').min(usernameMinLength).required(),
  password: yup.string().label('Password').min(passMinLength).required(),
})

export type TStepRegisterProps = {
  goNext(): void
}

const StepRegister = (props: TStepRegisterProps): JSX.Element => {
  const [username, setUsername] = useState<LoginFormInput>(initialInputState)
  const [password, setPassword] = useState<LoginFormInput>(initialInputState)
  const [isChecked, setIsChecked] = useState(false)

  const onAgreementClicked = (selected: boolean) => {
    setIsChecked(selected)
  }

  const onUsernameChanged = (event: FormEvent<HTMLInputElement>) => {
    // validate user name
    setUsername({
      ...username,
      value: event.currentTarget.value,
      hasError: true,
    })
  }

  const form = useForm<TFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const submit = () => {
    //const values = form.getValues()
    //goToNextStep()
  }

  const nextActive = !username.hasError && !password.hasError && isChecked

  return (
    <div className='pt-12 flex flex-col h-full'>
      <form className='flex-grow' onSubmit={form.handleSubmit(submit)}>
        <Input
          form={form}
          className='w-full'
          type='text'
          label='User name'
          placeholder='i.e banksy168'
          value={username.value}
          onChange={onUsernameChanged}
          ref={null}
          errorMessage={
            username.hasError ? 'Please enter a valid username' : null
          }
        />
        <div className=' mt-6'>
          <Input
            form={form}
            className='w-full'
            type='password'
            label='Password'
            value={password.value}
            onChange={(event: FormEvent<HTMLInputElement>) =>
              setPassword({
                ...password,
                value: event.currentTarget.value,
              })
            }
            ref={null}
            errorMessage={
              password.hasError ? 'Please enter a valid password' : null
            }
            hint='at least 8 characters and at least 2 numbers'
          />
        </div>

        <div className='mt-6'>
          <Checkbox isChecked={isChecked} clickHandler={onAgreementClicked}>
            I certify that I’m 18 years of age or older, and agree to the{' '}
            <Link to='#' className='link'>
              User Agreement and Privacy Policy
            </Link>
          </Checkbox>
        </div>
      </form>

      <div className='mt-7 flex justify-end'>
        <NextButton
          onClick={() => props.goNext()}
          text='Next step 2'
          active={nextActive}
        />
      </div>
    </div>
  )
}

export default StepRegister
