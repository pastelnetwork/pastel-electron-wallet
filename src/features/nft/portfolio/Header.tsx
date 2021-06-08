import React from 'react'
import { TNFT } from 'features/nft/nft.types'
import {
  FirTreeInHexagon,
  Bookmark,
  Instagram,
  ArrowShare,
  Flag,
} from 'common/components/Icons'
import RarenessScore from './RarenessScore'

type HeaderProps = {
  nft: TNFT
}

export default function Header({ nft }: HeaderProps): JSX.Element {
  return (
    <div className='page-container bg-white flex-between text-gray-600 py-4 flex-wrap'>
      <div className='text-gray-23 text-32 font-extrabold whitespace-nowrap flex items-center'>
        {nft.title}
        <FirTreeInHexagon
          size={30}
          className='ml-4 flex-shrink-0 text-green-45'
        />
      </div>
      <div className='mx-5 flex space-x-5 lg:space-x-10'>
        <RarenessScore
          title='Pastel rareness score'
          titleClass='w-24'
          color='text-primary'
          percent={65}
        />
        <RarenessScore
          title='Internet rareness score'
          titleClass='w-28'
          color='text-orange-75'
          percent={45}
        />
      </div>
      <div className='flex items-center text-gray-8e space-x-4 lg:space-x-8'>
        <button type='button' className='w-5 flex-center hover:text-gray-500'>
          <Bookmark size={18} />
        </button>
        <button type='button' className='w-5 flex-center hover:text-gray-500'>
          <Instagram size={20} />
        </button>
        <button type='button' className='w-5 flex-center hover:text-gray-500'>
          <ArrowShare size={19} />
        </button>
        <div className='bg-gray-500 h-8 w-px' />
        <div className='whitespace-nowrap'>ID {nft.id}</div>
        <button type='button' className='text-gray-a6 hover:text-gray-b0'>
          <Flag size={19} />
        </button>
      </div>
    </div>
  )
}
