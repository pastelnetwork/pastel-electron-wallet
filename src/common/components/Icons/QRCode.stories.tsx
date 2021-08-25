import React from 'react'
import { Story, Meta } from '@storybook/react'

import { QRCode as Icon, TQRCodeProps as Props } from './QRCode'

export default {
  title: 'Icons/QRCode Icon',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const QRCodeIcon = Template.bind({})
QRCodeIcon.args = {
  size: 20,
  className: 'text-gray-88',
}
