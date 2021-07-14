import React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  CreditCard as Component,
  TCreditCardProps as Props,
} from './CreditCard'

export default {
  title: 'Icons/CreditCard Icon',
  component: Component,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <CreditCard {...args} className='text-gray-33' />
}

export const CreditCard = Template.bind({})
CreditCard.args = {
  width: 44,
  height: 44,
  pathColor: 'white',
}
