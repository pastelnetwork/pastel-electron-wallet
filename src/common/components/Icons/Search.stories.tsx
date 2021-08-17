import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Search as Icon, TSearchProps as Props } from './Search'

export default {
  title: 'Icons/Search Icon',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} className='text-gray-33' />
}

export const Search = Template.bind({})
Search.args = {
  size: 17,
}
