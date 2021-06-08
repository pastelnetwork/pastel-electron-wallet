import React, { ReactNode } from 'react'

import { Title, Description } from '../Typography/Typography'

type TCardProps = {
  title: string
  description: string
  content: ReactNode
  footer: ReactNode
}

const Card: React.FC<TCardProps> = ({
  title,
  description,
  content,
  footer,
}) => {
  return (
    <div className='relative flex flex-col max-w-427px h-full rounded-lg p-30px border border-solid border-gray-e7 rounded-lg bg-white shadow-44px'>
      <Title>{title}</Title>
      <div className='min-h-78px mt-3'>
        <Description>{description}</Description>
      </div>
      <div className='flex-grow my-4'>{content}</div>
      {footer}
    </div>
  )
}

export default Card
