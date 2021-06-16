import React from 'react'

const ProfileTabs = (): JSX.Element => {
  const portfolioCount = 7
  const boardCount = 12

  return (
    <div className='w-min flex border rounded-full ml-2px text-md'>
      <div className='cursor-pointer mr-3 py-6px px-3 leading-4 rounded-full text-center text-gray-fc text-sm font-bold flex items-center justify-center bg-gray-35'>
        General
      </div>
      <div className='cursor-pointer mr-3 py-6px px-3 leading-4 rounded-full text-center text-gray-71 text-sm font-bold flex items-center justify-center'>
        Portfolio
        <div className='text-10 w-17px h-15px rounded-full bg-gray-a0 text-white flex justify-center items-center ml-2'>
          {portfolioCount}
        </div>
      </div>
      <div className='cursor-pointer py-6px px-3 leading-4 rounded-full text-center text-gray-71 text-sm font-bold flex items-center justify-center'>
        Board
        <div className='text-10 w-17px h-15px rounded-full bg-gray-a0 text-white flex justify-center items-center ml-2'>
          {boardCount}
        </div>
      </div>
    </div>
  )
}

export default ProfileTabs
