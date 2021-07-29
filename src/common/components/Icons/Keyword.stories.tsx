import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Keyword as Icon, TKeywordProps as Props } from './Keyword'

export default {
  title: 'Icons/Keyword Icon',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} className='text-black' />
}

export const Keyword = Template.bind({})
Keyword.args = {
  size: 14,
}
