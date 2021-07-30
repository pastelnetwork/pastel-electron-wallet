import React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  ElectricityIcon as Icon,
  TElectricityIcon as Props,
} from './ElectricityIcon'

export default {
  title: 'Icons/Electricity Icon',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} className='text-blue-3f' />
}

export const ElectricityIcon = Template.bind({})
ElectricityIcon.args = {
  size: 20,
}
