import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Search as Component, TSearchProps as Props } from './Search'

export default {
  title: 'Icons/Search Icon',
  component: Component,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Search {...args} className='text-gray-33' />
}

export const Search = Template.bind({})
Search.args = {
  width: 17,
  height: 16,
}
