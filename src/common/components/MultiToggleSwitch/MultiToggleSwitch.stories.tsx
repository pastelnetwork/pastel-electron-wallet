import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'

import MultiToggleSwitchComponent, {
  TMultiToggle,
  TMultiToggleDataItem,
} from './MultiToggleSwitch'

export default {
  title: 'MultiToggleSwitch',
  component: MultiToggleSwitchComponent,
} as Meta

const data: TMultiToggleDataItem[] = [
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

const Template: Story<TMultiToggle> = ({ activeIndex, ...args }) => {
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
  itemInactiveClassName: '',
  itemActiveClassName: '',
  countInactiveClassName: '',
  countActiveClassName: '',
}
