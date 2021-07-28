import React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  FirTreeInHexagon as Icon,
  TFirTreeInHexagonProps as Props,
} from './FirTreeInHexagon'

export default {
  title: 'Icons/Fir Tree In Hexagon',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const FirTreeInHexagon = Template.bind({})
FirTreeInHexagon.args = {
  size: 30,
  className: 'text-green-45',
  fill: 'text-white',
}
