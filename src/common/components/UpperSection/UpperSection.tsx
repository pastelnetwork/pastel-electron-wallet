import React from 'react'
import Select, { Option } from '../Select/Select'
import cn from 'classnames'

export type UpperSectionRoutes = {
  label: string
  route?: string // in the future when clicking the link it should change current route...
  isSelected?: boolean
}

export type UpperSectionSortByOptions = {
  placeholder: string
  onOptionChange: (option: Option | null) => void
  selected: Option | null
  options: Option[]
}

export interface UpperSectionProps {
  title: string
  routes: UpperSectionRoutes[]
  sortByOptions: UpperSectionSortByOptions[]
}

/**
 * This is a presentational component, meaning it holds no state.
 * State should be handled by parent component.
 */
const UpperSection = (props: UpperSectionProps): JSX.Element => {
  return (
    <div className='bg-white text-text-gray900'>
      <div className='wrapper py-30px'>
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <h1 className='pr-20 font-semibold'>{props.title}</h1>
            {props.routes.map(route => (
              <div
                className={cn({
                  'mr-6 rounded-3xl bg-text-gray800 px-3 py-1':
                    route.isSelected,
                })}
              >
                <a
                  className={cn({
                    'text-h6 text-white font-medium': route.isSelected,
                    'pr-6 text-h6 text-gray-600': !route.isSelected,
                  })}
                >
                  {route.label}
                </a>
              </div>
            ))}
          </div>
          <div className='flex items-center'>
            <p className='pr-4 text-h5'>Sort by</p>
            <div className='flex space-x-6'>
              {props.sortByOptions.map(item => (
                <Select
                  placeholder={item.placeholder}
                  options={item.options}
                  selected={item.selected}
                  onChange={item.onOptionChange}
                />
              ))}
              {/* <Select
                placeholder='Price Sold'
                options={mockOptions}
                selected={priceSold}
                onChange={setPriceSold}
              />
              <Select
                placeholder='Bid Price'
                options={mockOptions}
                selected={bidPrice}
                onChange={setBidPrice}
              />
              <Select
                placeholder='Likes'
                options={mockOptions}
                selected={likes}
                onChange={setLikes}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpperSection
