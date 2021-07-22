import React from 'react'
import { Story, Meta } from '@storybook/react'

import { CreditCard as Icon, TCreditCardProps as Props } from './CreditCard'

export default {
  title: 'Icons/CreditCard Icon',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} className='text-gray-33' />
}

export const CreditCard = Template.bind({})
CreditCard.args = {
  size: 44,
  pathColor: 'white',
}
