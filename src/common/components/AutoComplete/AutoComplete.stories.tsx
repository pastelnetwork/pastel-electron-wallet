import React from 'react'
import { Story, Meta } from '@storybook/react'

import AutoComplete, { AutoCompleteProps } from './AutoComplete'

export default {
  title: 'AutoComplete',
  component: AutoComplete,
} as Meta

const Template: Story<AutoCompleteProps> = ({
  selected,
  ...args
}: AutoCompleteProps) => {
  return <AutoComplete {...args} selected={selected} />
}

export const SimpleAutocomplete = Template.bind({})
const startNumber = 10000
const endNumber = 20000
SimpleAutocomplete.args = {
  startNumber,
  endNumber,
  diffNumber: 5000,
  selected: startNumber.toString(),
}
