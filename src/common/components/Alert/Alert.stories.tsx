import React from 'react'
import { Story, Meta } from '@storybook/react'
import Alert, { TAlert } from './Alert'

const Template: Story<TAlert> = ({ variant, children, className }) => {
  return (
    <Alert variant={variant} className={className}>
      {children}
    </Alert>
  )
}

export const AlertSuccessDefault = Template.bind({})
const variant = 'success'
const children = 'Alert Success'
const className = 'w-full'
AlertSuccessDefault.args = {
  variant,
  children,
  className,
}

export default {
  component: Alert,
  title: 'Alert',
} as Meta
