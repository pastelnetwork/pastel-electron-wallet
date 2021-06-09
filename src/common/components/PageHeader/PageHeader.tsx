import React from 'react'
import Select, { TOption } from '../Select/Select'
import cn from 'classnames'

export type TBreadcrumbProps = {
  label: string
  route?: string
}

export type PageHeaderRoutes = {
  label: string
  route?: string // in the future when clicking the link it should change current route...
  isSelected?: boolean
  totalItem?: number
}

export type PageHeaderSortByOptions = {
  placeholder: string
  onOptionChange: (option: TOption | null) => void
  selected: TOption | null
  options: TOption[]
}

export interface PageHeaderProps {
  title: string
  routes: PageHeaderRoutes[]
  sortByOptions: PageHeaderSortByOptions[]
  variant?: string
  breadcrumbs?: TBreadcrumbProps[]
}

/**
 * This is a presentational component, meaning it holds no state.
 * State should be handled by parent component.
 */
const PageHeader = (props: PageHeaderProps): JSX.Element => {
  const renderRoutes = () => {
    if (props.variant === 'portfolio') {
      return (
        <div className='flex items-center border border-solid border-navigation-default rounded-65px p-4px'>
          {props.routes.map(route => (
            <div
              className={`rounded-3xl px-12px py-6px ${
                route.isSelected ? 'bg-tab-active' : ''
              }`}
              key={route.label}
            >
              <a
                className={`flex items-center text-14px font-extrabold leading-4 ${
                  route.isSelected
                    ? 'text-background-onboarding'
                    : 'text-gray-71'
                }`}
              >
                {route.label}
                {route.totalItem ? (
                  <span className='leading-none'>
                    <span
                      className={`ml-6px font-black text-9 rounded-11px px-4px py-1px min-w-14px leading-15px ${
                        route.isSelected
                          ? 'bg-yellow-ff text-gray-2d'
                          : 'bg-gray-a0 text-white'
                      }`}
                    >
                      {route.totalItem}
                    </span>
                  </span>
                ) : null}
              </a>
            </div>
          ))}
        </div>
      )
    }

    return props.routes.map(route => (
      <div
        className={cn({
          'mr-6 rounded-3xl bg-gray-2d px-3 py-1': route.isSelected,
        })}
        key={route.label}
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
    ))
  }

  const renderBreadcrumbs = () => {
    if (!props.breadcrumbs) {
      return null
    }

    return (
      <div className='wrapper py-0 flex font-normal text-14px leading-19px text-gray-71 my-12px'>
        {props.breadcrumbs.map((breadcrumb, index) => {
          if (breadcrumb.route) {
            return (
              <React.Fragment key={index}>
                <a href={breadcrumb.route}>{breadcrumb.label}</a>
                <span className='px-6px'>/</span>
              </React.Fragment>
            )
          }

          return <span key={index}>{breadcrumb.label}</span>
        })}
      </div>
    )
  }

  return (
    <>
      {renderBreadcrumbs()}
      <div className='bg-white text-gray-1a'>
        <div
          className={`wrapper ${
            props.variant === 'portfolio' ? 'py-18px' : 'py-30px'
          }`}
        >
          <div className='flex justify-between'>
            <div className='flex items-center'>
              <h1
                className={`${
                  props.variant === 'portfolio'
                    ? 'pr-18px md:pr-28px whitespace-nowrap'
                    : 'pr-20'
                } font-semibold text-gray-23`}
              >
                {props.title}
              </h1>
              {renderRoutes()}
            </div>
            <div className='flex items-center'>
              <p
                className={`pr-4 text-h5 ${
                  props.variant === 'portfolio'
                    ? 'font-medium text-gray-2d leading-4 hidden md:block'
                    : ''
                }`}
              >
                Sort by
              </p>
              <div className='flex space-x-6'>
                {props.sortByOptions.map(item => (
                  <Select
                    placeholder={item.placeholder}
                    options={item.options}
                    selected={item.selected}
                    onChange={item.onOptionChange}
                    key={item.placeholder}
                    className={
                      props.variant === 'portfolio' ? 'min-w-118px' : ''
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PageHeader
