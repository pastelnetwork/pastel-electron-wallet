import React from 'react'
import { Story, Meta } from '@storybook/react'
import Button, { ButtonProps } from './index'

const Template: Story<ButtonProps> = ({
  children,
  variant,
  href,
  disabled,
  fluid,
  ...args
}) => {
  return (
    <Button
      variant={variant}
      href={href}
      disabled={disabled}
      fluid={fluid}
      {...args}
    >
      {children}
    </Button>
  )
}

export const ButtonDefault = Template.bind({})
const children = 'Button'
const variant = 'default'
const disabled = false
const fulid = false
ButtonDefault.args = {
  children,
  variant,
  disabled,
  fulid,
}

export default {
  component: Button,
  title: 'Button',
} as Meta
