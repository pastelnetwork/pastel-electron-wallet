import React, { useState } from 'react'
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

  const [showNumpad, setShowNumpad] = useState(false)

  const openNumpad = () => setShowNumpad(true)
  // const closeNumpad = () => setShowNumpad(false)

  return (
    <Input
      form={form}
      name={name}
      type='number'
      className='w-[152px]'
      inputClassName={cn('input', percent && 'text-center')}
      renderInput={() => (
        <div className='relative'>
          <div
            className={cn(
              'input flex px-3 bg-white',
              percent && 'flex-between',
            )}
          >
            <Increase form={form} name={name} max={max} />
            <div className={cn(percent ? 'flex' : 'w-full')}>
              <input
                className={cn('text-center', percent ? 'w-8' : 'w-full h-full')}
                min={min}
                max={max}
                value={value}
                onChange={e => form.setValue(name, parseFloat(e.target.value))}
                onClick={openNumpad}
              />
              {percent && '%'}
            </div>
            <Decrease form={form} name={name} min={min} />
          </div>
          {showNumpad && (
            <div className='absolute top-full left-0 right-0 p-2 bg-white rounded-b shadow text-gray-51 space-y-2 z-10'>
              <div className='flex-between'>
                <NumpadButton value={1} />
                <NumpadButton value={2} />
                <NumpadButton value={3} />
              </div>
              <div className='flex-between'>
                <NumpadButton value={4} />
                <NumpadButton value={5} />
                <NumpadButton value={6} />
              </div>
              <div className='flex-between'>
                <NumpadButton value={7} />
                <NumpadButton value={8} />
                <NumpadButton value={9} />
              </div>
              <div className='flex-between'>
                <div className='w-10' />
                <NumpadButton value={0} />
                <NumpadButton value='.' />
              </div>
            </div>
          )}
        </div>
      )}
    />
  )
}

const NumpadButton = ({ value }: { value: number | string }) => {
  return (
    <button
      type='button'
      className='shadow-input border border-gray-8e border-opacity-20 w-10 rounded duration-200 transition hover:bg-gray-fc'
    >
      {value}
    </button>
  )
}
