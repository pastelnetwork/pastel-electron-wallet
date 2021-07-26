import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Download as Icon, TDownloadProps as Props } from './Download'

export default {
  title: 'Icons/Download Icon',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} className='text-gray-33' />
}

export const Download = Template.bind({})
Download.args = {
  size: 44,
  pathColor: 'white',
}
