import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Instagram as Icon, TInstagramProps as Props } from './Instagram'

export default {
  title: 'Icons/Instagram',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const Instagram = Template.bind({})
Instagram.args = {
  size: 30,
  className: 'text-black',
}
