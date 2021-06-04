import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'

import Toggle, { TToggleProps } from './index'

export default {
  title: 'Toggle',
  component: Toggle,
} as Meta

const Template: Story<TToggleProps> = ({ selected, ...args }: TToggleProps) => {
  const [select, setSelect] = useState(selected)
  return (
    <Toggle
      {...args}
      selected={select}
      toggleHandler={checked => setSelect(checked)}
    />
  )
}

export const SimpleToggle = Template.bind({})
SimpleToggle.args = {
  classNames: 'w-34px h-5 rounded-full',
  selectedClass: 'bg-green-68',
  selected: false,
}
