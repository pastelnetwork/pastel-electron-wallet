import React, { ReactNode } from 'react'

import Button from '../../../../../common/components/Buttons/Button'

type TButton = {
  children: string | ReactNode
  type?: 'submit' | 'button'
  onClick?: () => void
}

const TransparentButton = (props: TButton): JSX.Element => {
  const { children, type = 'button', onClick, ...restProps } = props

  return (
    <Button
      className='relative w-full font-body font-extrabold hover:cursor-pointer h-10 rounded-2xl border border border-blue-3f text-blue-3f focus:outline-none leading-4'
      variant='transparent'
      type={type}
      {...restProps}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export default TransparentButton
