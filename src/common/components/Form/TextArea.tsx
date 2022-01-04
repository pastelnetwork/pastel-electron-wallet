import React, { ChangeEvent, TextareaHTMLAttributes, useCallback } from 'react'
import FormControl, { TFormControlProps } from './FormControl'
import { Controller, FieldValues } from 'react-hook-form'

export type TTextAreaProps<TForm> = Omit<
  TFormControlProps<TForm>,
  'children'
> & {
  textAreaClassName?: string
  maxLength?: number
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'form'>

export default function TextArea<TForm extends FieldValues>({
  form,
  name,
  textAreaClassName = 'input resize-none h-20 py-2 overflow-hidden',
  className,
  label,
  labelClass,
  style,
  maxLength,
  ...props
}: TTextAreaProps<TForm>): JSX.Element {
  const textAreaProps = {
    ...props,
    className: textAreaClassName,
  }

  const adjustTextAreaHeight = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.target
    // remove height so textarea will take as many space as it pleased
    el.style.height = ''
    // set height to be a scrollHeight, and no scroll after this
    const scrollHeight: string = e.target.scrollHeight?.toString() || ''
    el.style.height = `${scrollHeight}px`
  }

  const onRender = useCallback(
    ({ field }) => {
      const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        field.onChange(e)
        adjustTextAreaHeight(e)
      }

      const value = (field.value || '') as string
      const length = value.length
      return (
        <div className='relative'>
          <textarea
            {...textAreaProps}
            {...field}
            value={value}
            onChange={onChange}
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
    },
    [maxLength],
  )

  return (
    <FormControl
      form={form}
      name={name}
      className={className}
      label={label}
      labelClass={labelClass}
      style={style}
    >
      <Controller control={form.control} name={name} render={onRender} />
    </FormControl>
  )
}
