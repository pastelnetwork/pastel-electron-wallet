import React from 'react'
import { UseFormReturn, Controller } from 'react-hook-form'
import Toggle from 'common/components/Toggle'

export type TToggleProps = {
  form: UseFormReturn
  name: string
}

export default function FormToggle({ form, name }: TToggleProps): JSX.Element {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => (
        <Toggle selected={field.value} toggleHandler={field.onChange} />
      )}
    />
  )
}
