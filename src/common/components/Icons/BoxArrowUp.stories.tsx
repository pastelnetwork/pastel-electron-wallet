import React from 'react'
import { Story, Meta } from '@storybook/react'

import { BoxArrowUp as Icon, TBoxArrowUpProps as Props } from './BoxArrowUp'

export default {
  title: 'Icons/Box Arrow Up',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const BoxArrowUp = Template.bind({})
BoxArrowUp.args = {
  size: 30,
  className: 'text-black',
}
