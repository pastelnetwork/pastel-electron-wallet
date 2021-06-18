import React, { ChangeEvent, TextareaHTMLAttributes } from 'react'
import FormControl, { TFormControlProps } from './FormControl'
import { Controller } from 'react-hook-form'

export type TTextAreaProps = Omit<TFormControlProps, 'children'> & {
  textAreaClassName?: string
  maxLength?: number
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'form'>

export default function Input({
  form,
  name,
  textAreaClassName = 'input resize-none h-20 py-2 overflow-hidden',
  className,
  label,
  labelClass,
  style,
  maxLength,
  ...props
}: TTextAreaProps): JSX.Element {
  const textAreaProps = {
    ...props,
    className: textAreaClassName,
  }

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.target
    el.style.height = ''
    el.style.height = `${e.target.scrollHeight}px`
  }

  return (
    <FormControl
      form={form}
      name={name}
      className={className}
      label={label}
      labelClass={labelClass}
      style={style}
    >
      <Controller
        control={form.control}
        name={name}
        render={({ field }) => {
          const length = (field.value || '').length

          return (
            <div className='relative'>
              <textarea
                {...textAreaProps}
                {...field}
                onChange={e => {
                  field.onChange(e)
                  onChange(e)
                }}
              />
              {maxLength && (
                <div
                  className={`absolute right-4 bottom-3 text-xs font-medium ${
                    length > maxLength ? 'text-error' : 'text-gray-a0'
                  }`}
                >
                  {length}/{maxLength}
                </div>
              )}
            </div>
          )
        }}
      />
    </FormControl>
  )
}
