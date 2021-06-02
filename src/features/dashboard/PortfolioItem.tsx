import React from 'react'

export type PortfolioItemProps = {
  image: string
  title: string
  author: string
  price: number
}

export default function PortfolioItem({
  image,
  title,
  author,
  price,
}: PortfolioItemProps): JSX.Element {
  return (
    <div className='rounded-lg flex items-center border border-gray-e7 p-1.5 mb-3 whitespace-nowrap'>
      <div className='w-9 h-9 flex-shrink-0 object-cover'>
        <img src={image} className='w-full h-full rounded-lg' />
      </div>
      <div className='flex-grow min-w-0 flex ml-1.5 justify-between items-center md:flex-col md:items-start 1200px:flex-row 1200px:items-center'>
        <div className='min-w-0 pr-2'>
          <div className='text-gray-4a font-extrabold text-xs truncate'>
            {title}
          </div>
          <div className='text-gray-a0 font-medium text-xs truncate'>
            {author}
          </div>
        </div>
        <div className='md:flex 1200px:block'>
          <div className='text-gray-a0 font-medium text-xs mr-1'>Bid</div>
          <div className='text-gray-33 font-extrabold text-xs'>{price} PSL</div>
        </div>
      </div>
    </div>
  )
}
