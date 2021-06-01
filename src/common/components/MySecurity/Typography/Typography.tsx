import React from 'react'

interface ITextProps {
  children: string
  color?: string
}

export const Title: React.FC<ITextProps> = ({ children }) => {
  return (
    <h3 className='font-body font-extrabold leading-10 text-h3 text-text-primary'>
      {children}
    </h3>
  )
}

export const Description: React.FC<ITextProps> = ({ children }) => {
  return (
    <div className='font-body font-medium leading-relaxed text-h5 text-text-secondary'>
      {children}
    </div>
  )
}

export const Hint: React.FC<ITextProps> = ({ children, color }) => {
  return (
    <div
      className={`font-body font-medium leading-snug text-h6 ${
        color ? color : 'text-text-secondary'
      }`}
    >
      {children}
    </div>
  )
}
