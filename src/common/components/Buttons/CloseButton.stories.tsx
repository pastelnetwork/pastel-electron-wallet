import React from 'react'
import { Story, Meta } from '@storybook/react'
import CloseButton, { TCloseButton } from './CloseButton'

const Template: Story<TCloseButton> = ({ disabled, className, ...args }) => {
  return (
    <CloseButton
      disabled={disabled}
      className={className}
      {...args}
    ></CloseButton>
  )
}

export const CloseButtonDefault = Template.bind({})

const disabled = false
const className = ''
CloseButtonDefault.args = {
  disabled,
  className,
}

export default {
  component: CloseButton,
  title: 'Buttons/CloseButton',
} as Meta
