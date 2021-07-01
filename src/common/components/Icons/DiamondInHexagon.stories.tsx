import React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  DiamondInHexagon as Icon,
  TDiamondInHexagonProps as Props,
} from './DiamondInHexagon'

export default {
  title: 'Icons/DiamondInHexagon',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const DiamondInHexagon = Template.bind({})
DiamondInHexagon.args = {
  size: 30,
  className: 'text-green-45',
  fill: 'text-white',
  firstStopClassName: 'text-blue-16',
  secondStopClassName: 'text-blue-23',
}
