import React from 'react'
import { Story, Meta } from '@storybook/react'
import ButtonClose, { ButtonCloseProps } from './index'

export const ButtonCloseDefault: Story<ButtonCloseProps> = ({ disabled }) => (
  <ButtonClose disabled={disabled} />
)

export default {
  component: ButtonClose,
  title: 'Button Close',
} as Meta
