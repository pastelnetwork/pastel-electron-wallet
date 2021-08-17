import React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  ManInHexagon as Icon,
  TManInHexagonProps as Props,
} from './ManInHexagon'

export default {
  title: 'Icons/ManInHexagon',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const ManInHexagon = Template.bind({})
ManInHexagon.args = {
  size: 30,
  className: 'text-green-45',
  fill: 'text-white',
  firstStopClassName: 'text-green-16',
  secondStopClassName: 'text-green-23',
}
