import React from 'react'
import { TIconProps } from './iconProps'

export type TBookmarkProps = TIconProps

export const Bookmark = ({ size, className }: TBookmarkProps): JSX.Element => {
  return (
    <svg
      height={size}
      className={className}
      viewBox='0 0 16 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M14.5332 18.0129L15.3332 18.3129V2.66732C15.3332 2.54128 15.3201 2.41756 15.2956 2.2985C15.1491 1.58227 14.5849 1.01805 13.8687 0.871582C13.7493 0.84717 13.6265 0.833984 13.4998 0.833984H2.49984C2.37322 0.833984 2.25039 0.84717 2.13102 0.871582C1.29541 1.04246 0.666504 1.78102 0.666504 2.66732L0.666504 18.3129L1.4665 18.0129M14.5332 18.0129V2.66732C14.5332 2.59649 14.5258 2.52685 14.512 2.45993L14.5118 2.45878C14.4295 2.0565 14.1107 1.73763 13.7084 1.65536C13.6395 1.64129 13.5704 1.63398 13.4998 1.63398H2.49984C2.42926 1.63398 2.36013 1.64129 2.2913 1.65536C1.82007 1.75173 1.4665 2.16913 1.4665 2.66732V18.0129M14.5332 18.0129L8.28074 15.6683L7.99984 15.5629L7.71894 15.6683L1.4665 18.0129M14.5332 18.0129V18.8673L7.99984 16.4173L1.4665 18.8673V18.0129'
        stroke='currentColor'
        strokeWidth='1.6'
      />
    </svg>
  )
}
