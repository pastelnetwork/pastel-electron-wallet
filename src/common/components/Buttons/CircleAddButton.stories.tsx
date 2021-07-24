import React from 'react'
import { Meta } from '@storybook/react'
import CircleAddButton from './CircleAddButton'

export const CircleAddButtonDefault = (): JSX.Element => (
  <CircleAddButton className=''></CircleAddButton>
)

export default {
  component: CircleAddButton,
  title: 'Buttons/CircleAddButton',
} as Meta
