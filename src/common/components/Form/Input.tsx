import React, { InputHTMLAttributes, ReactNode } from 'react'
import FormControl, { TFormControlProps } from './FormControl'
import { FieldValues } from 'react-hook-form'

export type TInputProps<TForm> = Omit<TFormControlProps<TForm>, 'children'> & {
  inputClassName?: string
  renderInput?(inputProps: InputHTMLAttributes<HTMLInputElement>): ReactNode
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'form'>

export default function Input<TForm extends FieldValues>({
  form,
  name,
  inputClassName = 'input',
  className,
  label,
  labelClass,
  style,
  renderInput,
  ...props
}: TInputProps<TForm>): JSX.Element {
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
