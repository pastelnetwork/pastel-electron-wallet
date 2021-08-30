import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { useForm } from 'react-hook-form'

import Select, { TSelectOptionsProps } from './index'
import { useSuggestLocations } from 'api/locations'
import { TOption } from '../SelectMultiple/SelectMultiple'

export default {
  title: 'Select',
  component: Select,
} as Meta

const TemplateOptions: Story<TSelectOptionsProps> = ({ selected, ...args }) => {
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
  className: 'w-220px',
  disabled: false,
}

export const WithLabel = TemplateOptions.bind({})
WithLabel.args = {
  options,
  selected: options[0],
  label: 'Categories',
  className: 'w-220px',
  disabled: false,
}

export const SelectWithAutocomplete = TemplateOptions.bind({})
SelectWithAutocomplete.args = {
  options,
  selected: options[0],
  className: 'w-220px',
  autocomplete: true,
}

export const SelectWithAutocompleteHighlight = TemplateOptions.bind({})
SelectWithAutocompleteHighlight.args = {
  options,
  selected: options[0],
  className: 'w-220px',
  autocomplete: true,
  highlight: true,
  filterOptions(options, value) {
    const lower = value.toLocaleLowerCase()
    return options.filter(option =>
      option.label.toLocaleLowerCase().includes(lower),
    )
  },
}

export const AutocompleteByQuery = (): JSX.Element => {
  const [query, setQuery] = useState('')
  const [selectedItem, setSelected] = useState<TOption | null>()

  const { data: locations = [], isLoading } = useSuggestLocations(query, {
    enabled: query.length > 0,
  })

  return (
    <Select
      debounce={200}
      onInputChange={setQuery}
      className='w-[300px]'
      selected={selectedItem}
      onChange={setSelected}
      options={locations.map(location => ({
        label: location,
        value: location,
      }))}
      isLoading={isLoading}
      noOptionsText={query.length > 0 && 'Locations not found'}
      autocomplete
      highlight
    />
  )
}

export const SelectRange = (): JSX.Element => {
  const [value, setValue] = useState<number | null>(10000)

  return (
    <Select
      className='text-gray-35 w-28'
      min={10000}
      max={20050}
      step={100}
      value={value}
      onChange={setValue}
    />
  )
}

export const SelectRangeWithAutocomplete = (): JSX.Element => {
  const [value, setValue] = useState<number | null>(10000)

  return (
    <Select
      className='w-28'
      min={10000}
      max={20000}
      step={100}
      value={value}
      onChange={setValue}
      autocomplete
    />
  )
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
      <Select
        form={form}
        name='select'
        options={options}
        className='w-[220px]'
      />
      <button className='btn btn-primary mt-4 px-5'>Submit</button>
    </form>
  )
}
