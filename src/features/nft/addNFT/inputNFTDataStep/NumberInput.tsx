import React from 'react'
import { TForm } from './InputNFTDataStep'
import Input from 'common/components/Form/Input'
import { MinusCircle, PlusCircle } from 'common/components/Icons'
import cn from 'classnames'
import { useWatch } from 'react-hook-form'

type Name = 'copies' | 'royalty'

const Increase = ({
  form,
  name,
  max,
}: {
  form: TForm
  name: Name
  max: number
}) => {
  return (
    <button
      type='button'
      className='text-gray-33 flex-shrink-0'
      onClick={() =>
        form.setValue(name, Math.min(max, +form.getValues()[name] + 1))
      }
    >
      <PlusCircle size={18} />
    </button>
  )
}

const Decrease = ({
  form,
  name,
  min,
}: {
  form: TForm
  name: Name
  min: number
}) => {
  return (
    <button
      type='button'
      className='text-gray-33 flex-shrink-0'
      onClick={() =>
        form.setValue(name, Math.max(min, +form.getValues()[name] - 1))
      }
    >
      <MinusCircle size={18} />
    </button>
  )
}

export default function NumberInput({
  form,
  name,
  min,
  max,
  percent,
}: {
  form: TForm
  name: Name
  min: number
  max: number
  percent?: boolean
}): JSX.Element {
  const value = useWatch({
    control: form.control,
    name,
  })

  return (
    <Input
      form={form}
      name={name}
      type='number'
      className='w-[152px]'
      inputClassName={cn('input', percent && 'text-center')}
      renderInput={() => (
        <div
          className={cn('input flex px-3 bg-white', percent && 'flex-between')}
        >
          <Increase form={form} name={name} max={max} />
          <div className={cn(percent ? 'flex' : 'w-full')}>
            <input
              className={cn('text-center', percent ? 'w-8' : 'w-full h-full')}
              min={min}
              max={max}
              value={value}
              onChange={e => form.setValue(name, parseFloat(e.target.value))}
            />
            {percent && '%'}
          </div>
          <Decrease form={form} name={name} min={min} />
        </div>
      )}
    />
  )
}
