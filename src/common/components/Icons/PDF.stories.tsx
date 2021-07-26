import React from 'react'
import { Story, Meta } from '@storybook/react'

import { PDF as Component, PDF, TPDFProps as Props } from './PDF'

export default {
  title: 'Icons/PDF Icon',
  component: Component,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <PDF {...args} className='text-red-fa' />
}

export const SimplePDFIcon = Template.bind({})
SimplePDFIcon.args = {
  size: 24,
}
