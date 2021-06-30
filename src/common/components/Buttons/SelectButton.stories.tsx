import React from 'react'
import { Story, Meta } from '@storybook/react'
import SelectButton, { TSelectButton } from './SelectButton'

export const SelectButtonDefault: Story<TSelectButton> = () => (
  <SelectButton>Select Button</SelectButton>
)

export default {
  component: SelectButton,
  title: 'Select Button',
} as Meta
