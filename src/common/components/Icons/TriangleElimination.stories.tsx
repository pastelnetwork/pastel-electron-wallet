import React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  TriangleElimination as Component,
  TriangleElimination,
  TTriangleEliminationProps as Props,
} from './TriangleElimination'

export default {
  title: 'Icons/Triangle Elimination Icon',
  component: Component,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <TriangleElimination {...args} />
}

export const SimpleTriangleEliminationIcon = Template.bind({})
SimpleTriangleEliminationIcon.args = {
  size: 44,
  className: 'text-red-63',
}
