import React from 'react'
import { Story, Meta } from '@storybook/react'

import { FilePDFIcon as Icon, TFilePDF as Props } from './FilePDF'

export default {
  title: 'Icons/PDF Icon',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} className='text-gray-88' />
}

export const TextIcon = Template.bind({})
TextIcon.args = {
  size: 20,
}
