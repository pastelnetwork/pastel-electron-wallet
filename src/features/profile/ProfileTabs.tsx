import React from 'react'

const ProfileTabs = (): JSX.Element => {
  return (
    <div className='psl-w-72psl-flexpsl-borderpsl-rounded-fullpsl-ml-4psl-text-md'>
      <div className='psl-cursor-pointerpsl-w-24psl-py-3pxpsl-px-2pxpsl-rounded-fullpsl-text-centerpsl-text-gray-71psl-text-smpsl-font-boldpsl-flexpsl-items-centerpsl-justify-centerpsl-text-whitepsl-bg-gray-35'>
        General
      </div>
      <div className='psl-cursor-pointerpsl-w-24psl-py-3pxpsl-px-2pxpsl-rounded-fullpsl-text-centerpsl-text-gray-71psl-text-smpsl-font-boldpsl-flexpsl-items-centerpsl-justify-center'>
        Portfolio
        <div className='psl-text-10pxpsl-w-4psl-h-4psl-rounded-fullpsl-bg-gray-400psl-text-whitepsl-flexpsl-justify-centerpsl-items-center ml-2'>
          7
        </div>
      </div>
      <div className='psl-cursor-pointerpsl-w-24psl-py-3pxpsl-px-2pxpsl-rounded-fullpsl-text-centerpsl-text-gray-71psl-text-smpsl-font-boldpsl-flexpsl-items-centerpsl-justify-center'>
        Board
        <div className='psl-text-10pxpsl-w-4psl-h-4psl-rounded-fullpsl-bg-gray-400psl-text-whitepsl-flexpsl-justify-centerpsl-items-centerpsl-ml-2'>
          12
        </div>
      </div>
    </div>
  )
}

export default ProfileTabs
