import React, { useCallback } from 'react'
import cn from 'classnames'

type TDataType = {
  label: string
  no_search: number
}

type TTabbarItemProps = {
  isActive: boolean
  label: string
  index: number
  noSearch: number
  clickHandler?: (param: number) => void
}

export type TTabbarProps = {
  data: Array<TDataType>
  clickHandler?: (param: number) => void
  active: number
}

function TabbarItem({
  isActive,
  label,
  index,
  noSearch,
  clickHandler,
}: TTabbarItemProps) {
  const onClick = useCallback(() => {
    if (clickHandler) {
      clickHandler(index)
    }
  }, [])

  return (
    <div
      className={cn(
        'mr-6 pb-2 cursor-pointer',
        isActive && 'text-gray-4a border-b-2 border-gray-33',
      )}
      key={label}
      onClick={onClick}
    >
      <span>{label}</span>
      <span className='ml-1'>{noSearch}</span>
    </div>
  )
}

export default function Tabbar({
  data,
  clickHandler,
  active,
}: TTabbarProps): JSX.Element {
  return (
    <div className='flex text-base font-medium text-gray-71'>
      {data.map((item, index) => (
        <TabbarItem
          key={item.label}
          label={item.label}
          isActive={active === index}
          clickHandler={clickHandler}
          noSearch={item.no_search}
          index={index}
        />
      ))}
    </div>
  )
}
