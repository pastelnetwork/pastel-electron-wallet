import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'

import Select, { OptionsProps, RangeProps } from './Select'

export default {
  title: 'Select',
  component: Select,
} as Meta

const TemplateOptions: Story<OptionsProps> = ({ selected, ...args }) => {
  const [selectedItem, setSelected] = useState(selected)

  return <Select {...args} selected={selectedItem} onChange={setSelected} />
}

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]

export const SimpleSelect = TemplateOptions.bind({})
SimpleSelect.args = {
  options,
  selected: options[0],
  className: 'text-gray-71 w-220px',
}

export const WithLabel = TemplateOptions.bind({})
WithLabel.args = {
  options,
  selected: options[0],
  label: 'Categories',
  className: 'text-gray-2d w-220px',
}

// not using ...args because this is causing wrong behaviour by passing options={undefined}
const TemplateRange: Story<RangeProps> = ({
  className,
  autocomplete,
  min,
  max,
  step,
  value,
}) => {
  const [selectedValue, setSelectedValue] = useState(value)

  return (
    <Select
      value={selectedValue}
      onChange={setSelectedValue}
      autocomplete={autocomplete}
      className={className}
      min={min}
      max={max}
      step={step}
    />
  )
}

export const AutoCompleteNumber = TemplateRange.bind({})
AutoCompleteNumber.args = {
  className: 'text-gray-2d w-112px',
  autocomplete: true,
  min: 10000,
  max: 20000,
  step: 100,
  value: 12345,
}
