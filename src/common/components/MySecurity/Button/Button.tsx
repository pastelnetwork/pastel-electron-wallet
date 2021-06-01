import React from 'react'

interface IButtonProps {
  type?: 'submit' | 'button'
  onClick?: () => void
}

const Button: React.FC<IButtonProps> = ({
  children,
  type = 'button',
  onClick,
  ...restProps
}) => {
  return (
    <button
      className='relative w-full font-body hover:cursor-pointer h-10 rounded-2xl border border border-blue-450 text-text-link focus:outline-none leading-4'
      type={type}
      {...restProps}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
