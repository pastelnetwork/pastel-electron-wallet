import React from 'react'
import { Story, Meta } from '@storybook/react'

import { UploadFile as Icon, TUploadFileProps as Props } from './UploadFile'

export default {
  title: 'Icons/Upload File',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const UploadFileType1 = Template.bind({})
UploadFileType1.args = {
  size: 30,
  className: 'text-black',
}

export const UploadFileType2 = Template.bind({})
UploadFileType2.args = {
  size: 30,
  className: 'text-gray-88',
  variant: 'full',
}
