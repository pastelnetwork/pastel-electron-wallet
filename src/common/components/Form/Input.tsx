import React, { InputHTMLAttributes, ReactNode } from 'react'
import FormControl, { TFormControlProps } from './FormControl'

export type TInputProps = Omit<TFormControlProps, 'children'> & {
  inputClassName?: string
  renderInput?(inputProps: InputHTMLAttributes<HTMLInputElement>): ReactNode
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'form'>

export default function Input({
  form,
  name,
  inputClassName = 'input',
  className,
  label,
  labelClass,
  style,
  renderInput,
  ...props
}: TInputProps): JSX.Element {
  const inputProps = {
    ...form.register(name),
    ...props,
    className: inputClassName,
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
      {renderInput ? renderInput(inputProps) : <input {...inputProps} />}
    </FormControl>
  )
}
