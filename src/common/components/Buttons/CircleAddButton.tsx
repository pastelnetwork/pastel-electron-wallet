import React from 'react'
import cn from 'classnames'

export type TCircleAddButton = {
  onClick?: React.MouseEventHandler
  className?: string
}

const CircleAddButton = ({
  onClick,
  className,
}: TCircleAddButton): JSX.Element => {
  const classes = cn(className, {
    'button-add transition duration-300 border-2 flex items-center justify-center border-button w-7 h-7 rounded-full focus:outline-none hover:border-button-hover group': true,
  })

  return (
    <button onClick={onClick} className={classes}>
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
    </button>
  )
}

export default CircleAddButton
