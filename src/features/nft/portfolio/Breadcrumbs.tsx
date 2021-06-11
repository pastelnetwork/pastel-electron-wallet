import React from 'react'
import { Link } from 'react-router-dom'

export type TBreadcrumbsProps = {
  items: Array<{
    title: string
    link?: string
  }>
}

export default function Breadcrumbs({ items }: TBreadcrumbsProps): JSX.Element {
  return (
    <div className='page-container h-35px flex items-center text-gray-71 text-sm'>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i !== 0 && <div className='mx-1'>/</div>}
          {item.link && (
            <Link to={item.link} className='hover:text-gray-2d'>
              {item.title}
            </Link>
          )}
          {!item.link && <div>{item.title}</div>}
        </React.Fragment>
      ))}
    </div>
  )
}
