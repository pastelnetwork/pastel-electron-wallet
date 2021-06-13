import React from 'react'
import cn from 'classnames'

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
        'wrapper py-0 flex font-normal text-14px leading-19px text-gray-71 mb-12px pt-12px',
        className,
      )}
    >
      {breadcrumbs.map((breadcrumb, index) => {
        if (breadcrumb.route) {
          return (
            <React.Fragment key={index}>
              <a href={breadcrumb.route}>{breadcrumb.label}</a>
              <span className='px-6px'>/</span>
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
