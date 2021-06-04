import React from 'react'
import { Story, Meta } from '@storybook/react'

import Toggle, { TToggleProps } from './Toggle'

export default {
  title: 'Toggle',
  component: Toggle,
} as Meta

const Template: Story<TToggleProps> = ({ ...args }: TToggleProps) => {
  return <Toggle {...args} />
}

export const SimpleToggle = Template.bind({})
SimpleToggle.args = {
  classNames: 'w-34px h-5 rounded-full',
  selectedClass: 'bg-green-68',
  toggleHandler: e => {
    console.log(e)
  },
}
