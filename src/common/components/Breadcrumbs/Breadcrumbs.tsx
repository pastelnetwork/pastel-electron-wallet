import React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'

export type TBreadcrumb = {
  label: string
  route?: string
  className?: string
}

export type TBreadcrumbs = {
  breadcrumbs: TBreadcrumb[]
  className?: string
}

const Breadcrumbs = (props: TBreadcrumbs): JSX.Element => {
  const { breadcrumbs, className } = props

  return (
    <div
      className={cn(
        'wrapper py-0 flex font-normal text-14px leading-19px text-gray-71 mb-3 pt-3',
        className,
      )}
    >
      {breadcrumbs.map((breadcrumb, index) => {
        if (breadcrumb.route) {
          return (
            <React.Fragment key={index}>
              <Link
                to={breadcrumb.route}
                className={cn('hover:text-gray-2d', breadcrumb.className)}
              >
                {breadcrumb.label}
              </Link>
              <span className='px-1.5'>/</span>
            </React.Fragment>
          )
        }

        return (
          <span key={index} className={breadcrumb.className}>
            {breadcrumb.label}
          </span>
        )
      })}
    </div>
  )
}

export default Breadcrumbs
