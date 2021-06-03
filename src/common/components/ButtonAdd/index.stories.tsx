import React from 'react'
import { Story, Meta } from '@storybook/react'
import ButtonAdd, { ButtonAddProps } from './index'

export const ButtonAddDefault: Story<ButtonAddProps> = () => <ButtonAdd />

export default {
  component: ButtonAdd,
  title: 'Button-Add',
} as Meta
