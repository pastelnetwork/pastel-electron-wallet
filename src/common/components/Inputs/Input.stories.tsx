import React from 'react'
import { Story, Meta } from '@storybook/react'
import Input, { TInput } from './Input'

export const InputDefault: Story<TInput> = () => (
  <Input type='text' label='Label' hint='hint' placeholder='placeholder' />
)

export default {
  component: Input,
  title: 'Inputs/Input',
} as Meta
