import React from 'react'
import style from './Image.module.css'
import { Expand, Flag, Trash } from 'common/components/Icons'
import { TNFT } from '../../Nft.types'
import { formatDate } from 'common/utils/format'

type TImageProps = {
  nft: TNFT
}

export default function Image({ nft }: TImageProps): JSX.Element {
  return (
    <div className='flex-center flex-col'>
      <div>
        <div className='relative'>
          <img src={nft.image} className='object-cover' />
          <div
            className={`absolute -bottom-5 bg-contain ${style.shadow}`}
            style={{
              backgroundImage: `url(${encodeURI(nft.image)})`,
            }}
          />
          <button
            type='button'
            className='w-10 h-10 absolute left-6 bottom-6 rounded-full bg-gray-fc flex-center duration-200 transition text-gray-77 hover:text-gray-8e'
          >
            <Expand size={14} />
          </button>
          <button
            type='button'
            className={`w-10 h-10 absolute right-6 bottom-6 rounded-full flex-center duration-200 transition text-gray-f8 hover:text-white ${style.deleteButton}`}
          >
            <Trash size={15} />
          </button>
        </div>
        <div className='w-full flex-between mt-6 font-medium text-gray-71'>
          <div>
            NFT ID {nft.id}
            <button
              type='button'
              className='ml-18px text-gray-a6 relative top-3px opacity-50 duration-200 transition hover:opacity-100'
            >
              <Flag size={16} />
            </button>
          </div>
          <div>My NFT before {formatDate(nft.time)}</div>
        </div>
      </div>
    </div>
  )
}
