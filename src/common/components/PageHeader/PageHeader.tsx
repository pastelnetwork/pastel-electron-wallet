import React from 'react'
import Select, { TOption } from '../Select/Select'
import MultiToggleSwitch, { TMultiToggle } from '../MultiToggleSwitch'

export type TPageHeaderSortByOptions = {
  placeholder: string
  onOptionChange: (option: TOption | null) => void
  selected: TOption | null
  options: TOption[]
}

export type TPageHeaderProps = {
  title?: string
  routes?: TMultiToggle
  sortByOptions?: TPageHeaderSortByOptions[]
  variant?: string
  sortByText?: string
  sortByTextClassName?: string
  children?: React.ReactNode
}

/**
 * This is a presentational component, meaning it holds no state.
 * State should be handled by parent component.
 */
const PageHeader = ({
  title,
  routes,
  sortByOptions,
  variant,
  sortByText,
  sortByTextClassName = '',
  children,
}: TPageHeaderProps): JSX.Element => {
  return (
    <>
      <div className='bg-white text-gray-1a'>
        <div
          className={`wrapper ${variant === 'portfolio' ? 'py-18px' : 'py-5'}`}
        >
          <div className='flex justify-between flex-wrap'>
            <div className='flex items-center'>
              {title && (
                <h1
                  className={`${
                    variant === 'portfolio'
                      ? 'pr-18px md:pr-7 whitespace-nowrap'
                      : 'pr-8'
                  } font-extrabold text-gray-23`}
                >
                  {title}
                </h1>
              )}
              {routes && <MultiToggleSwitch {...routes} />}
            </div>
            {sortByOptions?.length && (
              <div className='flex items-center'>
                <p className={`pr-4 text-h5 ${sortByTextClassName}`}>
                  {sortByText || 'Sort by'}
                </p>
                <div className='flex space-x-6'>
                  {sortByOptions.map(item => (
                    <Select
                      placeholder={item.placeholder}
                      options={item.options}
                      selected={item.selected}
                      onChange={item.onOptionChange}
                      key={item.placeholder}
                      selectClassName='min-w-118px'
                    />
                  ))}
                </div>
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default PageHeader
