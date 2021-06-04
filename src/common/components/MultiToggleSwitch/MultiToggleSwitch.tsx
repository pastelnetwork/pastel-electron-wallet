import React from 'react'

type TItem = {
  label: string
  count?: number
}

const mock: TItem[] = [
  {
    label: 'General',
  },
  {
    label: 'Board',
    count: 12,
  },
  {
    label: 'Security',
  },
]

const MultiToggleSwitch: React.FC = () => {
  return (
    <div className='flex gap-3'>
      {mock?.map((item: TItem) => {
        return (
          <div className='flex font-avenir font-extrabold leading-4 text-sm text-gray-71 py-1.5 px-3'>
            <label>{item.label}</label>
            {Object.prototype.hasOwnProperty.call(item, 'count') && (
              <span className='ml-2.5 text-9px pt-2.5px pb-1.5px px-3px bg-gray-a0 leading-11px rounded-xl'>
                {item.count}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default MultiToggleSwitch
