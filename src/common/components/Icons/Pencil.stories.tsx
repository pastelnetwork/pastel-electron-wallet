import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Pencil, TPencilProps } from './Pencil'

export default {
  title: 'Pencil',
  component: Pencil,
} as Meta

const Template: Story<TPencilProps> = ({ ...args }) => {
  return <Pencil {...args} />
}

const className = 'text-blue-3f'

export const PencilDefault = Template.bind({})
PencilDefault.args = {
  size: 40,
  className,
}
