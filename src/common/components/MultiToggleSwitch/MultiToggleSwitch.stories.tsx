import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'

import MultiToggleSwitchComponent, { TProps, TItem } from './MultiToggleSwitch'

export default {
  title: 'MultiToggleSwitch',
  component: MultiToggleSwitchComponent,
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
    <MultiToggleSwitchComponent
      {...args}
      activeIndex={selectedItem}
      onToggle={setSelected}
    />
  )
}

export const MultiToggleSwitch = Template.bind({})
MultiToggleSwitch.args = {
  data,
  activeIndex: 0,
  containerClassName: '',
  itemInActiveClassName: '',
  itemActiveClassName: '',
  countInActiveClassName: '',
  countActiveClassName: '',
}
