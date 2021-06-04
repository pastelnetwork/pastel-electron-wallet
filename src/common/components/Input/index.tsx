import React, { ReactNode, ReactSVGElement } from 'react'
import cn from 'classnames'
import Icon from '../Icon'
import CheckIcon from '../../assets/icons/ico-check.svg'
import TimesIcon from '../../assets/icons/ico-times.svg'

export type InputProps = {
  className?: string
  type?: 'text' | 'password' | 'number'
  prepend?: ReactSVGElement
  append?: ReactSVGElement
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  isValid?: boolean | undefined
  label?: string
  id?: string
  hint?: string
  errorMessage?: string | null
  disabled?: boolean
  placeholder?: string
  [x: string]: React.MouseEventHandler<Element> | ReactNode | string | undefined
}

const Input: React.FC<InputProps> = React.forwardRef(
  (
    {
      className,
      onChange,
      type,
      prepend,
      append,
      isValid,
      label,
      placeholder,
      id,
      hint,
      errorMessage,
      disabled,
      ...otherProps
    },
    ref: React.LegacyRef<HTMLInputElement>,
  ) => {
    const classes = cn(
      {
        'relative flex items-center': true,
      },
      className,
    )

    const wrapperClasses = cn({
      'cursor-not-allowed': disabled,
    })

    const inputClasses = cn({
      'input-field w-full py-2 text-base placeholder-gray500 text-text-gray800 text-h5 focus:outline-none': true,
      'pl-4': !prepend,
      'pl-2': prepend,
      'pr-4': !append,
      'pr-2': append,
      'input-number': type === 'number',
      'is-valid': isValid === true,
      'is-invalid': isValid === false,
      'pointer-events-none': disabled,
    })

    const fieldsetClasses = cn({
      'absolute top-0 right-0 bottom-0 left-0 shadow-input rounded pointer-events-none': true,
      'bg-line -z-10': disabled,
    })

    return (
      <div className={wrapperClasses}>
        {label && (
          <label
            htmlFor={id}
            className='inline-block text-gray-8e text-h4 pb-1'
          >
            {label}
          </label>
        )}
        <div className={classes}>
          {prepend && <div className='pl-2'>{prepend}</div>}

          <input
            id={id}
            ref={ref}
            className={inputClasses}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
            {...otherProps}
            disabled={disabled}
          />
          <fieldset className={fieldsetClasses} />

          {append && <div className='pr-2'>{append}</div>}

          {isValid === true && (
            <div className='pr-2'>
              <Icon src={CheckIcon} variant='center' />
            </div>
          )}
          {isValid === false && (
            <div className='pr-2 text-red-7a'>
              <Icon src={TimesIcon} className='fill-current' />
            </div>
          )}
        </div>
        {(errorMessage || hint) && (
          <p
            className={`${
              isValid === false ? 'text-red-7a' : 'text-button-text'
            } text-h6 pt-1`}
          >
            {errorMessage ? errorMessage : hint}
          </p>
        )}
      </div>
    )
  },
)

Input.defaultProps = {
  type: 'text',
}

export default Input
