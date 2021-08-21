import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { useForm } from 'react-hook-form'

import Select, { TOptionsProps, TRangeProps } from './index'
import FormSelectComponent from './FormSelect'

export default {
  title: 'Select',
  component: Select,
} as Meta

const TemplateOptions: Story<TOptionsProps> = ({ selected, ...args }) => {
  const [selectedItem, setSelected] = useState(selected)

  return (
    <div>
      <Select {...args} selected={selectedItem} onChange={setSelected} />
    </div>
  )
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
  selectClassName: 'w-220px',
  disabled: false,
}

export const WithLabel = TemplateOptions.bind({})
WithLabel.args = {
  options,
  selected: options[0],
  label: 'Categories',
  selectClassName: 'w-220px',
  disabled: false,
}

// not using ...args because this is causing wrong behaviour by passing options={undefined}
const TemplateRange: Story<TRangeProps> = ({
  selectClassName,
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
      selectClassName={selectClassName}
      min={min}
      max={max}
      step={step}
    />
  )
}

export const AutoCompleteNumber = TemplateRange.bind({})
AutoCompleteNumber.args = {
  selectClassName: 'w-28',
  autocomplete: true,
  min: 10000,
  max: 20000,
  step: 100,
  value: 12345,
  disabled: false,
}

export const FormSelect = (): JSX.Element => {
  const form = useForm({
    defaultValues: {
      select: options[0],
    },
  })

  const submit = () => {
    alert(`Submitted: ${JSON.stringify(form.getValues())}`)
  }

  return (
    <form onSubmit={form.handleSubmit(submit)}>
      <FormSelectComponent
        form={form}
        name='select'
        options={options}
        selectClassName='w-[220px]'
      />
      <button className='btn btn-primary mt-4 px-5'>Submit</button>
    </form>
  )
}
