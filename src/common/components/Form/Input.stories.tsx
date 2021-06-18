import React from 'react'
import { Story, Meta } from '@storybook/react'

import Component, { TInputProps as TProps } from './Input'
import { useForm } from 'react-hook-form'

export default {
  title: 'Form/Input',
  component: Component,
} as Meta

const Template: Story<TProps<Record<string, string>>> = ({ ...args }) => {
  const form = useForm()

  return <Component {...args} form={form} />
}

export const TextArea = Template.bind({})
TextArea.args = {
  name: 'textInput',
  label: 'Text input',
  placeholder: 'placeholder',
  className: 'w-56',
}
