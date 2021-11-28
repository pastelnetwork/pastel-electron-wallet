import React from 'react'
import { Meta } from '@storybook/react'
import CircleAddButton from './CircleAddButton'

export function CircleAddButtonDefault(): JSX.Element {
  return <CircleAddButton className='' />
}

export default {
  component: CircleAddButton,
  title: 'Buttons/CircleAddButton',
} as Meta
