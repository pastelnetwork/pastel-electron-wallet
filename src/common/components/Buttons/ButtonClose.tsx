import React from 'react'
import cn from 'classnames'

export type TButtonCloseProps = {
  onClick?: React.MouseEventHandler
  className?: string
}

const ButtonClose = ({
  onClick,
  className,
}: TButtonCloseProps): JSX.Element => {
  const classes = cn(
    'border flex items-center justify-center border-button-text w-7 h-7 rounded-lg focus:outline-none hover:border-gray-8e hover:bg-gray-f6 active:bg-gray-f6 active:border-gray-55 active:text-border-gray-55',
    className,
  )

  return (
    <button onClick={onClick} className={classes}>
      <svg
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
          fill='#B0B7C3'
        />
      </svg>
    </button>
  )
}

export default ButtonClose
