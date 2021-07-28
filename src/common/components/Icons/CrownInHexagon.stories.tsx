import React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  CrownInHexagon as Icon,
  TCrownInHexagonProps as Props,
} from './CrownInHexagon'

export default {
  title: 'Icons/CrownInHexagon',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const CrownInHexagon = Template.bind({})
CrownInHexagon.args = {
  size: 30,
  className: 'text-green-45',
  fill: 'text-orange-ff',
}
