import React from 'react'
import { Story, Meta } from '@storybook/react'

import { SaveIcon as Icon, TSaveProps as Props } from './SaveIcon'

export default {
  title: 'Icons/Save Icon',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} className='text-gray-33' />
}

export const SaveIcon = Template.bind({})
SaveIcon.args = {
  size: 20,
}
