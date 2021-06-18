import React from 'react'
import { Story, Meta } from '@storybook/react'

import Component, { TTextAreaProps as TProps } from './TextArea'
import { useForm } from 'react-hook-form'

export default {
  title: 'Form/TextArea',
  component: Component,
} as Meta

const Template: Story<TProps<Record<string, string>>> = ({ ...args }) => {
  const form = useForm()

  return <Component {...args} form={form} />
}

export const TextArea = Template.bind({})
TextArea.args = {
  name: 'description',
  label: 'Description',
  placeholder: 'placeholder',
  maxLength: 200,
}
