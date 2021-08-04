import React from 'react'
import { Story, Meta } from '@storybook/react'

import { EditImage as Icon, TEditImage as Props } from './EditImage'

export default {
  title: 'Icons/Edit Image',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const EditImage = Template.bind({})
EditImage.args = {
  size: 30,
  className: 'text-black',
}
