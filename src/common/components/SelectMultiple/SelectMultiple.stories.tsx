import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'

import Component, { TControlledProps as TProps } from './SelectMultiple'

export default {
  title: 'SelectMultiple',
  component: Component,
} as Meta

const Template: Story<TProps> = ({ selected, ...args }) => {
  const [selectedItems, setSelected] = useState(selected)

  return <Component {...args} selected={selectedItems} onChange={setSelected} />
}

const options = [
  'Grapefruit',
  'Papaya',
  'Lime',
  'Coconut',
  'Banana',
  'Watermelon',
  'Blueberry',
].map(value => ({ value, label: value }))

export const SelectMultiple = Template.bind({})
SelectMultiple.args = {
  options,
  selected: [options[1]],
  selectClassName: 'w-56',
  name: 'fruits',
  placeholder: 'Placeholder',
}
