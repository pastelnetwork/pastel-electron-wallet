import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'

import AutoComplete, { AutoCompleteProps } from './AutoComplete'

export default {
  title: 'AutoComplete',
  component: AutoComplete,
} as Meta

const Template: Story<AutoCompleteProps> = ({ selected, ...args }) => {
  const [selectedItem, setSelected] = useState(selected)

  return (
    <AutoComplete {...args} selected={selectedItem} onChange={setSelected} />
  )
}

export const SimpleAutocomplete = Template.bind({})
const startNumber = 10000
const endNumber = 20000
SimpleAutocomplete.args = {
  startNumber,
  endNumber,
  diffNumber: 5000,
  selected: { value: startNumber.toString() },
}
