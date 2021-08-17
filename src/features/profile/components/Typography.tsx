import React, { ReactNode } from 'react'

type TTextProps = {
  children: ReactNode
}

export const Title = (props: TTextProps): JSX.Element => {
  const { children } = props

  return (
    <h3 className='font-body font-extrabold leading-10 text-h3 text-text-23'>
      {children}
    </h3>
  )
}

export const Description = (props: TTextProps): JSX.Element => {
  const { children } = props

  return (
    <div className='font-body font-medium leading-relaxed text-base text-gray-71'>
      {children}
    </div>
  )
}
