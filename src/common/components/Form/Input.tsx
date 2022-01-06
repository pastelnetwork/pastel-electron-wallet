import React, {
  InputHTMLAttributes,
  ReactNode,
  useCallback,
  useState,
} from 'react'
import FormControl, { TFormControlProps } from './FormControl'
import { FieldValues } from 'react-hook-form'
import { Eye } from '../Icons'

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

  const [type, setType] = useState(inputProps.type)
  const togglePasswordType = useCallback(
    () => setType(type === 'password' ? 'text' : 'password'),
    [type],
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
      <div className='relative'>
        {renderInput ? (
          renderInput({ ...inputProps, type })
        ) : (
          <input {...inputProps} type={type} />
        )}
        {inputProps.type === 'password' && (
          <button
            type='button'
            className='absolute top-[13px] right-[14px] focus-visible:text-button-hover'
            onClick={togglePasswordType}
          >
            <Eye size={18} variant={type === 'password' ? 'type1' : 'hidden'} />
          </button>
        )}
      </div>
    </FormControl>
  )
}
