import React, { useCallback } from 'react'
import { UseFormReturn, FieldValues, Path, Controller } from 'react-hook-form'
import Toggle from 'common/components/Toggle'

export type TToggleProps<TForm> = {
  form: UseFormReturn<TForm>
  name: Path<TForm>
}

export default function FormToggle<TForm extends FieldValues>({
  form,
  name,
}: TToggleProps<TForm>): JSX.Element {
  const renderToggle = useCallback(
    ({ field }) => (
      <Toggle
        selected={field.value as boolean}
        toggleHandler={field.onChange}
      />
    ),
    [],
  )

  return <Controller control={form.control} name={name} render={renderToggle} />
}
