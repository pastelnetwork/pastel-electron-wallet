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

export const UploadFile = Template.bind({})
UploadFile.args = {
  size: 30,
  className: 'text-black',
}
