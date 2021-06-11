import React, { ReactNode } from 'react'

type TButton = {
  children: string | ReactNode
  type?: 'submit' | 'button'
  onClick?: () => void
}

const Button = (props: TButton): JSX.Element => {
  const { children, type = 'button', onClick, ...restProps } = props

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
