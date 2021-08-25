import React from 'react'
import Select, { TFormSelectProps, TOption } from './Select'
import FormControl from '../Form/FormControl'
import { Controller, FieldValues } from 'react-hook-form'

export default function FormSelect<TForm extends FieldValues>({
  form,
  ...props
}: TFormSelectProps<TForm>): JSX.Element {
  return (
    <FormControl form={form} {...props}>
      <Controller
        name={props.name}
        control={form.control}
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
