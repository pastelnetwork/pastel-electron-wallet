import React from 'react'
import cn from 'classnames'
import Rarenessbar from '../Rarenessbar'
import OnSaleImage from '../../assets/images/on_sale.png'

export interface INFTCompactCardProps {
  imageSrc: string
  title: string
  className?: string
}

export interface INFTCardProps extends INFTCompactCardProps {
  author: string
  avatarSrc: string
  price: number | string
  currencyName: string
  onSale: boolean
  rarenessPercent: number
}

const NFTCard = ({
  imageSrc,
  title,
  className,
  ...props
}: INFTCompactCardProps | INFTCardProps): JSX.Element => {
  const fullCardProps = 'author' in props && (props as INFTCardProps)

  const wrapperPaddingClass = fullCardProps ? 'pt-4 pb-17px' : 'pb-18px'
  const titleClass = fullCardProps
    ? 'font-extrabold text-h4 leading-6'
    : 'font-medium'
  const imageHeightClass = fullCardProps ? 'h-230px' : 'h-220px'
  const footerClass = fullCardProps ? 'pt-2' : 'pt-2.5 pb-2px'

  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-md',
        wrapperPaddingClass,
        className,
      )}
    >
      {/* Header */}
      {fullCardProps && (
        <div className='w-full mb-px'>
          <div className='w-full px-18px flex justify-between pb-3.5'>
            <div className='flex items-center'>
              <img src={fullCardProps.avatarSrc} className='w-9' />
              <h4 className='pl-2 font-extrabold text-gray-1b'>
                @{fullCardProps.author}
              </h4>
            </div>
          </div>
          <div>
            <Rarenessbar
              classes='w-full'
              percent={fullCardProps.rarenessPercent}
            />
          </div>
        </div>
      )}
      {/* Image */}
      <div className={cn(imageHeightClass, 'relative')}>
        <img src={imageSrc} className='object-cover h-full w-full' />
        {fullCardProps && fullCardProps.onSale && (
          <div className='absolute bottom-17px left-17px'>
            <img src={OnSaleImage} alt='On Sale Image' />
          </div>
        )}
      </div>
      {/* Footer */}
      <div className={cn('pl-5 pr-18px', footerClass)}>
        <div className='flex justify-between'>
          <div className={cn('text-gray-1a', titleClass)}>{title}</div>
        </div>
        {fullCardProps && (
          <div className='flex justify-between pt-4'>
            <div className='flex-center'>
              <span className='text-h5 leading-none text-gray-77'>Auction</span>
              <span className='text-h4 leading-none text-gray-1a pl-5px font-extrabold'>
                {fullCardProps.price} {fullCardProps.currencyName}
              </span>
            </div>

            <div className='text-h5 text-gray-a0'>last bid</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NFTCard
