import React from 'react'
import style from './style.module.css'
import { BoxArrowUp, HeartFilled } from 'common/components/Icons'

type TImageProps = {
  image: string
}

export default function Image({ image }: TImageProps): JSX.Element {
  return (
    <div className='flex items-start justify-center'>
      <div className='relative'>
        <img src={image} className='object-cover' />
        <div
          className={`absolute -bottom-5 bg-contain ${style.shadow}`}
          style={{
            backgroundImage: `url(${encodeURI(image)})`,
          }}
        />
        <div
          className={`absolute w-full flex-center ${style.buttonsContainer}`}
        >
          <div
            className={`bg-white h-16 rounded-full flex-between px-2 ${style.buttons}`}
          >
            <button className='rounded-full flex-center w-12 h-12 border-2 border-gray-e6 hover:bg-gray-100 text-gray-77'>
              <BoxArrowUp size={24} />
            </button>
            <button className='rounded-full flex-center w-12 h-12 border-2 border-gray-e6 hover:bg-gray-100 text-pink-46'>
              <HeartFilled size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
