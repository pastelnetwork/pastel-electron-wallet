import React from 'react'
import { Story, Meta } from '@storybook/react'
import Input, { InputProps } from './index'

const Template: Story<InputProps> = ({
  type,
  prepend,
  append,
  isValid,
  label,
  placeholder,
  id,
  hint,
  errorMessage,
  disabled,
  ...args
}) => {
  return (
    <Input
      type={type}
      label={label}
      hint={hint}
      errorMessage={errorMessage}
      placeholder={placeholder}
      isValid={isValid}
      disabled={disabled}
      prepend={prepend}
      append={append}
      id={id}
      {...args}
    />
  )
}

export const InputDefault = Template.bind({})
const type = 'text'
const label = 'Label'
const hint = 'hint'
const disabled = false
const placeholder = 'placeholder'
const isValid = false
const id = 'id'
InputDefault.args = {
  type,
  label,
  hint,
  disabled,
  placeholder,
  isValid,
  id,
}

export default {
  component: Input,
  title: 'Input',
} as Meta
