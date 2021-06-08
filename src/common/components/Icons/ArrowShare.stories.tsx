import React from 'react'
import { Story, Meta } from '@storybook/react'

import { ArrowShare as Icon, TArrowShareProps as Props } from './ArrowShare'

export default {
  title: 'Icons/Arrow Share',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const ArrowShare = Template.bind({})
ArrowShare.args = {
  size: 30,
  className: 'text-black',
}
