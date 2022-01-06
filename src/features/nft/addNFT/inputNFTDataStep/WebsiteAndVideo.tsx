import React, { useCallback, useState } from 'react'
import cn from 'classnames'
import { useWatch } from 'react-hook-form'

import Input from 'common/components/Form/Input'
import { TForm } from './InputNFTDataStep'
import Toggle from 'common/components/Toggle'
import TimesIcon from 'common/assets/icons/ico-times.svg'

function ToggleableInput({
  form,
  name,
  label,
}: {
  form: TForm
  name: 'website' | 'video'
  label: string
}) {
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
  const toggleInput = useCallback(() => {
    if (showInput) {
      setValue(form.getValues(name) || '')
      form.setValue(name, undefined)
      form.setError(name, {
        type: 'required',
        message: '',
      })
    } else {
      form.setValue(name, value)
    }
    setShowInput(!showInput)
  }, [value, showInput])

  return (
    <div className='w-full relative'>
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
            <input
              {...props}
              className={cn(
                'input text-sm',
                form.formState.errors[name]?.message && 'border border-red-fe',
              )}
            />
          </div>
        )}
      />
      {form.formState.errors[name]?.message ? (
        <img
          src={TimesIcon}
          className='w-3 absolute top-[45px] right-3'
          alt='Times Icon'
        />
      ) : null}
    </div>
  )
}

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
