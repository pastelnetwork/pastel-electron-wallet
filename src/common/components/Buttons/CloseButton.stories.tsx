import React from 'react'
import { Story, Meta } from '@storybook/react'
import CloseButton, { TCloseButton } from './CloseButton'

const Template: Story<TCloseButton> = ({ disabled, ...args }) => {
  return <CloseButton disabled={disabled} {...args}></CloseButton>
}

export const CloseButtonDefault = Template.bind({})

const disabled = false
CloseButtonDefault.args = {
  disabled,
}

export default {
  component: CloseButton,
  title: 'Buttons/CloseButton',
} as Meta
