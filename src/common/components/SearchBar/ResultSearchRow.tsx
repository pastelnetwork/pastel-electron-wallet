import React from 'react'

export type TResultShearchProps = {
  name: string
  image?: string
  followers?: number
  handleClick?: (param: string) => void
}

const ResultSearchRow = ({
  name,
  image,
  followers,
  handleClick,
}: TResultShearchProps): JSX.Element => {
  return (
    <div
      className='cursor-pointer flex items-center mb-4 justify-between'
      onClick={() => {
        handleClick && handleClick(name)
      }}
    >
      <div className='flex items-center'>
        {image && (
          <img src={image} className='w-[34px] h-[34px] rounded-full mr-5' />
        )}
        <div className='text-base font-black text-gray-23'>{name}</div>
      </div>
      <div className='text-gray-a0 text-sm font-medium pr-[42px]'>
        {followers} followers
      </div>
    </div>
  )
}

export default ResultSearchRow
