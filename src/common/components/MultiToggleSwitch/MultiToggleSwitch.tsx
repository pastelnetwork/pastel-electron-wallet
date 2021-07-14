import React from 'react'

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
}

const MultiToggleSwitch = (props: TMultiToggle): JSX.Element => {
  const {
    data,
    activeIndex,
    containerClassName,
    itemInactiveClassName,
    itemActiveClassName,
    countInactiveClassName,
    countActiveClassName,
    onToggle,
  } = props
  const container_className = `inline-flex gap-3 p-3px rounded-full border border-navigation-default ${containerClassName}`

  const getItemClassName = (isActive: boolean) => {
    const activeClass = itemActiveClassName
      ? itemActiveClassName
      : 'bg-tab-active rounded-full text-white'
    const inactiveClass = itemInactiveClassName
      ? itemInactiveClassName
      : 'text-gray-71'

    return `flex font-avenir font-extrabold leading-4 text-sm py-1.5 px-3 cursor-pointer ${
      isActive ? activeClass : inactiveClass
    }`
  }

  const getCountClassName = (isActive: boolean) => {
    const activeClass = countActiveClassName
      ? countActiveClassName
      : 'bg-yellow-ff'
    const inactiveClass = countInactiveClassName
      ? countInactiveClassName
      : 'bg-gray-a0'

    return `ml-2.5 text-9px text-white min-h-17px flex justify-center items-center rounded-xl min-w-16px text-center ${
      isActive ? activeClass : inactiveClass
    }`
  }

  const handleClick = (index: number) => {
    onToggle(index)
  }

  return (
    <>
      {data?.length && (
        <div className={container_className}>
          {data.map((item: TMultiToggleDataItem, index: number) => {
            return (
              <div
                className={getItemClassName(index === activeIndex)}
                key={index}
                onClick={() => handleClick(index)}
              >
                <span>{item.label}</span>
                {item?.count && item.count > 0 && (
                  <div className={getCountClassName(index === activeIndex)}>
                    {item.count > 99 ? 99 : item.count}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default MultiToggleSwitch
