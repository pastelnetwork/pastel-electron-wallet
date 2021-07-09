import React from 'react'
import { NFT, Keyword, Creator, User, Forum } from '../Icons'

export type TSearchTagProps = {
  label: string
  type: 'nfts' | 'keyword' | 'creators' | 'users' | 'forum' | undefined
  clickHandle?: (
    param: 'nfts' | 'keyword' | 'creators' | 'users' | 'forum' | undefined,
  ) => void
}

const SearchTag = ({
  label,
  type,
  clickHandle,
}: TSearchTagProps): JSX.Element => {
  return (
    <div
      className='flex items-center bg-blue-d9 py-3px px-2 rounded-10px mr-2 cursor-pointer'
      onClick={() => {
        clickHandle && clickHandle(type)
      }}
    >
      {!!type && type === 'nfts' && <NFT className='text-gray-4a' />}
      {!!type && type === 'keyword' && <Keyword className='text-gray-4a' />}
      {!!type && type === 'creators' && <Creator className='text-gray-4a' />}
      {!!type && type === 'users' && <User className='text-gray-4a' />}
      {!!type && type === 'forum' && <Forum className='text-gray-4a' />}
      <div className='ml-5px'>{label}</div>
    </div>
  )
}

export default SearchTag
