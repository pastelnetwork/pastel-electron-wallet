import React from 'react'
import { Story, Meta } from '@storybook/react'

import { RefreshIcon as Icon, TRefreshIconProps as Props } from './RefreshIcon'

export default {
  title: 'Icons/Refresh Icon',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const RefreshIconWithoutCircle = Template.bind({})
RefreshIconWithoutCircle.args = {
  size: 16,
  className: 'text-blue-3f',
}
