import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Fire, TFireProps } from './Fire'

export default {
  title: 'Fire',
  component: Fire,
} as Meta

const Template: Story<TFireProps> = ({ ...args }) => {
  return <Fire {...args} />
}

const className = 'text-blue-3f'

export const PencilDefault = Template.bind({})
PencilDefault.args = {
  size: 40,
  className,
}
