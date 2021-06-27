import React, { ReactNode } from 'react'
import cn from 'classnames'
import Icon from '../Icon'
import CheckIcon from '../../assets/icons/ico-check.svg'
import TimesIcon from '../../assets/icons/ico-times.svg'
import styles from './Input.css'

export type TInput = {
  className?: string
  type?: 'text' | 'number' | 'tel' | 'email' | 'password'
  prepend?: ReactNode
  append?: ReactNode
  appendOutside?: ReactNode
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClick?: () => void
  isValid?: boolean | undefined
  label?: string
  id?: string
  hint?: string
  errorMessage?: string | null
  disabled?: boolean
  placeholder?: string
  labelClassName?: string
  [x: string]: React.MouseEventHandler<Element> | ReactNode | string | undefined
  hintAsTooltip?: boolean
}

const Input = React.forwardRef<HTMLInputElement, TInput>(
  (
    {
      className,
      onChange,
      type = 'text',
      prepend,
      append,
      appendOutside,
      isValid,
      label,
      placeholder,
      id,
      hint,
      errorMessage,
      disabled,
      labelClassName = 'inline-block text-gray-71 text-h5 pb-2',
      hintClassName = '',
      onClick,
      hintAsTooltip,
      ...otherProps
    },
    ref,
  ) => {
    const classes = cn('relative flex items-center w-full', className)

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
      'absolute top-0 right-0 bottom-0 left-0 shadow-2px rounded pointer-events-none': true,
      'bg-line -z-10': disabled,
    })

    return (
      <div className={wrapperClasses}>
        {label && <div className={labelClassName}>{label}</div>}
        <div className={classes}>
          <div className='relative flex items-center w-full' onClick={onClick}>
            {prepend && <div className='pl-2 select-none'>{prepend}</div>}
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
            {/* DON'T MOVE, it should be directly after <input> to show hint with css :focus rule */}
            {hint && hintAsTooltip && (
              <div
                className={cn(
                  'absolute bg-black text-white rounded-lg z-10 text-xs font-bold px-2 py-1 right-0 hintAsTooltip',
                  styles.hintAsTooltip,
                )}
              >
                {hint}
              </div>
            )}
            <fieldset className={fieldsetClasses} />

            {append && <div className='pr-2'>{append}</div>}

            {isValid === true && (
              <div className='pr-2'>
                <Icon src={CheckIcon} variant='center' />
              </div>
            )}
            {isValid === false && <img src={TimesIcon} className='w-3 mr-3' />}
          </div>
          {appendOutside && (
            <div className='ml-4 select-none' onClick={onClick}>
              {appendOutside}
            </div>
          )}
        </div>

        {(errorMessage || (hint && !hintAsTooltip)) && (
          <p
            className={cn(
              `${
                isValid === false ? 'text-orange-63' : 'text-button-text'
              } text-h6 pt-1`,
              hintClassName,
            )}
          >
            {errorMessage ? errorMessage : hint}
          </p>
        )}
      </div>
    )
  },
)

export default Input
