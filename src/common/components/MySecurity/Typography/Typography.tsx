import React from 'react'

interface ITextProps {
  children: string
  color?: string
}

export const Title: React.FC<ITextProps> = ({ children }) => {
  return (
    <h3 className='font-body font-extrabold leading-10 text-h3 text-text-23'>
      {children}
    </h3>
  )
}

export const Description: React.FC<ITextProps> = ({ children }) => {
  return (
    <div className='font-body font-medium leading-relaxed text-h5 text-text-77'>
      {children}
    </div>
  )
}
