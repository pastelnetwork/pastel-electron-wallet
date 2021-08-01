import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Upload, TUploadProps } from './Upload'

export default {
  title: 'Icons/Upload',
  component: Upload,
} as Meta

const Template: Story<TUploadProps> = ({ ...args }) => {
  return <Upload {...args} />
}

export const UploadIcon = Template.bind({})
UploadIcon.args = {
  size: 44,
}
