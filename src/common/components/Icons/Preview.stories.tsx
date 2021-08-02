import React from 'react'
import { Story, Meta } from '@storybook/react'

import { PreviewIco as Icon, TPreviewIcoProps as Props } from './Preview'

export default {
  title: 'Icons/Preview Ico',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const SimplePreviewIcon = Template.bind({})
SimplePreviewIcon.args = {
  size: 20,
  className: 'text-white',
}
