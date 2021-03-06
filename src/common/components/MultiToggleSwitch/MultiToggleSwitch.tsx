import React from 'react'
import cn from 'classnames'

export type TMultiToggleDataItem = {
  label: string
  count?: number
}

export type TMultiToggle = {
  data: TMultiToggleDataItem[]
  activeIndex: number
  containerClassName?: string
  itemInactiveClassName?: string
  itemActiveClassName?: string
  countInactiveClassName?: string
  countActiveClassName?: string
  onToggle: (index: number) => void
  showEmpty?: boolean
}

function MultiToggleSwitch(props: TMultiToggle): JSX.Element {
  const {
    data,
    activeIndex,
    containerClassName,
    itemInactiveClassName,
    itemActiveClassName,
    countActiveClassName,
    onToggle,
    showEmpty = false,
  } = props

  const container_className = cn(
    'inline-flex gap-3 p-3px rounded-full border border-navigation-default',
    containerClassName,
  )

  const getItemClassName = (isActive: boolean) => {
    const activeClass = itemActiveClassName
      ? itemActiveClassName
      : 'bg-gray-4a rounded-full text-white'
    const inactiveClass = itemInactiveClassName
      ? itemInactiveClassName
      : 'text-gray-71'

    return `flex font-avenir font-extrabold leading-4 text-sm py-1.5 px-3 cursor-pointer ${
      isActive ? activeClass : inactiveClass
    }`
  }

  const getCountClassName = () => {
    const activeClass = countActiveClassName
      ? countActiveClassName
      : 'bg-warning-hover'

    return `ml-2.5 text-9px text-white min-h-17px flex justify-center items-center rounded-xl min-w-16px text-center ${activeClass}`
  }

  const handleClick = (index: number) => {
    onToggle(index)
  }

  return (
    <div>
      {data?.length && (
        <div className={container_className}>
          {data.map((item: TMultiToggleDataItem, index: number) => {
            const label: string = item.label || ''
            const countItem: string = item.count?.toString() || ''
            return (
              <div
                className={getItemClassName(index === activeIndex)}
                key={`${label}${countItem}`}
                onClick={() => handleClick(index)}
                role='button'
                aria-hidden
                tabIndex={0}
              >
                <span>{item.label}</span>
                {(item?.count && item.count > 0) || showEmpty ? (
                  <div
                    className={cn(
                      getCountClassName(),
                      item?.count && item.count > 99 && 'w-7',
                    )}
                  >
                    {item.count}
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MultiToggleSwitch
