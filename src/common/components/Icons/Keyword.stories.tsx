import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Keyword as Component, TKeywordProps as Props } from './Keyword'

export default {
  title: 'Icons/Keyword Icon',
  component: Component,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Keyword {...args} className='text-black' />
}

export const Keyword = Template.bind({})
Keyword.args = {
  width: 14,
  height: 14,
}
