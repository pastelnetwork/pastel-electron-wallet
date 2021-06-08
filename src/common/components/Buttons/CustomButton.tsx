import React from 'react'
import cn from 'classnames'

export type TCustomButton = {
  onClick?: React.MouseEventHandler
  className?: string
  type: 'add' | 'close'
  disabled?: boolean
}

const CustomButton: React.FC<TCustomButton> = ({
  type,
  onClick,
  className,
  disabled,
}) => {
  let classes = null
  switch (type) {
    case 'add':
      classes = cn(className, {
        'button-add transition duration-300 border-2 flex items-center justify-center border-button w-7 h-7 rounded-full focus:outline-none hover:border-button-hover group': true,
      })
      break
    case 'close':
      classes = cn(
        {
          'border flex items-center justify-center w-7 h-7 rounded-lg focus:outline-none active:shadow-none transition duration-300': true,
          'border-icon text-icon hover:text-gray-8e active:border-gray-650 active:text-tab-active focus:shadow-btnOutline': !disabled,
          'border border-blue-3f-text text-icon cursor-not-allowed': disabled,
        },
        className,
      )
      break
  }

  return (
    <button onClick={onClick} className={classes}>
      {type === 'add' ? (
        <svg
          className='transition duration-300 button-add-icon fill-current text-blue-3f'
          width='12'
          height='12'
          viewBox='0 0 12 12'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M5.27754 1.6198C5.28914 1.06764 5.74616 0.629426 6.29832 0.641025C6.85048 0.652625 7.2887 1.10965 7.2771 1.66181L7.20634 5.02981L10.5751 4.95904C11.1272 4.94744 11.5843 5.38565 11.5959 5.93782C11.6075 6.48998 11.1693 6.947 10.6171 6.9586L7.1643 7.03113L7.09176 10.4839C7.08016 11.0361 6.62314 11.4743 6.07098 11.4627C5.51882 11.4511 5.0806 10.9941 5.0922 10.4419L5.16297 7.07318L1.79497 7.14393C1.24281 7.15553 0.785789 6.71732 0.774189 6.16516C0.762589 5.61299 1.2008 5.15597 1.75297 5.14437L5.20502 5.07185L5.27754 1.6198Z'
          />
        </svg>
      ) : (
        <svg
          className='fill-current text-gray-b0'
          width='8'
          height='9'
          viewBox='0 0 8 9'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M7.14333 0.149589C7.33686 -0.0473933 7.65343 -0.0501945 7.85041 0.143332C8.04739 0.336859 8.05019 0.653429 7.85667 0.850411L4.70093 4.06249L7.85667 7.27457C8.05019 7.47156 8.04739 7.78813 7.85041 7.98165C7.65343 8.17518 7.33686 8.17238 7.14333 7.9754L4 4.77594L0.856668 7.9754C0.663141 8.17238 0.346571 8.17518 0.149589 7.98165C-0.0473933 7.78813 -0.0501947 7.47156 0.143333 7.27457L3.29907 4.06249L0.143332 0.850411C-0.0501945 0.653429 -0.0473933 0.336859 0.149589 0.143332C0.346571 -0.0501945 0.663141 -0.0473933 0.856668 0.149589L4 3.34905L7.14333 0.149589Z'
          />
        </svg>
      )}
    </button>
  )
}

export default CustomButton
