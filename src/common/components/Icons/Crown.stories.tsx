import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Crown as Icon, TCrownProps as Props } from './Crown'

export default {
  title: 'Icons/Crown',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const Crown = Template.bind({})
Crown.args = {
  size: 30,
  className: 'text-orange-ffc',
}
