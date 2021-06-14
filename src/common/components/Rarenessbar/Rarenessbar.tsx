import React from 'react'
import cn from 'classnames'
import Tooltip from '../Tooltip'

export type TRarenessProps = {
  percent: number
  classes?: string
}

const RarenessBar: React.FC<TRarenessProps> = ({
  percent,
  classes = 'w-full',
}) => {
  return (
    <Tooltip
      classnames='text-15px py-1 px-1.5'
      content={`Rareness ${percent}%`}
      type='top'
      width={107}
    >
      <div className={cn(classes, 'bg-gray-f9 cursor-pointer overflow-y-auto')}>
        <div
          className='rounded-r-full h-1.5 bg-gradient-to-r from-red-14 via-yellow-e9 to-green-e9'
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </Tooltip>
  )
}

export default RarenessBar
