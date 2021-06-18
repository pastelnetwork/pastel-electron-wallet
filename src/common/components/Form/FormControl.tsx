import React, { CSSProperties, ReactNode } from 'react'
import { UseFormReturn } from 'react-hook-form'
import ErrorMessage from './ErrorMessage'

export type TFormControlProps = {
  form: UseFormReturn
  name: string
  children: ReactNode
  className?: string
  label?: string
  labelClass?: string
  style?: CSSProperties
}

export default function FormControl({
  form,
  name,
  children,
  className,
  label,
  labelClass = 'font-medium text-gray-71 mb-2',
  style,
}: TFormControlProps): JSX.Element {
  return (
    <div className={className} style={style}>
      {label && <div className={labelClass}>{label}</div>}
      {children}
      <ErrorMessage form={form} name={name} />
    </div>
  )
}
