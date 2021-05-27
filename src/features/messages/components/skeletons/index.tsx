import React from 'react'

import { Skeleton } from './Skeletons.styles'

interface ISkeleton {
  type: string
}

function SkeletonElement(props: ISkeleton): JSX.Element {
  const { type } = props
  const classes = `skeleton ${type}`
  return <Skeleton className={classes} />
}

export default SkeletonElement
