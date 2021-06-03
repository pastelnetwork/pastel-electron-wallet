import React from 'react'
import { Story, Meta } from '@storybook/react'
import Alert, { AlertProps } from './index'

const Template: Story<AlertProps> = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>
}

export const AlertSuccessDefault = Template.bind({})
const variant = 'success'
const children = 'Alert Sucess'
AlertSuccessDefault.args = {
  variant,
  children,
}

export default {
  component: Alert,
  title: 'Alert',
} as Meta
