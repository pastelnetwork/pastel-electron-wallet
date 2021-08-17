import React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  EliminationIcon as Icon,
  TEliminationIcon as Props,
} from './EliminationIcon'

export default {
  title: 'Icons/Elimination Icon',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} className='text-gray-8e' />
}

export const EliminationIcon = Template.bind({})
EliminationIcon.args = {
  size: 20,
}
