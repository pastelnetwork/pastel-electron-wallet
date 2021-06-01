import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'

import Select, { SelectProps } from './Select'

export default {
  title: 'Select',
  component: Select,
} as Meta

const Template: Story<SelectProps> = ({ selected, ...args }) => {
  const [selectedItem, setSelected] = useState(selected)

  return <Select {...args} selected={selectedItem} onChange={setSelected} />
}

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]

export const SimpleSelect = Template.bind({})
SimpleSelect.args = {
  options,
  selected: options[0],
  className: 'text-gray-71 w-30',
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  options,
  selected: options[0],
  label: 'Categories',
  className: 'text-gray-2d',
}
