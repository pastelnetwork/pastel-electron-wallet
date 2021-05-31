import React from 'react'

const ProfileTabs = (): JSX.Element => {
  return (
    <div className='psl-w-72 psl-flex psl-border psl-rounded-full psl-ml-4 psl-text-md'>
      <div className='psl-cursor-pointer psl-w-24 psl-py-3px psl-px-2px psl-rounded-full psl-text-center psl-text-gray-71 psl-text-sm psl-font-bold psl-flex psl-items-center psl-justify-center psl-text-white psl-bg-gray-35'>
        General
      </div>
      <div className='psl-cursor-pointer psl-w-24 psl-py-3px psl-px-2px psl-rounded-full psl-text-center psl-text-gray-71 psl-text-sm psl-font-bold psl-flex psl-items-center psl-justify-center'>
        Portfolio
        <div className='psl-text-10 psl-w-4 psl-h-4 psl-rounded-full psl-bg-gray-400 psl-text-white psl-flex psl-justify-center psl-items-center ml-2'>
          7
        </div>
      </div>
      <div className='psl-cursor-pointer psl-w-24 psl-py-3px psl-px-2px psl-rounded-full psl-text-center psl-text-gray-71 psl-text-sm psl-font-bold psl-flex psl-items-center psl-justify-center'>
        Board
        <div className='psl-text-10 psl-w-4 psl-h-4 psl-rounded-full psl-bg-gray-400 psl-text-white psl-flex psl-justify-center psl-items-center psl-ml-2'>
          12
        </div>
      </div>
    </div>
  )
}

export default ProfileTabs
