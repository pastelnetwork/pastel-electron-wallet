import React from 'react'
import Input from 'common/components/Form/Input'
import { MinusCircle, PlusCircle } from 'common/components/Icons'
import Select from 'common/components/Select/Select'
import {
  TForm,
  copiesMin,
  copiesMax,
  compensationPercentMin,
  compensationPercentMax,
  compensations,
} from './InputNFTDataStep'

const Increase = ({
  form,
  name,
  max,
}: {
  form: TForm
  name: 'copies' | 'compensationPercent'
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
  name: 'copies' | 'compensationPercent'
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

export default function CopiesAndCompensation({
  form,
}: {
  form: TForm
}): JSX.Element {
  return (
    <div className='flex space-x-4'>
      <Input
        form={form}
        name='copies'
        label='Copies'
        style={{ width: '152px' }}
        type='number'
        renderInput={props => (
          <div className='input flex px-3'>
            <Increase form={form} name='copies' max={copiesMax} />
            <input
              {...props}
              className='text-center w-full'
              min={copiesMin}
              max={copiesMax}
            />
            <Decrease form={form} name='copies' min={copiesMin} />
          </div>
        )}
      />
      <Select
        form={form}
        name='compensation'
        label='Compensation'
        options={compensations}
        className='flex-grow'
      />
      <Input
        form={form}
        name='compensationPercent'
        className='mt-8'
        style={{ width: '152px' }}
        type='number'
        inputClassName='input text-center'
        renderInput={props => (
          <div className='input flex-between px-3'>
            <Increase
              form={form}
              name='compensationPercent'
              max={compensationPercentMax}
            />
            <div className='flex'>
              <input
                {...props}
                className='text-center w-5'
                min={compensationPercentMin}
                max={compensationPercentMax}
              />
              %
            </div>
            <Decrease
              form={form}
              name='compensationPercent'
              min={compensationPercentMin}
            />
          </div>
        )}
      />
    </div>
  )
}
