import React from 'react'
import { Story, Meta } from '@storybook/react'
import { TInput } from './Input'
import InputPassword from './InputPassword'

export const InputPasswordDefault: Story<TInput> = () => (
  <InputPassword label='Your password' />
)

export default {
  component: InputPassword,
  title: 'Inputs/InputPassword',
} as Meta
