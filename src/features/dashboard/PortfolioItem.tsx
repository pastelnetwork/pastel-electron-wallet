import React from 'react'

export type TPortfolioItemProps = {
  image: string
  title: string
  author: string
  price: number
  currencyName: string
  type?: string
}

export default function PortfolioItem({
  image,
  title,
  author,
}: TPortfolioItemProps): JSX.Element {
  return (
    <div className='rounded-lg flex items-center border border-gray-e7 p-4 mb-3 whitespace-nowrap h-[76px]'>
      <div className='w-[44px] h-[44px] flex-shrink-0 object-cover'>
        <img src={image} className='w-full h-full rounded-lg' />
      </div>
      <div className='flex-grow min-w-0 flex ml-[14px] justify-between items-center md:flex-col md:items-start 1200px:flex-row 1200px:items-center'>
        <div className='min-w-0 pr-2'>
          <div className='text-gray-4a font-extrabold text-sm truncate'>
            {title}
          </div>
          <div className='text-gray-71 font-normal text-sm truncate'>
            @{author}
          </div>
        </div>
      </div>
    </div>
  )
}
