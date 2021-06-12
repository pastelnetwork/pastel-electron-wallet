import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Bookmark as Icon, TBookmarkProps as Props } from './Bookmark'

export default {
  title: 'Icons/Bookmark',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const Bookmark = Template.bind({})
Bookmark.args = {
  size: 30,
  className: 'text-black',
}
