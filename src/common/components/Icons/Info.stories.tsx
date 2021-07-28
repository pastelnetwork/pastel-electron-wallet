import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Info as Icon, TInfoProps as Props } from './Info'

export default {
  title: 'Icons/Info',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const Info = Template.bind({})
Info.args = {
  size: 30,
  className: 'text-black',
}
