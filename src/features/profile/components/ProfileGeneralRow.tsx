import React from 'react'

type TProfileGeneralRow = {
  title: string
  children: string | number | JSX.Element | JSX.Element[]
}

const ProfileGeneralRow = ({
  title,
  children,
}: TProfileGeneralRow): JSX.Element => {
  return (
    <div className='flex'>
      <div className='w-[215px] text-gray-71 flex-shrink-0'>{title}</div>
      <div className='flex flex-grow font-medium text-gray-4a whitespace-pre flex-wrap'>
        {children}
      </div>
    </div>
  )
}

export default ProfileGeneralRow
