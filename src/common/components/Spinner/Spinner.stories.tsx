import React from 'react'
import { Story, Meta } from '@storybook/react'

import Component, { TProps } from './Spinner'

export default {
  title: 'Spinner',
  component: Component,
} as Meta

const Template: Story<TProps> = props => {
  return <Component {...props} />
}

export const Spinner = Template.bind({})
Spinner.args = {
  className: 'text-success w-8 h-8',
}
