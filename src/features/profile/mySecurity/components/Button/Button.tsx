import React from 'react'

type TButtonProps = {
  type?: 'submit' | 'button'
  onClick?: () => void
}

const Button: React.FC<TButtonProps> = ({
  children,
  type = 'button',
  onClick,
  ...restProps
}) => {
  return (
    <button
      className='relative w-full font-body font-extrabold hover:cursor-pointer h-10 rounded-2xl border border border-blue-3f text-blue-3f focus:outline-none leading-4'
      type={type}
      {...restProps}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
