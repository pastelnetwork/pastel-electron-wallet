import React, { useLayoutEffect, useRef } from 'react'
import { useWindowSize } from 'react-use'
import { TNFT } from '../../Nft.types'
import {
  CrownInHexagon,
  FirTreeInHexagon,
  Bookmark,
  Instagram,
  ArrowShare,
} from 'common/components/Icons'
import RarenessScore from '../RarenessScore'
import { formatToTitleCase } from 'common/utils/format'
import style from './Header.module.css'

type HeaderProps = {
  nft: TNFT
}

export default function Header({ nft }: HeaderProps): JSX.Element {
  const headerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const wrappingContentRef = useRef<HTMLDivElement>(null)
  const rarenessScoreSectionRef = useRef<HTMLDivElement>(null)

  const windowSize = useWindowSize()

  // apply classes depending on if header takes one or two rows
  useLayoutEffect(() => {
    const header = headerRef.current
    const title = titleRef.current
    const wrappingContent = wrappingContentRef.current
    const rarenessScore = rarenessScoreSectionRef.current
    if (!header || !title || !wrappingContent || !rarenessScore) {
      return
    }

    const isWrapping = title.offsetTop !== wrappingContent.offsetTop
    header.classList.toggle('justify-center', isWrapping)
    wrappingContent.classList.toggle('flex-grow', !isWrapping)
    rarenessScore.classList.toggle('px-5', !isWrapping)
    rarenessScore.classList.toggle('mr-10', isWrapping)
  }, [windowSize])

  return (
    <div
      ref={headerRef}
      className='page-container bg-white text-gray-71 py-2 flex flex-wrap'
    >
      <div
        ref={titleRef}
        className={`py-2 text-gray-23 text-32px font-extrabold whitespace-nowrap flex items-center ${style.title}`}
      >
        {formatToTitleCase(nft.title)}
        <FirTreeInHexagon
          size={30}
          className='ml-4 flex-shrink-0 text-green-45 hover:cursor-pointer'
        />
        <CrownInHexagon
          size={30}
          className='ml-4 flex-shrink-0 text-orange-ffc hover:cursor-pointer'
        />
      </div>
      <div ref={wrappingContentRef} className='py-2 flex-grow flex'>
        <div
          ref={rarenessScoreSectionRef}
          className='flex-grow flex-center px-5 space-x-5 lg:space-x-10'
        >
          <RarenessScore
            title='Pastel Rareness:'
            color='text-primary'
            titleClass='mr-17px'
            percent={65}
          />
          <RarenessScore
            title='Internet Rareness:'
            color='text-orange-75'
            titleClass='mr-11px'
            percent={45}
          />
        </div>
        <div className='flex items-center text-gray-8e space-x-4 lg:space-x-8'>
          <button type='button' className='w-5 flex-center hover:text-gray-a0'>
            <Bookmark size={18} />
          </button>
          <button type='button' className='w-5 flex-center hover:text-gray-a0'>
            <Instagram size={20} />
          </button>
          <button type='button' className='w-5 flex-center hover:text-gray-a0'>
            <ArrowShare size={19} />
          </button>
        </div>
      </div>
    </div>
  )
}
