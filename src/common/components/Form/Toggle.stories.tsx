import React from 'react'
import { Story, Meta } from '@storybook/react'

import Component, { TToggleProps as TProps } from './Toggle'
import { useForm } from 'react-hook-form'

export default {
  title: 'Form/Toggle',
  component: Component,
} as Meta

const Template: Story<TProps<Record<string, string>>> = ({ name }) => {
  const form = useForm()

  return <Component form={form} name={name} />
}

export const Toggle = Template.bind({})
Toggle.args = {
  name: 'name',
}
