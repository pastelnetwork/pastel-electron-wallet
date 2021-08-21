import React from 'react'
import Select, { TBaseProps, TOption } from './Select'
import FormControl, { TFormControlProps } from '../Form/FormControl'
import { Controller, FieldValues } from 'react-hook-form'

export type TFormSelectProps<TForm> = TBaseProps &
  Omit<TFormControlProps<TForm>, 'children'> & {
    options: TOption[]
  }

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
