import React from 'react'
import { Story, Meta } from '@storybook/react'
import CustomButton, { TCustomButton } from './CustomButton'

const Template: Story<TCustomButton> = ({ type, disabled, ...args }) => {
  return <CustomButton type={type} disabled={disabled} {...args}></CustomButton>
}

export const CustomButtonDefault = Template.bind({})
const type = 'add'
const disabled = false
CustomButtonDefault.args = {
  type,
  disabled,
}

export default {
  component: CustomButton,
  title: 'CustomButton',
} as Meta
