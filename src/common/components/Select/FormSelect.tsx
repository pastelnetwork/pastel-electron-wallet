import React from 'react'
import Select, { TFormSelectProps, TOption } from './Select'
import FormControl from '../Form/FormControl'
import { Controller, FieldValues } from 'react-hook-form'

export default function FormSelect<TForm extends FieldValues>(
  props: TFormSelectProps<TForm>,
): JSX.Element {
  return (
    <FormControl {...props}>
      <Controller
        name={props.name}
        control={props.form.control}
        render={({ field: { value, onChange } }) => (
          <Select
            {...props}
            label={undefined}
            selected={value as TOption | null}
            onChange={onChange}
          />
        )}
      />
    </FormControl>
  )
}
