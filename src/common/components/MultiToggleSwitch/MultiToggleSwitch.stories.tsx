import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'

import MultiToggleSwitch, { TProps, TItem } from './MultiToggleSwitch'

export default {
  title: 'MultiToggleSwitch',
  component: MultiToggleSwitch,
} as Meta

const data: TItem[] = [
  {
    label: 'General',
  },
  {
    label: 'Board',
    count: 12,
  },
  {
    label: 'Security',
  },
]

const Template: Story<TProps> = ({ activeIndex, ...args }) => {
  const [selectedItem, setSelected] = useState(activeIndex)

  return (
    <MultiToggleSwitch
      {...args}
      activeIndex={selectedItem}
      onToggle={setSelected}
    />
  )
}

export const Switch = Template.bind({})
Switch.args = {
  data,
  activeIndex: 0,
  containerClassName: '',
  itemInActiveClassName: '',
  itemActiveClassName: '',
  countInActiveClassName: '',
  countActiveClassName: '',
}
