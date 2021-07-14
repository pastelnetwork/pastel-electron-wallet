import React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  DownloadArrow as Component,
  DownloadArrow,
  TDownloadArrowProps as Props,
} from './DownloadArrow'

export default {
  title: 'Icons/Download Arrow Icon',
  component: Component,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <DownloadArrow {...args} className='text-blue-3f' />
}

export const SimpleDownloadArrow = Template.bind({})
SimpleDownloadArrow.args = {
  width: 24,
  height: 24,
}
