import React from 'react'
import cn from 'classnames'

export type TAvatarGroupProps = {
  urlData: Array<string>
  limitNumber: number
  className?: string
}

const AvatarGroup = ({
  urlData,
  limitNumber = 4,
  className,
}: TAvatarGroupProps): JSX.Element => {
  return (
    <div className={cn('flex', className)}>
      {urlData.slice(0, limitNumber).map((image, index) => (
        <img
          key={index}
          className='w-7 h-7 rounded-full border-2 border-white -m-1'
          src={image}
        />
      ))}
      {urlData.length > limitNumber && (
        <div className='border-2 border-white w-7 h-7 flex justify-center items-center -m-1 bg-gray-f2 rounded-full text-sm text-gray-71'>
          +{urlData.length - limitNumber}
        </div>
      )}
    </div>
  )
}

export default AvatarGroup
