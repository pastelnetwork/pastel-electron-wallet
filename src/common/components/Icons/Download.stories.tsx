import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Download as Component, TDownloadProps as Props } from './Download'

export default {
  title: 'Icons/Download Icon',
  component: Component,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Download {...args} className='text-gray-33' />
}

export const Download = Template.bind({})
Download.args = {
  width: 44,
  height: 44,
  pathColor: 'white',
}
