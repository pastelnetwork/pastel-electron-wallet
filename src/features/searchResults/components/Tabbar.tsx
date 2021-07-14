import React from 'react'
import cn from 'classnames'

type TDataType = {
  label: string
  no_search: number
}

export type TTabbarProps = {
  data: Array<TDataType>
  clickHandler?: (param: number) => void
  active: number
}

const Tabbar = ({ data, clickHandler, active }: TTabbarProps): JSX.Element => {
  return (
    <div className='flex text-base font-medium text-gray-71'>
      {data.map((item, index) => (
        <div
          className={cn(
            'mr-6 pb-2 cursor-pointer',
            active === index && 'text-gray-4a border-b-2 border-gray-33',
          )}
          key={index}
          onClick={() => {
            clickHandler && clickHandler(index)
          }}
        >
          <span>{item.label}</span>
          <span className='ml-1'>{item.no_search}</span>
        </div>
      ))}
    </div>
  )
}

export default Tabbar
