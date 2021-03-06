import React, { useCallback } from 'react'
import { NFT, Keyword, Creator, User, Forum } from '../Icons'

export type TSearchTagProps = {
  id: string
  label: string
  type: 'nfts' | 'keyword' | 'creators' | 'users' | 'forum' | undefined
  clickHandle?: (
    param: 'nfts' | 'keyword' | 'creators' | 'users' | 'forum' | undefined,
  ) => void
}

function SearchTag({ label, type, clickHandle }: TSearchTagProps): JSX.Element {
  const onClick = useCallback(() => {
    if (clickHandle) {
      clickHandle(type)
    }
  }, [type])

  return (
    <button
      className='flex items-center bg-blue-d9 py-3px px-2 rounded-10px mr-2 cursor-pointer'
      onClick={onClick}
      type='button'
    >
      {!!type && type === 'nfts' && <NFT className='text-gray-4a' />}
      {!!type && type === 'keyword' && <Keyword className='text-gray-4a' />}
      {!!type && type === 'creators' && <Creator className='text-gray-4a' />}
      {!!type && type === 'users' && <User className='text-gray-4a' />}
      {!!type && type === 'forum' && <Forum className='text-gray-4a' />}
      <div className='ml-5px'>{label}</div>
    </button>
  )
}

export default SearchTag
