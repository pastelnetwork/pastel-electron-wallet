import React, { CSSProperties, ReactNode } from 'react'
import ErrorMessage from './ErrorMessage'
import { UseFormReturn, FieldValues, Path } from 'react-hook-form'

export type TFormControlProps<TForm> = {
  form: UseFormReturn<TForm>
  name: Path<TForm>
  children: ReactNode
  className?: string
  label?: ReactNode
  labelClass?: string
  style?: CSSProperties
}

export default function FormControl<TForm extends FieldValues>({
  form,
  name,
  children,
  className,
  label,
  labelClass = 'font-medium text-gray-4a mb-2',
  style,
}: TFormControlProps<TForm>): JSX.Element {
  return (
    <div className={className} style={style}>
      {label && <div className={labelClass}>{label}</div>}
      {children}
      <ErrorMessage form={form} name={name} />
    </div>
  )
}
