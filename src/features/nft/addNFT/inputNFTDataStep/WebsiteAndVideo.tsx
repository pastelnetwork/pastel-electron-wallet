import React, { useState } from 'react'
import Input from 'common/components/Form/Input'
import { TForm } from './InputNFTDataStep'
import Toggle from 'common/components/Toggle'
import cn from 'classnames'
import { useWatch } from 'react-hook-form'

export default function WebsiteAndVideo({
  form,
}: {
  form: TForm
}): JSX.Element {
  return (
    <div className='flex space-x-7'>
      <ToggleableInput form={form} name='website' label="Creator's website" />
      <ToggleableInput form={form} name='video' label='Creation video' />
    </div>
  )
}

const ToggleableInput = ({
  form,
  name,
  label,
}: {
  form: TForm
  name: 'website' | 'video'
  label: string
}) => {
  const showInputKey = name === 'website' ? 'showSiteInput' : 'showVideoInput'

  const showInput = useWatch({
    control: form.control,
    name: showInputKey,
  })

  const setShowInput = (show: boolean) => {
    form.setValue(showInputKey, show)
  }

  const [value, setValue] = useState('')

  // stash input value while input is hidden
  const toggleInput = () => {
    if (showInput) {
      setValue(form.getValues(name) || '')
      form.setValue(name, undefined)
    } else {
      form.setValue(name, value)
    }
    setShowInput(!showInput)
  }

  return (
    <Input
      form={form}
      name={name}
      label={
        <div className='flex items-center text-gray-71 font-medium text-base'>
          {label}
          <div className='ml-4'>
            <Toggle selected={showInput} toggleHandler={toggleInput} />
          </div>
        </div>
      }
      className='w-full'
      renderInput={props => (
        <div
          className={cn(
            'duration-200 transition-all overflow-hidden',
            showInput ? 'h-10 opacity-100' : 'h-0 opacity-0',
          )}
        >
          <input {...props} className='input text-sm' />
        </div>
      )}
    />
  )
}
