import React, { useState } from 'react'
import MultiSelect, { TOptionType } from './MultiSelect'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]

export const MultiSelectDefault = (): JSX.Element => {
  const [selected, setSelected] = useState<readonly TOptionType[] | null>(null)

  const handleSelect = (option: readonly TOptionType[]): void =>
    setSelected(option)

  return (
    <div className='max-w-xs'>
      <MultiSelect
        value={selected}
        options={options}
        onChange={handleSelect}
        className='w-full'
      />
    </div>
  )
}

export default {
  component: MultiSelect,
  title: 'Multi Select',
}
