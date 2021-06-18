import React from 'react'
import { Story, Meta } from '@storybook/react'
import Component, { TAlert } from './Alert'

const Template: Story<TAlert> = ({ variant, children, className }) => {
  return (
    <Component variant={variant} className={className}>
      {children}
    </Component>
  )
}

export const Success = Template.bind({})
Success.args = {
  variant: 'success',
  children: 'Alert Success',
  className: 'w-full',
}

export const Warning = Template.bind({})
Warning.args = {
  variant: 'warning',
  children: 'Alert Warning',
  className: 'w-full',
}

export const Error = Template.bind({})
Error.args = {
  variant: 'error',
  children: 'Alert Error',
  className: 'w-full',
}

export default {
  component: Component,
  title: 'Alert',
} as Meta
