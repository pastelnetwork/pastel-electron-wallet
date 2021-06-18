import React from 'react'
import { Story, Meta } from '@storybook/react'
import { TInput } from './Input'
import InputNumberFormat from './InputNumberFormat'

export const InputNumberFormatDefault: Story<TInput> = () => (
  <InputNumberFormat
    type='text'
    displayType='input'
    label='Label'
    hint='hint'
    placeholder='placeholder'
  />
)

export default {
  component: InputNumberFormat,
  title: 'Inputs/InputNumberFormat',
} as Meta
