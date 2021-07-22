import React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  DownloadArrow as Icon,
  TDownloadArrowProps as Props,
} from './DownloadArrow'

export default {
  title: 'Icons/Download Arrow Icon',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} className='text-blue-3f' />
}

export const SimpleDownloadArrow = Template.bind({})
SimpleDownloadArrow.args = {
  size: 24,
}
