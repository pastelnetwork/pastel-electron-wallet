import React from 'react'

const ProfileTabs = (): JSX.Element => {
  return (
    <div className='w-72 flex border rounded-full ml-4 text-md'>
      <div className='cursor-pointer w-24 py-3px px-2px rounded-full text-center text-gray-71 text-sm font-bold flex items-center justify-center text-white bg-gray-35'>
        General
      </div>
      <div className='cursor-pointer w-24 py-3px px-2px rounded-full text-center text-gray-71 text-sm font-bold flex items-center justify-center'>
        Portfolio
        <div className='text-10px w-4 h-4 rounded-full bg-gray-400 text-white flex justify-center items-center ml-2'>
          7
        </div>
      </div>
      <div className='cursor-pointer w-24 py-3px px-2px rounded-full text-center text-gray-71 text-sm font-bold flex items-center justify-center'>
        Board
        <div className='text-10px w-4 h-4 rounded-full bg-gray-400 text-white flex justify-center items-center ml-2'>
          12
        </div>
      </div>
    </div>
  )
}

export default ProfileTabs
