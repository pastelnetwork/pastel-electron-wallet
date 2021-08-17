import React, { ReactNode } from 'react'

import { Title, Description } from './Typography'

type TCard = {
  title: string
  description: ReactNode
  content: ReactNode
  footer: ReactNode
}

const Card = (props: TCard): JSX.Element => {
  const { title, description, content, footer } = props

  return (
    <div className='relative flex flex-col max-w-427px h-full p-30px border border-solid border-gray-e7 rounded-lg bg-white shadow-44px'>
      <Title>{title}</Title>
      <div className='min-h-[60px] mt-3'>
        <Description>{description}</Description>
      </div>
      <div className='flex-grow my-4'>{content}</div>
      {footer}
    </div>
  )
}

export default Card
